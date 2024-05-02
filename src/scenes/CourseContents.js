import axios from 'app/Axios'
import { getGlobalState, useGlobalState } from 'app/Store'
import {
    AbsoluteSpinner,
    Button,
    Center,
    DocumentViewer,
    EnglishReading,
    ExamViewer,
    FinishCourse,
    Input,
    Modal,
    NoDataAnimation,
    ScormViewer,
    Text,
    VStack,
    VideoViewer,
    showToast
} from 'app/atoms'
import { API_URL, ROUTES } from 'app/constants'
import LectureTab from 'app/containers/LectureTab'
import { scale } from 'app/helpers/responsive'
import useFormInput from 'app/helpers/useFormInput'
import { svgComment } from 'assets/svg'
import _ from 'lodash'
import React, { useEffect, useState } from 'react'

import {
    AppState,
    Dimensions,
    FlatList,
    Linking,
    Pressable,
    SafeAreaView,
    View
} from 'react-native'
import { SvgXml } from 'react-native-svg'
import { TabBar, TabView } from 'react-native-tab-view'
import { WebView } from 'react-native-webview'

const h = Dimensions.get('screen').height

const routes = [
    {
        key: 'tab-1',
        title: 'Chương'
    },
    {
        key: 'tab-4',
        title: 'Tài liệu'
    },
    {
        key: 'tab-2',
        title: 'Thảo luận'
    },
    {
        key: 'tab-3',
        title: 'Câu hỏi'
    }
]

