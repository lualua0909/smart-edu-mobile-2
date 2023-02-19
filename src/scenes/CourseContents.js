import axios from 'app/Axios'
import { useGlobalState } from 'app/Store'
import {
    DocumentViewer,
    EnglishReading,
    ExamViewer,
    FinishCourse,
    Input,
    Loading,
    NoData,
    ScormViewer,
    VideoViewer
} from 'app/atoms'
import { API_URL } from 'app/constants'
import LectureTab from 'app/containers/LectureTab'
import { scale } from 'app/helpers/responsive'
import useFormInput from 'app/helpers/useFormInput'
import { svgComment } from 'assets/svg'
import React, { useEffect, useState } from 'react'

import Countdown from 'react-countdown'
import { Dimensions, Pressable, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { SvgXml } from 'react-native-svg'
import { TabBar, TabView } from 'react-native-tab-view'

import {
    Button,
    FormControl,
    Modal,
    Text,
    TextArea,
    useToast
} from 'native-base'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const routes = [
    {
        key: 'tab-1',
        title: 'Giáo trình'
    },
    {
        key: 'tab-2',
        title: 'Thảo luận'
    },
    {
        key: 'tab-3',
        title: 'Đặt câu hỏi'
    }
]

const CourseDetail = ({ route, navigation }) => {
    const toast = useToast()
    const { courseId, currentLecture } = route.params
    const [tabIndex, setTabIndex] = useState(0)
    const [viewHeight, setViewHeight] = useState({
        tab1: 0,
        tab2: 0,
        tab3: 0
    })
    const [loading, setLoading] = useState(false)
    const [visibleQuestion, setVisibleQuestion] = useState(false)
    const [currentId, setCurrentId] = useState()
    const [data, setData] = useState()
    const [chapters, setChapters] = useState()
    const [userInfo, setUserState] = useGlobalState('userInfo')
    const questionTitle = useFormInput()
    const questionContent = useFormInput()
    const [questionLoading, setQuestionLoading] = useState(false)
    const [hideHeaderTitle, setHideHeaderTitle] = useState(false)
    const [finishedLectures, setFinishedLectures] =
        useGlobalState('finishedLectures')
    const [currentCourseId, setCurrentCourseId] =
        useGlobalState('currentCourseId')

    useEffect(() => {
        const t = setTimeout(() => setHideHeaderTitle(true), 3000)

        return () => {
            clearTimeout(t)
        }
    }, [hideHeaderTitle])

    const countdown = (
        <Countdown
            date={Date.now() + data?.time_to_skip * 1000}
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
                    smallSize
                )
            }
        />
    )

    navigation.setOptions({
        headerTitle: () => (
            <>
                {hideHeaderTitle ? null : (
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingVertical: 0
                        }}>
                        <Button
                            size={'xs'}
                            onPress={prevLesson}
                            variant="subtle"
                            colorScheme="green"
                            style={{
                                marginRight: scale(12),
                                width: 100
                            }}>
                            Bài trước
                        </Button>
                        {data?.is_finish ? (
                            <Button
                                size={'xs'}
                                style={{
                                    backgroundColor: '#52B553',
                                    width: 120
                                }}
                                onPress={nextLesson}>
                                Bài tiếp theo
                            </Button>
                        ) : (
                            countdown
                        )}
                    </View>
                )}
            </>
        ),
        headerTransparent: true
    })

    const renderer = (
        { total, days, hours, minutes, seconds, milliseconds, completed },
        smallSize = false
    ) => {
        if (completed) {
            return (
                <Button size={smallSize ? 'sm' : 'lg'} onPress={nextLesson}>
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
                        toast.show({
                            title: 'Vui lòng đợi hết thời gian chờ qua bài',
                            status: 'info',
                            placement: 'top'
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

    const renderActionButtons = (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: scale(16)
            }}>
            <Button
                size={'sm'}
                onPress={prevLesson}
                variant="subtle"
                // leftIcon={!smallSize && <ChevronLeft stroke="#52B553" />}
                colorScheme="green"
                style={{
                    marginRight: scale(12),
                    width: 'auto'
                }}>
                Bài trước
            </Button>
            {data?.is_finish ? (
                <Button
                    size={'sm'}
                    style={{
                        backgroundColor: '#52B553',
                        width: 'auto'
                    }}
                    onPress={nextLesson}
                    // rightIcon={
                    //     !smallSize && <ChevronRight stroke="white" />
                    // }
                >
                    Bài tiếp theo
                </Button>
            ) : (
                countdown
            )}
        </View>
    )

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
                console.log('CourseDetail', data)
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
        }
    }, [courseId, currentId])

    const addLessonToFinishedList = () => {
        const params = {
            courseId: courseId,
            lectureId: currentId
        }

        axios.post('courses/add-finished-lecture', params).then(res => {
            if (res.data.status === 200) {
                console.log('ok')
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
        return <Loading />
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
                        <NoData />
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
                            width={scale(160)}
                            height={scale(160)}
                        />
                        <Text
                            style={{
                                paddingTop: 20,
                                marginTop: scale(26),
                                fontSize: scale(22)
                            }}>
                            Hiện chưa đặt câu hỏi nào
                        </Text>
                        <Text
                            style={{
                                fontSize: scale(16),
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
        <View
            style={{ flex: 1 }}
            onStartShouldSetResponder={() => {
                setHideHeaderTitle(false)
            }}>
            <KeyboardAwareScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
                extraHeight={scale(100)}>
                <View
                    style={{
                        width: Math.max(windowWidth, windowHeight),
                        height: Math.min(windowHeight, windowWidth),
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    {data?.type === 1 ? (
                        <VideoViewer
                            videoUrl={data?.file_path || data?.video_url}
                        />
                    ) : data?.type === 2 ? (
                        <DocumentViewer content={data?.text_document} />
                    ) : data?.type === 3 ? (
                        <ScormViewer
                            src={`${API_URL}scorm/${courseId}/${currentId}/${userInfo.id}`}
                        />
                    ) : data?.type === 4 ? (
                        <ExamViewer data={data} />
                    ) : data?.type === 5 ? (
                        <EnglishReading data={data} />
                    ) : (
                        <FinishCourse />
                    )}
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingVertical: scale(16)
                    }}>
                    <Text
                        style={{
                            fontSize: scale(14),
                            color: '#52B553'
                        }}>
                        {data?.name}
                    </Text>
                </View>
                {renderActionButtons}
                <TabView
                    navigationState={{ index: tabIndex, routes }}
                    renderScene={renderScene}
                    renderTabBar={props => (
                        <TabBar
                            {...props}
                            renderLabel={({ route, focused, color }) => (
                                <Text
                                    style={[
                                        {
                                            fontSize: scale(15),
                                            color: '#1F1F1F',
                                            textAlign: 'center'
                                        },
                                        focused && { color: '#0E564D' }
                                    ]}>
                                    {route.title}
                                </Text>
                            )}
                            style={{
                                backgroundColor: '#fff',
                                elevation: 0,
                                borderBottomWidth: 1,
                                borderBottomColor: '#ddd'
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
                            ) + scale(100)
                    }}
                />
            </KeyboardAwareScrollView>

            <Modal
                isOpen={visibleQuestion}
                onClose={() => setVisibleQuestion(false)}>
                <Modal.Content>
                    <Modal.CloseButton />
                    <Modal.Header>Gửi câu hỏi cho giảng viên</Modal.Header>
                    <Modal.Body>
                        <FormControl>
                            <Input
                                placeholder="Nhập tiêu đề câu hỏi"
                                w="100%"
                                {...questionTitle}
                            />
                        </FormControl>
                        <FormControl mt="3">
                            <TextArea
                                h={20}
                                placeholder="Nhập nội dung câu hỏi tại đây..."
                                w="100%"
                                {...questionContent}
                            />
                        </FormControl>
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
        </View>
    )
}

export default CourseDetail
