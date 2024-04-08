import axios from 'app/Axios'
import { useGlobalState } from 'app/Store'
import {
    AbsoluteSpinner,
    Button,
    Center,
    DocumentViewer,
    EnglishReading,
    ExamViewer,
    FinishCourse,
    Input,
    NoDataAnimation,
    ScormViewer,
    Text,
    VStack,
    VideoViewer,
    showToast
} from 'app/atoms'
import { API_URL } from 'app/constants'
import LectureTab from 'app/containers/LectureTab'
import { scale } from 'app/helpers/responsive'
import useFormInput from 'app/helpers/useFormInput'
import { svgComment } from 'assets/svg'
import React, { useEffect, useState } from 'react'

import Countdown from 'react-countdown'
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

import { Modal, TextArea } from 'native-base'

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
    const { courseId, currentLecture } = route.params
    const [tabIndex, setTabIndex] = useState(0)
    const [viewHeight, setViewHeight] = useState({
        tab1: 0,
        tab2: 0,
        tab3: 0
    })
    const [documents, setDocuments] = useState([])
    const [loading, setLoading] = useState(false)
    const [visibleQuestion, setVisibleQuestion] = useState(false)
    const [currentId, setCurrentId] = useState()
    const [data, setData] = useState()
    const [chapters, setChapters] = useState()
    const [userInfo, _setUserState] = useGlobalState('userInfo')
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
    const [scormLoading, setScormLoading] = useState(false)
    const [countDown, setCountDown] = useState()
    const onCloseViewDoc = () => setOpenViewDoc(false)

    useEffect(() => {
        const t = setTimeout(() => setHideHeaderTitle(true), 5000)

        return () => {
            clearTimeout(t)
        }
    }, [hideHeaderTitle])
    const handleAppStateChange = nextAppState => {
        console.log('next', nextAppState)
        if (nextAppState === 'inactive') {
            console.log('the app is closed')
        }
    }
    // Bắt xự kiện người dùng thoát app
    useEffect(() => {
        AppState.addEventListener('change', handleAppStateChange)
        // return () => {
        //     AppState.removeEventListener('change', event =>
        //         handleAppStateChange(event)
        //     )
        // }
    }, [])

    // useEffect(() => {
    //     let userInfo2 = getData('@userInfo')
    //     _setUserState(userInfo2)
    // }, [])

    const countdown = (
        <Countdown
            date={countDown}
            renderer={({
                total,
                days,
                hours,
                minutes,
                seconds,
                milliseconds,
                completed
            }) =>
                renderer(
                    {
                        total,
                        days,
                        hours,
                        minutes,
                        seconds,
                        milliseconds,
                        completed
                    },
                    false
                )
            }
        />
    )

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

    const renderer = ({
        total,
        days,
        hours,
        minutes,
        seconds,
        milliseconds,
        completed
    }) => {
        if (completed) {
            return (
                <Button size={'sm'} onPress={nextLesson}>
                    Bài tiếp theo
                </Button>
            )
        } else {
            return (
                <Pressable
                    style={{
                        width: scale(120),
                        height: scale(38),
                        backgroundColor: '#52B553',
                        borderRadius: scale(10),
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    onPress={() =>
                        showToast({
                            title: 'Vui lòng đợi hết thời gian chờ qua bài',
                            status: 'info'
                        })
                    }>
                    <Text
                        style={{
                            fontSize: scale(14),
                            color: '#fff'
                        }}>
                        {hours} : {minutes} : {seconds}
                    </Text>
                </Pressable>
            )
        }
    }

    useEffect(() => {
        if (currentLecture) {
            setCurrentId(currentLecture)
        }
    }, [currentLecture])

    const getData = () => {
        setLoading(true)
        axios
            .get(`lectures/get/${currentId}`)
            .then(res => {
                if (res.data.status === 200) return res.data.data
            })
            .then(data => {
                setData(data)
                setCountDown(Date.now() + data?.time_to_skip * 1000)
            })
            .finally(() => setLoading(false))
    }

    const getDocuments = () => {
        setLoading(true)
        axios
            .get(`admin/courses/resources/paging/${courseId}`)
            .then(res => {
                if (res.data.status === 200) return res.data.data
            })
            .then(data => {
                setDocuments(data)
            })
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        if (courseId) {
            setCurrentCourseId(courseId)
        }
    }, [courseId])

    useEffect(() => {
        if (courseId && currentId) {
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

    const nextLesson = () => {
        const current = chapters.findIndex(i => i.id === currentId)
        const next = chapters[current + 1]
        addLessonToFinishedList()
        setCurrentId(next?.id)
    }

    const prevLesson = () => {
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
                                paddingVertical: scale(10.5),
                                paddingHorizontal: scale(31),
                                marginTop: scale(16)
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
                    alignItems: 'center'
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
                {data?.is_finish ? (
                    <Button size={'sm'} onPress={nextLesson}>
                        Bài tiếp theo
                    </Button>
                ) : (
                    countdown
                )}
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

            <Modal
                isOpen={visibleQuestion}
                onClose={() => setVisibleQuestion(false)}>
                <Modal.Content>
                    <Modal.Header>Gửi câu hỏi</Modal.Header>
                    <Modal.Body>
                        <VStack space={10}>
                            <Input
                                label="Tiêu đề"
                                placeholder="Nhập tiêu đề câu hỏi"
                                w="100%"
                                {...questionTitle}
                            />
                            <TextArea
                                label="Nội dung"
                                h={20}
                                placeholder="Nhập nội dung câu hỏi tại đây..."
                                w="100%"
                                {...questionContent}
                            />
                        </VStack>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            onPress={sendQuestion}
                            isLoading={questionLoading}
                            isLoadingText="Đang gửi câu hỏi...">
                            Gửi câu hỏi
                        </Button>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
            <ViewDocModal
                isOpen={openViewDoc}
                onClose={onCloseViewDoc}
                url={selectedFile}
            />
        </SafeAreaView>
    )
}

export default CourseDetail

const ViewDocModal = ({ url, isOpen, onClose }) => (
    <Modal isOpen={isOpen} onClose={onClose}>
        <Modal.Content w="100%" h={h} maxH="100%">
            <Modal.Body>
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
            </Modal.Body>
            <Modal.Footer>
                <Button colorScheme={'danger'} onPress={onClose}>
                    Đóng
                </Button>
            </Modal.Footer>
        </Modal.Content>
    </Modal>
)