const CourseDetail = ({ route, navigation }) => {
    const { courseId, currentLecture, isTrial } = route.params
    const [tabIndex, setTabIndex] = useState(0)
    const [viewHeight, setViewHeight] = useState({
        tab1: 0,
        tab2: 0,
        tab3: 0
    })
    const [documents, setDocuments] = useState([])
    const [loading, setLoading] = useState(true)
    const [visibleQuestion, setVisibleQuestion] = useState(false)
    const [currentId, setCurrentId] = useState()
    const [data, setData] = useState()
    const [chapters, setChapters] = useState()
    const userInfo = getGlobalState('userInfo')
    const questionTitle = useFormInput()
    const questionContent = useFormInput()
    const [questionLoading, setQuestionLoading] = useState(false)
    const [hideHeaderTitle, setHideHeaderTitle] = useState(false)
    const [finishedLectures, setFinishedLectures] =
        useGlobalState('finishedLectures')
    const [_currentCourseId, setCurrentCourseId] =
        useGlobalState('currentCourseId')
    const [openViewDoc, setOpenViewDoc] = useState(false)
    const [selectedFile, setSelectedFile] = useState()
    const [countDown, setCountDown] = useState()
    const [trialChapters, setTrialChapters] = useState()
    const onCloseViewDoc = () => setOpenViewDoc(false)
    const [isTrialModalVisible, setIsTrialModalVisible] = useState(false)

    useEffect(() => {
        if (chapters?.length) {
            const c = chapters.filter(i => i?.trial)
            setTrialChapters(c)
        }
    }, [chapters])

    useEffect(() => {
        const t = setTimeout(() => setHideHeaderTitle(true), 5000)

        return () => {
            clearTimeout(t)
        }
    }, [hideHeaderTitle])

    const handleAppStateChange = nextAppState => {
        if (nextAppState === 'inactive') {
            console.log('the app is closed')
        }
    }
    // Bắt xự kiện người dùng thoát app
    useEffect(() => {
        AppState.addEventListener('change', handleAppStateChange)
    }, [])

    navigation.setOptions({
        headerTitle: () => (
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: 0,
                    height: 100
                }}
            />
        ),
        headerTransparent: true
    })

    useEffect(() => {
        if (currentLecture) {
            setCurrentId(currentLecture)
        }
    }, [currentLecture])

    const getData = () => {
        setLoading(true)
        axios
            .get(`${isTrial ? 'public-lectures' : 'lectures'}/get/${currentId}`)
            .then(res => {
                console.log('res = ', res.data.data)
                if (res.data.status === 200) return res.data.data
            })
            .then(data => {
                setData(data)
            })
            .finally(() => {
                setTimeout(() => {
                    setLoading(false)
                }, 500)
            })
    }

    const getDocuments = () => {
        if (isTrial) return
        axios
            .get(`admin/courses/resources/paging/${courseId}`)
            .then(res => {
                if (res.data.status === 200) return res.data.data
            })
            .then(data => {
                setDocuments(data)
            })
    }

    useEffect(() => {
        if (courseId && currentId) {
            setCurrentCourseId(courseId)
            getData()
            getDocuments()
        }
    }, [courseId, currentId])

    const addLessonToFinishedList = () => {
        const params = {
            courseId: courseId,
            lectureId: currentId
        }

        axios.post('courses/add-finished-lecture', params).then(res => {
            if (res.data.status === 200) {
                setFinishedLectures([...finishedLectures, { id: currentId }])
            }
        })
    }

    const showFinishToast = () => {
        showToast({
            title: 'Bạn đã học hết nội dung học thử'
        })

        setIsTrialModalVisible(true)
    }

    const nextLessonTrial = () => {
        const current = trialChapters.findIndex(i => i.id === currentId)
        const next = trialChapters[current + 1]

        if (next?.id) {
            setCurrentId(next?.id)
        } else {
            axios
                .get(`get-course-info/${courseId}`)
                .then(res => {
                    if (res.data.status === 200) {
                        setCourseData(
                            res?.data?.data?.parent || res?.data?.data
                        )
                    }
                })
                .finally(() => showFinishToast())
        }
    }

    const nextLesson = () => {
        if (isTrial) {
            nextLessonTrial()
            return
        }
        const current = chapters.findIndex(i => i.id === currentId)
        const next = chapters[current + 1]
        addLessonToFinishedList()
        setCurrentId(next?.id)

        // Đối với chuỗi khóa học theo lộ trình, đến bài cuối chuyển học viên tới danh sách khóa học theo lộ trình
        if (route?.params?.isRoadMap) {
            if (chapters.length === current + 1) {
                navigation.navigate(ROUTES.LearningPath, { id: 162 })
                return
            }
        }
    }

    const prevLessonTrial = () => {
        const current = trialChapters?.findIndex(i => i?.id === currentId)
        if (current > 0) {
            const prev = trialChapters[current - 1]
            setCurrentId(prev?.id)
        } else {
            showFinishToast()
        }
    }

    const prevLesson = () => {
        if (isTrial) {
            prevLessonTrial()
            return
        }
        const current = chapters?.findIndex(i => i?.id === currentId)
        if (current > 0) {
            const prev = chapters[current - 1]
            addLessonToFinishedList()
            setCurrentId(prev?.id)
        }
    }

    if (loading) {
        return <AbsoluteSpinner />
    }

    const renderScene = ({ route }) => {
        switch (route.key) {
            case 'tab-1':
                return (
                    <View
                        onLayout={e =>
                            setViewHeight({
                                ...viewHeight,
                                tab1: e.nativeEvent.layout.height
                            })
                        }>
                        <LectureTab
                            courseId={courseId}
                            totalLectures={0}
                            setChapters={setChapters}
                            navigateToLesson={setCurrentId}
                        />
                    </View>
                )
            case 'tab-2':
                return (
                    <View
                        onLayout={e =>
                            setViewHeight({
                                ...viewHeight,
                                tab2: e.nativeEvent.layout.height
                            })
                        }
                        style={{ padding: scale(16) }}>
                        <NoDataAnimation />
                        {/* <CommentCard />
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginTop: scale(8),
                            }}
                        >
                            <Avatar size={50} />
                            <View
                                style={{
                                    marginLeft: scale(8),
                                    flex: 1,
                                    borderWidth: 1,
                                    borderColor: '#eee',
                                    borderRadius: scale(10),
                                    minHeight: scale(50),
                                }}
                            >
                                <TextInput
                                    style={{
                                        flex: 1,
                                        textAlignVertical: 'top',
                                        paddingVertical: 0,
                                    }}
                                    multiline
                                />
                            </View>
                        </View> */}
                    </View>
                )
            case 'tab-3':
                return (
                    <View
                        onLayout={e =>
                            setViewHeight({
                                ...viewHeight,
                                tab3: e.nativeEvent.layout.height
                            })
                        }
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingTop: scale(30),
                            paddingHorizontal: scale(16)
                        }}>
                        <SvgXml
                            xml={svgComment}
                            width={scale(100)}
                            height={scale(100)}
                        />
                        <Text
                            style={{
                                fontSize: 14,
                                color: '#6C746E',
                                marginTop: scale(8),
                                textAlign: 'center'
                            }}>
                            Nội dung câu hỏi được bảo mật, chỉ có giảng viên và
                            bạn biết thôi nhé
                        </Text>
                        <Button
                            onPress={() => setVisibleQuestion(true)}
                            style={{
                                marginTop: 16
                            }}>
                            Đặt câu hỏi
                        </Button>
                    </View>
                )
            case 'tab-4':
                return (
                    <View
                        onLayout={e =>
                            setViewHeight({
                                ...viewHeight,
                                tab2: e.nativeEvent.layout.height
                            })
                        }
                        style={{ padding: scale(16) }}>
                        {documents?.length ? (
                            <FlatList
                                data={documents}
                                renderItem={({ item }) => {
                                    let fileName = item?.fileName
                                        ? item?.fileName
                                              ?.split('/')
                                              .slice(-1)
                                              .pop()
                                        : item?.file_name
                                    fileName = fileName.substring(
                                        fileName.indexOf('-') + 1
                                    )

                                    return (
                                        <View
                                            style={{
                                                borderBottomWidth: 1,
                                                borderBottomColor: '#e5e5e5',
                                                paddingVertical: 5
                                            }}>
                                            <Pressable
                                                onPress={() => {
                                                    if (item?.fileName) {
                                                        Linking.openURL(
                                                            `${API_URL}public/${item?.fileName}`
                                                        )
                                                    } else {
                                                        setSelectedFile(
                                                            item?.file_url
                                                        )
                                                        setOpenViewDoc(true)
                                                    }
                                                }}>
                                                <Text>{fileName}</Text>
                                            </Pressable>
                                        </View>
                                    )
                                }}
                                keyExtractor={item => item?.id}
                            />
                        ) : (
                            <NoDataAnimation />
                        )}
                    </View>
                )
            default:
                return null
        }
    }

    const sendQuestion = () => {
        setQuestionLoading(true)
        const params = {
            course_id: courseId,
            title: questionTitle.value,
            content: questionContent.value
        }

        axios
            .post('qanda/add-question', params)
            .then(res => {
                if (res?.data?.status === 200) {
                    setVisibleQuestion(false)
                    showToast({
                        title: 'Gửi câu hỏi thành công',
                        status: 'success'
                    })

                    questionTitle.onChangeText('')
                    questionContent.onChangeText('')
                }
            })
            .finally(() => setQuestionLoading(false))
    }

    return (
        <SafeAreaView
            style={{ flex: 1 }}
            onStartShouldSetResponder={() => {
                setHideHeaderTitle(false)
            }}>
            <View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    height: 300
                }}>
                {data?.type === 1 ? (
                    <VideoViewer
                        videoUrl={data?.file_path || data?.video_url}
                    />
                ) : null}

                {data?.type === 2 ? (
                    <DocumentViewer
                        content={data?.text_document}
                        uri={`${API_URL}public/${data?.file_path}`}
                    />
                ) : null}
                {data?.type === 3 ? (
                    <ScormViewer
                        src={`${API_URL}scorm/${courseId}/${currentId}/${userInfo.id}`}
                    />
                ) : null}
                {data?.type === 4 ? <ExamViewer data={data} /> : null}
                {data?.type === 5 ? <EnglishReading data={data} /> : null}
                {data?.type > 5 || data?.type < 1 ? <FinishCourse /> : null}
            </View>
            <Center mt="3" mb="3">
                <Text
                    style={{
                        fontSize: scale(14),
                        color: '#52B553'
                    }}>
                    {data?.name}
                </Text>
            </Center>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                <Button
                    size={'sm'}
                    onPress={prevLesson}
                    variant="subtle"
                    colorScheme="green"
                    style={{
                        marginRight: scale(12),
                        width: 'auto'
                    }}>
                    Bài trước
                </Button>
                <Button size={'sm'} onPress={nextLesson}>
                    Bài tiếp theo
                </Button>
            </View>
            <TabView
                navigationState={{ index: tabIndex, routes }}
                renderScene={renderScene}
                renderTabBar={props => (
                    <TabBar
                        {...props}
                        renderLabel={({ route, focused, color }) => (
                            <Text
                                bold
                                style={[
                                    {
                                        fontSize: 13,
                                        color: '#6C746E',
                                        textAlign: 'center'
                                    },
                                    focused && {
                                        color: '#0E564D'
                                    }
                                ]}>
                                {route.title}
                            </Text>
                        )}
                        style={{
                            backgroundColor: '#fff',
                            elevation: 0
                        }}
                        indicatorStyle={{
                            backgroundColor: '#0E564D',
                            borderTopLeftRadius: scale(2),
                            borderTopRightRadius: scale(2)
                        }}
                        tabStyle={{ paddingHorizontal: 0 }}
                    />
                )}
                onIndexChange={setTabIndex}
                style={{
                    minHeight:
                        Math.max(
                            viewHeight.tab1,
                            viewHeight.tab2,
                            viewHeight.tab3
                        ) + scale(60)
                }}
            />

            <ViewDocModal
                isOpen={openViewDoc}
                onClose={onCloseViewDoc}
                url={selectedFile}
            />
            <QuestionModal
                visibleQuestion={visibleQuestion}
                setVisibleQuestion={setVisibleQuestion}
                sendQuestion={sendQuestion}
                questionLoading={questionLoading}
                questionTitle={questionTitle}
                questionContent={questionContent}
            />
            <FinishTrialModal
                isTrialModalVisible={isTrialModalVisible}
                setIsTrialModalVisible={setIsTrialModalVisible}
                navigation={navigation}
                courseId={courseId}
            />
        </SafeAreaView>
    )
}

