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
    ScormViewer,
    Text,
    VideoViewer,
    showToast
} from 'app/atoms'
import { API_URL } from 'app/constants'
import LectureTab from 'app/containers/LectureTab'
import { scale } from 'app/helpers/responsive'
import { clearDataAfterLogout } from 'app/helpers/utils'
import React, { useEffect, useState } from 'react'

import { SafeAreaView, View } from 'react-native'
import { TabBar, TabView } from 'react-native-tab-view'

const routes = [
    {
        key: 'tab-1',
        title: 'Nội dung khóa học'
    }
]

const CourseDetail = ({ route, navigation }) => {
    const { courseId, currentLecture } = route.params
    const [tabIndex, setTabIndex] = useState(0)
    const [viewHeight, setViewHeight] = useState({
        tab1: 0
    })
    const [loading, setLoading] = useState(false)
    const [currentId, setCurrentId] = useState()
    const [data, setData] = useState()
    const [chapters, setChapters] = useState()
    const [trialChapters, setTrialChapters] = useState()
    const [userInfo, _setUserState] = useGlobalState('userInfo')
    const [hideHeaderTitle, setHideHeaderTitle] = useState(false)
    const [scormLoading, setScormLoading] = useState(false)
    const [courseData, setCourseData] = useState()
    const [_currentCourseId, setCurrentCourseId] =
        useGlobalState('currentCourseId')

    useEffect(() => {
        const t = setTimeout(() => setHideHeaderTitle(true), 3000)
        return () => {
            clearTimeout(t)
        }
    }, [hideHeaderTitle])

    // navigation.setOptions({
    //     headerTitle: () => (
    //         <>
    //             {hideHeaderTitle ? null : (
    //                 <View
    //                     style={{
    //                         flexDirection: 'row',
    //                         alignItems: 'center',
    //                         justifyContent: 'center',
    //                         paddingVertical: 0
    //                     }}>
    //                     <Button
    //                         size="sm"
    //                         onPress={prevLesson}
    //                         style={{
    //                             marginRight: scale(12),
    //                             height: 30,
    //                             color: 'white'
    //                         }}>
    //                         <ChevronLeft
    //                             stroke="green"
    //                             width={24}
    //                             height={24}
    //                         />
    //                     </Button>
    //                     <Button
    //                         size="sm"
    //                         onPress={nextLesson}
    //                         style={{
    //                             marginRight: scale(12)
    //                         }}
    //                         leftIcon={
    //                             <>
    //                                 <ChevronRight
    //                                     stroke="#fff"
    //                                     width={24}
    //                                     height={24}
    //                                 />
    //                             </>
    //                         }></Button>
    //                 </View>
    //             )}
    //         </>
    //     ),
    //     headerTransparent: true
    // })

    useEffect(() => {
        if (chapters?.length) {
            const c = chapters.filter(i => i?.trial)
            setTrialChapters(c)
        }
    }, [chapters])

    useEffect(() => {
        if (currentLecture) {
            setCurrentId(currentLecture)
        }
    }, [currentLecture])

    const getData = () => {
        setLoading(true)
        axios
            .get(
                `${userInfo?.id === 'trial' ? 'public-lectures' : 'lectures'
                }/get/${currentId}`
            )
            .then(res => {
                if (res.data.status === 200) return res.data.data
            })
            .then(data => {
                setData(data)
            })
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        if (courseId) {
            setCurrentCourseId(courseId)
        }
    }, [courseId])

    useEffect(() => {
        if (currentId) {
            getData()
        }
    }, [currentId])

    const showFinishToast = () => {
        showToast({
            title: `Bạn đã học hết nội dung học thử. Vui lòng ${userInfo?.id === 'trial' ? 'tạo tài khoản và' : ''
                } mua khóa học để tiếp tục`,
            status: 'success',
            description:
                userInfo?.id === 'trial' ? (
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
                                id: courseData?.id
                            })
                        }>
                        Đến trang khóa học
                    </Button>
                )
        })
    }
    const nextLesson = () => {
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

    const prevLesson = () => {
        const current = trialChapters?.findIndex(i => i?.id === currentId)
        if (current > 0) {
            const prev = trialChapters[current - 1]
            setCurrentId(prev?.id)
        } else {
            showFinishToast()
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
            default:
                return null
        }
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
                    alignItems: 'center',
                    height: 300
                }}>
                {data?.type === 1 ? (
                    <VideoViewer
                        videoUrl={data?.file_path || data?.video_url}
                    />
                ) : data?.type === 2 ? (
                    <DocumentViewer
                        content={data?.text_document}
                        uri={`${API_URL}public/${data?.file_path}`}
                    />
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
                    minHeight: Math.max(viewHeight.tab1) + scale(60)
                }}
            />
        </SafeAreaView>
    )
}

export default CourseDetail
