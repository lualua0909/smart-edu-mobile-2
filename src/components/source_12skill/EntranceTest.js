import { useQuery } from '@apollo/client'
import axios from 'app/Axios'
import { showToast } from 'app/atoms'
import { Loading } from 'app/atoms'
import {
    COLORS,
    DATA_ANSWER_PRETEST,
    DATA_DEMO_STAGES,
    DATA_FAKE_12_SKILL,
    ROUTES
} from 'app/constants'
import { getData, storeData } from 'app/helpers/utils'
import storage from 'app/localStorage'
import { GET_ROADMAP_PRETEST } from 'app/qqlStore/queries'
import { svgSuccessExam } from 'assets/svg'
import _ from 'lodash'
import React from 'react'

import {
    Alert,
    AppState,
    Dimensions,
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    View
} from 'react-native'
import { StatusBar } from 'react-native'
import { SvgXml } from 'react-native-svg'

import Choose from './answer/Choose'

const { width, height } = Dimensions.get('screen')

const EntranceTest = ({ navigation, route }) => {
    const { loading, error, data } = useQuery(GET_ROADMAP_PRETEST)
    const dataAnswer = DATA_ANSWER_PRETEST
    const [dataQuestion, setDataQuestion] = React.useState([])
    const [user, setUser] = React.useState()
    const [question, setQuestion] = React.useState(null)
    const [answerList, setAnswerList] = React.useState([])
    const [idCurrentAnswer, setCurrentAnswer] = React.useState(null)
    const [currentIndexQuestion, setCurrentIndexQuestion] = React.useState(0)
    const [isLoading, setIsLoading] = React.useState(true)
    const [textStatusLading, setTextStatusLoading] =
        React.useState('Đang tải câu hỏi')
    const [isSubmit, setIsSubmit] = React.useState(false)

    const appState = React.useRef(AppState.currentState)

    const formatQuestion = () => {
        const newData = data.RoadmapPretest.questions.map(item => ({
            idStage: item.group_id,
            idQuestion: item.id,
            questionName: item.title,
            idSubmit: data.RoadmapPretest.id,
            type: 'choose',
            answer: [...dataAnswer]
        }))
        setDataQuestion(newData)
        setQuestion(newData[currentIndexQuestion])

        setIsLoading(false)
    }

    const getDataUser = () => {
        setIsLoading(true)
        const userInfoStore = getData('@userInfo')
        if (userInfoStore) {
            setUser(userInfoStore)
        }
        axios
            .get(`courses/roadmap/test-history/${data.RoadmapPretest.id}`)
            .then(res => {
                if (res.data && res.data.length > 0) {
                    console.log(res.data.length)
                    if (
                        res.data.length === data.RoadmapPretest.questions.length
                    ) {
                        setTextStatusLoading(
                            'Đang kiểm tra dữ liệu bài kiểm tra đầu vào của bạn'
                        )

                        setIsSubmit(true)
                        showToast({
                            title: 'Bạn đã hoàn thành bài kiểm tra đầu vào. Bạn sẽ được chuyển đến trang xem kết quả',
                            placement: 'top'
                        })
                        setIsLoading(false)
                        navigationRoute()
                    }
                    // else {
                    //     //     setAnswerList(dataCourse.data.answerList),
                    //     //         setCurrentIndexQuestion(
                    //     //             dataCourse.data.currentIndexQuestion
                    //     //         )
                    //     //     setIsLoading(false)
                    //     // }
                    // }
                } else {
                    formatQuestion()
                    setIsLoading(false)
                }
            })
            .catch(err => console.log(err))
    }

    React.useEffect(() => {
        const subscription = AppState.addEventListener(
            'change',
            nextAppState => {
                if (
                    appState.current.match(/inactive|background/) &&
                    nextAppState === 'active'
                ) {
                    getDataUser()
                } else {
                    const answers = answerList.map(item => ({
                        id: item.idQuestion,
                        answer: item.yourAnswer
                    }))
                    saveResult(answers)
                }
                appState.current = nextAppState
            }
        )

        return () => {
            subscription.remove()
        }
    }, [getDataUser])

    const navigationRoute = () => {
        navigation.navigate(ROUTES.InputTestResult, {
            title: 'Kết quả kiểm tra',
            idPretest: data?.RoadmapPretest.id
        })
    }

    React.useEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
        if (!loading) {
            getDataUser()
        }
    }, [loading])

    const saveResult = answers => {
        setTextStatusLoading(
            'Đang nộp kết quả khảo sát và đề xuất lộ trình học tập'
        )
        setIsLoading(true)
        axios
            .post(`courses/roadmap/submit-pretest/${data.RoadmapPretest.id}`, {
                answers: [...answers]
            })
            .then(res => {
                if (res.data.status === 200) {
                    showToast({
                        title: 'Nộp bài thành công',
                        placement: 'top'
                    })
                }
            })
            .catch(err => console.log(err))
            .finally(() => {
                setTimeout(() => {
                    setIsLoading(false)
                    navigationRoute()
                }, 1000)
            })
    }

    React.useEffect(() => {
        navigation.addListener('beforeRemove', e => {
            e.preventDefault()
            if (!isSubmit) {
                Alert.alert(
                    'Thông báo.',
                    'Vui lòng hoàn thành bài khảo sát đầu vào trước khi trở về trang trước',
                    [
                        {
                            text: 'Tiếp tục làm bài',
                            style: 'cancel'
                        }
                    ]
                )
                return
            }
        })
    }, [navigation, isSubmit])

    const onSubmitQuestion = () => {
        const answers = answerList.map(item => ({
            id: item.idQuestion,
            answer: item.yourAnswer
        }))
        saveResult(answers)
    }

    const handleNextQuestion = () => {
        if (!idCurrentAnswer)
            return showToast({
                title: 'Vui lòng chọn câu trả lời',
                placement: 'top'
            })
        setTextStatusLoading('Đang tải câu hỏi')
        setIsLoading(true)
        const { idStage, answer, idQuestion, questionName, idSubmit } =
            dataQuestion[currentIndexQuestion]
        const _answer = _.find(answer, { id: idCurrentAnswer })
        setAnswerList(prev => [
            ...prev,
            {
                idSubmit,
                idStages: idStage,
                idQuestion,
                questionName,
                answer: _answer,
                yourAnswer: idCurrentAnswer
            }
        ])

        setTimeout(() => {
            setIsLoading(false)
        }, 500)
        setCurrentIndexQuestion(prev => prev + 1)
        setCurrentAnswer(null)
    }
    const onChooseAnswer = idAnswer => {
        setCurrentAnswer(idAnswer)
    }

    const renterQuestion = question => {
        switch (question?.type) {
            case 'choose':
                return (
                    <Choose
                        question={question}
                        questionCurrent={currentIndexQuestion + 1}
                        questionTotal={dataQuestion.length}
                        onChooseAnswer={onChooseAnswer}
                    />
                )

            default:
                return <></>
        }
    }

    if (loading || isLoading) return <Loading title={textStatusLading} />
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            {currentIndexQuestion <= dataQuestion.length - 1 ? (
                <>
                    {renterQuestion(question)}
                    <View style={styles.btn_view}>
                        <Pressable
                            style={styles.btn_submit}
                            onPress={handleNextQuestion}>
                            <Text style={styles.btn_submit_text}>
                                Câu tiếp theo
                            </Text>
                        </Pressable>
                    </View>
                </>
            ) : (
                <>
                    <View>
                        <SvgXml
                            xml={svgSuccessExam}
                            width={width}
                            height={height / 2}
                        />
                        <View style={{ paddingHorizontal: 40 }}>
                            <Text
                                style={[
                                    styles.color_text_success,
                                    styles.style_text_success
                                ]}>
                                Chúc mừng bạn đã hoàn thành bài khảo sát đầu vào
                                của chúng tôi
                            </Text>
                            <Text
                                style={[
                                    styles.color_text_success,
                                    styles.style_text_success,
                                    {
                                        fontSize: 15,
                                        fontWeight: '400'
                                    }
                                ]}>
                                Vui lòng{' '}
                                <Text style={{ fontWeight: '500' }}>
                                    "Nộp bài"
                                </Text>{' '}
                                để nhận lộ trình học tập chúng tôi đề xuất cho
                                bạn dựa vào kết quả khảo sát của bạn
                            </Text>
                        </View>
                    </View>
                    <View style={styles.btn_view}>
                        <Pressable
                            style={styles.btn_submit}
                            onPress={() => {
                                onSubmitQuestion()
                            }}>
                            <Text style={styles.btn_submit_text}>Tiếp tục</Text>
                        </Pressable>
                    </View>
                </>
            )}
        </View>
    )
}

export default EntranceTest

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: height
    },
    btn_submit: {
        backgroundColor: COLORS.colorButton,
        width: width / 2,
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 15,
        borderRadius: 30
    },
    btn_view: {
        justifyContent: 'center',
        flexDirection: 'row',
        position: 'absolute',
        bottom: 50,
        width: width
    },
    btn_submit_text: {
        fontSize: 20,
        fontWeight: '500',
        color: COLORS.colorWhite
    },
    color_text_success: {
        color: COLORS.colorBlack
    },
    style_text_success: {
        fontSize: 15,
        fontWeight: '500',
        textAlign: 'center'
    }
})
