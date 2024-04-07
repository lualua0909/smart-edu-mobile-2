import { AbsoluteSpinner, showToast } from 'app/atoms'
import {
    COLORS,
    DATA_DEMO_QUESTION,
    DATA_DEMO_STAGES,
    DATA_FAKE_12_SKILL,
    ROUTES
} from 'app/constants'
import { getData, storeData } from 'app/helpers/utils'
import { svgSuccessExam } from 'assets/svg'
import _ from 'lodash'
import React from 'react'

import {
    Alert,
    AppState,
    Dimensions,
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
    const dataQuestion = DATA_DEMO_QUESTION
    const [user, setUser] = React.useState()
    const [question, setQuestion] = React.useState(null)
    const [answerList, setAnswerList] = React.useState([])
    const [idCurrentAnswer, setCurrentAnswer] = React.useState(null)
    const [currentIndexQuestion, setCurrentIndexQuestion] = React.useState(0)
    const [isLoading, setIsLoading] = React.useState(false)
    const [textStatusLading, setTextStatusLoading] =
        React.useState('Đang tải câu hỏi')
    const [isSubmit, setIsSubmit] = React.useState(false)

    const appState = React.useRef(AppState.currentState)

    const getDataUser = () => {
        setIsLoading(true)
        const userInfoStore = getData('@userInfo')
        if (userInfoStore) {
            setUser(userInfoStore)
            // storage.delete(`COURSE_12_SKILL_ID_USER_${userInfoStore?.id}`)
            // storage.delete('SCREEN')
            const dataCourseFromStore = getData(
                `COURSE_12_SKILL_ID_USER_${userInfoStore?.id}`
            )
            if (dataCourseFromStore) {
                const dataCourse = JSON.parse(dataCourseFromStore)
                if (dataCourse.isEntranceTest) {
                    setTextStatusLoading(
                        'Đang kiểm tra dữ liệu bài kiểm tra đầu vào của bạn'
                    )
                    setIsSubmit(true)
                    showToast({
                        title: 'Bạn đã hoàn thành bài kiểm tra đầu vào. Bạn sẽ được chuyển đến trang xem kết quả',
                        placement: 'top'
                    })
                    setTimeout(() => {
                        setIsLoading(false)
                        navigationRoute()
                    }, 1000)
                } else if (dataCourse.isExitApp) {
                    setAnswerList(dataCourse.data.answerList),
                        setCurrentIndexQuestion(
                            dataCourse.data.currentIndexQuestion
                        )
                    setIsLoading(false)
                }
            } else {
                setIsLoading(false)
            }
        }
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
                    storeData(
                        `COURSE_12_SKILL_ID_USER_${user?.id}`,
                        JSON.stringify({
                            isAdjust: false,
                            isExitApp: true,
                            data: {
                                answerList,
                                currentIndexQuestion
                            }
                        })
                    )
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
            title: 'Kết quả kiểm tra'
        })
    }

    React.useEffect(() => {
        getDataUser()
        navigation.setOptions({
            headerShown: false
        })
    }, [])

    const saveResult = result => {
        setTextStatusLoading(
            'Đang nộp kết quả khảo sát và đề xuất lộ trình học tập'
        )
        setIsLoading(true)
        const dataFullCourse = DATA_FAKE_12_SKILL[0].children
        const addProcess = dataFullCourse.map(course => {
            const findById = _.find(result, { id: course.id })
            return {
                ...course,
                processBefore: findById.process
            }
        })
        storeData(
            `COURSE_12_SKILL_ID_USER_${user?.id}`,
            JSON.stringify({
                isAdjust: false,
                isEntranceTest: true,
                data: addProcess
            })
        )
        setTimeout(() => {
            setIsLoading(false)
            setIsSubmit(true)
            navigationRoute()
        }, 1000)
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
        const result = DATA_DEMO_STAGES.map(stages => {
            const filterAnswer = _.filter(answerList, {
                idStages: stages.id
            })
            const sumScore = filterAnswer.reduce(
                (accumulator, currentValue) =>
                    accumulator + currentValue.answer.score,
                0
            )
            return {
                ...stages,
                process: (sumScore / 25) * 100
            }
        })
        saveResult(result)
    }

    const handleNextQuestion = () => {
        if (!idCurrentAnswer)
            return showToast({
                title: 'Vui lòng chọn câu trả lời',
                placement: 'top'
            })
        setTextStatusLoading('Đang tải câu hỏi')
        setIsLoading(true)
        const { idStage, answer, idQuestion, questionName } =
            dataQuestion[currentIndexQuestion]
        const _answer = _.find(answer, { id: idCurrentAnswer })
        setAnswerList(prev => [
            ...prev,
            {
                idStages: idStage,
                idQuestion,
                questionName,
                answer: _answer,
                yourAnswer: idCurrentAnswer
            }
        ])
        setCurrentIndexQuestion(prev => prev + 1)
        setCurrentAnswer(null)
        setTimeout(() => {
            setIsLoading(false)
        }, 500)
    }
    const onChooseAnswer = idAnswer => {
        setCurrentAnswer(idAnswer)
    }

    const renterQuestion = question => {
        switch (question.type) {
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

    React.useEffect(() => {
        setQuestion(dataQuestion[currentIndexQuestion])
    }, [currentIndexQuestion])
    if (isLoading) return <AbsoluteSpinner title={textStatusLading} />
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            {question && <>{renterQuestion(question)}</>}

            {currentIndexQuestion <= dataQuestion.length - 1 ? (
                <View style={styles.btn_view}>
                    <Pressable
                        style={styles.btn_submit}
                        onPress={handleNextQuestion}>
                        <Text style={styles.btn_submit_text}>
                            Câu tiếp theo
                        </Text>
                    </Pressable>
                </View>
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
                            <Text style={styles.btn_submit_text}>Nộp bài</Text>
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