export default CourseDetail

const ViewDocModal = ({ url, isOpen, onClose }) => (
    <Modal isOpen={isOpen} onClose={onClose}>
        <WebView
            originWhitelist={['*']}
            source={{
                uri: url
            }}
            style={{
                width: '100%',
                height: h,
                border: 'none'
            }}
        />
    </Modal>
)

const QuestionModal = ({
    questionTitle,
    questionContent,
    visibleQuestion,
    setVisibleQuestion,
    sendQuestion,
    questionLoading
}) => {
    return (
        <Modal
            visible={visibleQuestion}
            onClose={() => setVisibleQuestion(false)}>
            <VStack space={10} style={{ padding: 20, marginTop: 10 }}>
                <Input
                    allowClear
                    label="Tiêu đề câu hỏi"
                    placeholder="Nhập tiêu đề câu hỏi"
                    {...questionTitle}
                />
                <Input
                    label="Nội dung câu hỏi"
                    multiline={true}
                    height={100}
                    placeholder="Nhập nội dung câu hỏi tại đây..."
                    {...questionContent}
                />
                <Button
                    onPress={sendQuestion}
                    isLoading={questionLoading}
                    isLoadingText="Đang gửi câu hỏi...">
                    Gửi câu hỏi
                </Button>
            </VStack>
        </Modal>
    )
}

const FinishTrialModal = ({
    courseId,
    navigation,
    isTrialModalVisible,
    setIsTrialModalVisible
}) => {
    const userInfo = getGlobalState('userInfo')

    return (
        <Modal
            visible={isTrialModalVisible}
            onClose={() => setIsTrialModalVisible(false)}>
            <VStack space={10} style={{ padding: 20, marginTop: 10 }}>
                <Text style={{ fontSize: 16 }}>
                    Bạn đã học hết nội dung học thử. Vui lòng mua khóa học để
                    tiếp tục
                </Text>
                {userInfo?.id === 'trial' ? (
                    <Button
                        onPress={() => {
                            clearDataAfterLogout(ROUTES.SignUp)
                        }}>
                        Tạo tài khoản
                    </Button>
                ) : (
                    <Button
                        onPress={() =>
                            navigation.navigate(ROUTES.CourseInfo, {
                                id: courseId
                            })
                        }>
                        Đến trang khóa học
                    </Button>
                )}
            </VStack>
        </Modal>
    )
}
