import { useQuery } from '@apollo/client'
import axios from 'app/Axios'
import { getGlobalState, setGlobalState } from 'app/Store'
import {
    Avatar,
    Button,
    CourseDetailSkeleton,
    NoData,
    Rate,
    Text,
    VStack,
    VideoViewer,
    showToast
} from 'app/atoms'
import { APP_URL, COURSE_IMG_PATH, STYLES } from 'app/constants'
import BenefitTab from 'app/containers/BenefitTab'
import ComboTab from 'app/containers/ComboTab'
import ComboTeacherTab from 'app/containers/ComboTeacherTab'
import CommentTab from 'app/containers/CommentTab'
import LectureTab from 'app/containers/LectureTab'
import TeacherTab from 'app/containers/TeacherTab'
import { scale } from 'app/helpers/responsive'
import { getData, storeData, toCurrency } from 'app/helpers/utils'
import { ROADMAP_LIST } from 'app/qqlStore/queries'
import { svgCertificate, svgNote, svgOnline } from 'assets/svg'
import React, { useEffect, useState } from 'react'

import {
    BackHandler,
    Image,
    Linking,
    Pressable,
    SafeAreaView,
    ScrollView,
    Share,
    View
} from 'react-native'
import {
    DollarSign,
    Heart,
    Navigation,
    Share2,
    ShoppingCart
} from 'react-native-feather'
import { SvgXml } from 'react-native-svg'
import { TabBar, TabView } from 'react-native-tab-view'

import HeaderBack from 'app/components/header-back'
import HeaderBackParent from 'app/components/header-back/backToParent'

const CourseInfo = ({ navigation, route }) => {
    const { id } = route.params
    const { data: dataRoadmap } = useQuery(ROADMAP_LIST, {
        variables: { course_id: 162 }
    })

    const userInfo = getGlobalState('userInfo')
    const [data, setData] = useState()
    const [loading, setLoading] = useState(false)
    const [loadingVerify, setLoadingVerify] = useState(false)
    const [inCart, setInCart] = useState(false)
    const [teacherName, setTeacherName] = useState()
    const [tabIndex, setTabIndex] = useState(0)
    const [viewHeight, setViewHeight] = useState({
        tab1: 0,
        tab2: 0,
        tab3: 0,
        tab4: 0,
        footer: 0
    })
    const [isLiked, setIsLiked] = useState(false)
    const [currentId, setCurrentId] = useState()

    const routes = data?.is_combo
        ? [
            {
                key: 'tab-1',
                title: 'Giới thiệu'
            },
            {
                key: 'tab-2',
                title: 'Khóa học'
            },
            {
                key: 'tab-3',
                title: 'Giảng viên'
            }
        ]
        : [
            {
                key: 'tab-1',
                title: 'Giới thiệu'
            },
            {
                key: 'tab-2',
                title: 'Nội dung'
            },
            {
                key: 'tab-3',
                title: 'Giảng viên'
            },
            {
                key: 'tab-4',
                title: 'Đánh giá'
            }
        ]

    useEffect(() => {
        if (data) {
            setIsLiked(data?.isLiked)
        }
    }, [])

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            function () {
                return true
            }
        )

        if (id) {
            setLoading(true)
            axios
                .get(
                    `${userInfo?.id === 'trial'
                        ? 'get-course-info'
                        : 'auth-get-course-info'
                    }/${id}`
                )
                .then(res => {
                    console.log(res)
                    if (res.data && res.data.status === 200) {
                        return res.data
                    } else {
                        showToast({
                            title: 'Khóa học không tồn tại hoặc bị ẩn, vui lòng liên hệ quản trị viên',
                            status: 'error'
                        })
                        navigation.goBack()
                    }
                })
                .then(data => {
                    setData(data?.data)
                    const parentId = data?.data?.parent?.id

                    if (parentId) {
                        navigation.setOptions({
                            headerLeft: () => (
                                <HeaderBackParent parentId={parentId} />
                            )
                        })
                    } else {
                        navigation.setOptions({
                            headerLeft: () => <HeaderBack />
                        })

                        backHandler.remove()
                    }
                })
                .catch(err => console.log(err))
                .finally(() => setLoading(false))
        }

        return () => backHandler.remove()
    }, [id])

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
                        <VStack>
                            <BenefitTab
                                courseId={data?.id}
                                longDes={data?.l_des?.split('</p>')}
                            />
                        </VStack>
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
                        }>
                        {data?.is_combo ? (
                            <ComboTab data={data} />
                        ) : (
                            <LectureTab
                                courseId={data?.id}
                                totalLectures={data?.total_lectures}
                                navigateToLesson={setCurrentId}
                            />
                        )}
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
                        }>
                        {data?.is_combo ? (
                            <ComboTeacherTab
                                list={data?.combo?.map(
                                    subCourse => subCourse?.sub_course?.mentor
                                )}
                            />
                        ) : data?.mentor_id ? (
                            <TeacherTab
                                mentorId={data?.mentor_id}
                                setTeacherName={setTeacherName}
                            />
                        ) : (
                            <NoData />
                        )}
                    </View>
                )
            case 'tab-4':
                return (
                    <View
                        onLayout={e =>
                            setViewHeight({
                                ...viewHeight,
                                tab4: e.nativeEvent.layout.height
                            })
                        }
                        style={{ padding: scale(16) }}>
                        <CommentTab courseId={data?.id} />
                    </View>
                )
            default:
                return null
        }
    }

    const onShare = async () => {
        try {
            await Share.share({
                message: `${APP_URL}course-details/${data?.slug}`
            })
        } catch (error) {
            console.error(error)
        }
    }

    if (loading) {
        return <CourseDetailSkeleton />
    }

    const addToWishList = () => {
        axios
            .get('courses/add-wishlist/' + data?.id)
            .then(res => {
                if (res.data.status === 200) {
                    showToast({
                        title: 'Đã thêm khóa học vào danh sách yêu thích',
                        status: 'success'
                    })
                    setIsLiked(true)
                }
            })
            .catch(err => console.error(err))
    }

    const removeToWishList = () => {
        axios.get('courses/remove-from-wishlist/' + data?.id).then(res => {
            if (res.data.status === 200) {
                showToast({
                    title: 'Đã xóa khóa học khỏi danh sách yêu thích',
                    status: 'success'
                })
                setIsLiked(false)
            }
        })
    }

    const addToCart = async () => {
        if (userInfo?.id === 'trial') {
            setGlobalState('visibleNotLogin', true)
        } else {
            setInCart(true)
            let carts = (await getData('@cart')) || []
            const course = {
                id: data?.id,
                title: data?.title,
                new_price: data?.new_price,
                old_price: data?.old_price
            }
            const newCarts = Array.isArray(carts)
                ? [course, ...carts]
                : [course]
            storeData('@cart', newCarts)
            setGlobalState('carts', newCarts)
            showToast({
                title: 'Đã thêm khóa học vào giỏ hàng',
                status: 'success'
            })
        }
    }

    const gotoCourse = () => {
        setLoadingVerify(true)
        axios
            .get('courses/verify/' + data?.slug)
            .then(res => {
                if (res.status === 200) {
                    const { data: resData } = res?.data
                    if (res?.data?.survey) {
                        showToast({
                            title: 'Thông báo từ hệ thống',
                            description:
                                'Bạn chưa hoàn thành khảo sát trước khóa học, vui lòng thực hiện khảo sát để tiếp tục khóa học'
                        })
                        setTimeout(() => {
                            Linking.openURL(
                                `${APP_URL}take-survey/${res?.data?.survey}`
                            )
                        }, 500)

                        return
                    }
                    if (
                        resData?.required?.id &&
                        resData?.percentOfRequired < 90
                    ) {
                        showToast({
                            title: `Bạn chưa hoàn thành khóa học ${resData?.required?.title}`
                        })

                        return
                    }

                    navigation.navigate(ROUTES.CourseDetail, {
                        courseId: data?.relational?.course_id,
                        currentLecture:
                            data?.relational?.current_lecture ||
                            data?.first_lecture_id
                    })
                } else {
                    console.log('Error')
                }
            })
            .finally(() => setLoadingVerify(false))
    }

    // Khóa học lộ trình
    const handleToLearningPath = () => {
        // navigation.navigate(ROUTES.EntranceTest)
        const adjust =
            dataRoadmap?.Roadmaps.data[0].sub_course.order_number2 !== 0
        if (adjust) {
            navigation.navigate(ROUTES.LearningPath)
        } else if (data?.roadmap_test_result > 0) {
            navigation.navigate(ROUTES.InputTestResult, {
                title: 'Kết quả kiểm tra',
                idPretest: data?.roadmap_pretest_id
            })
        } else {
        }
        setLoadingVerify(false)
    }

    return (
        <View style={{ flex: 1 }}>
            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={false}>
                {data?.video_path ? (
                    <VideoViewer
                        videoUrl={data?.video_path}
                        poster={`${COURSE_IMG_PATH}${data?.id}.webp`}
                    />
                ) : (
                    <Image
                        resizeMode="contain"
                        source={{
                            uri: `${COURSE_IMG_PATH}${data?.id}.webp`
                        }}
                        style={{
                            width: '100%',
                            height: scale(200)
                        }}
                        alt={`${COURSE_IMG_PATH}${data?.id}.webp`}
                        fallbackSource={require('assets/images/fallback.jpg')}
                    />
                )}
                <View
                    style={{
                        paddingVertical: scale(16),
                        paddingHorizontal: scale(16),
                        borderBottomWidth: scale(2),
                        borderBottomColor: '#F0F1F6'
                    }}>
                    <Text
                        bold
                        style={{
                            fontSize: scale(18),
                            color: '#000',
                            lineHeight: scale(23)
                        }}>
                        {data?.title}
                    </Text>
                    {data?.mentor_id && (
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginTop: scale(16)
                            }}>
                            <Avatar userId={data?.mentor_id} />
                            <View style={{ marginLeft: scale(8) }}>
                                <Text
                                    bold
                                    style={{
                                        fontSize: scale(18),
                                        color: '#6C746E'
                                    }}>
                                    {teacherName || 'Giảng viên'}
                                </Text>
                                <View
                                    style={{
                                        marginTop: scale(6)
                                    }}>
                                    <Rate rate={data?.rate || 5} size="18" />
                                </View>
                            </View>
                        </View>
                    )}
                    <Text
                        style={{
                            marginTop: scale(16),
                            fontSize: scale(16),
                            color: '#000'
                        }}>
                        {data?.s_des}
                    </Text>
                    {renderDetailCourse(data?.is_roadmap)}
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
                                            fontSize: scale(15),
                                            color: '#6C746E',
                                            textAlign: 'center'
                                        },
                                        focused && { color: '#0E564D' }
                                    ]}>
                                    {route.title}
                                </Text>
                            )}
                            style={{ backgroundColor: '#fff' }}
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
                                viewHeight.tab3,
                                viewHeight.tab4
                            ) +
                            viewHeight.footer +
                            scale(100)
                    }}
                />
            </ScrollView>
            <SafeAreaView
                onLayout={e =>
                    setViewHeight({
                        ...viewHeight,
                        footer: e.nativeEvent.layout.height
                    })
                }
                edges={['bottom']}
                style={[
                    {
                        position: 'absolute',
                        bottom: 0,
                        width: '100%',
                        paddingVertical: 5,
                        paddingHorizontal: scale(16)
                    },
                    STYLES.boxShadow
                ]}>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingTop: 5
                    }}>
                    <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {data && userInfo?.id !== 'trial' ? (
                            <Pressable
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginRight: scale(30)
                                }}
                                onPress={
                                    isLiked ? removeToWishList : addToWishList
                                }>
                                <Heart
                                    stroke="#52B553"
                                    fill={isLiked ? '#52B553' : '#fff'}
                                    width={24}
                                    height={24}
                                />
                                <Text
                                    style={{
                                        fontSize: scale(14),
                                        color: '#52B553',
                                        marginTop: scale(4)
                                    }}>
                                    {isLiked ? 'Đã thích' : 'Yêu thích'}
                                </Text>
                            </Pressable>
                        ) : null}
                        <Pressable
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginRight: scale(30)
                            }}
                            onPress={onShare}>
                            <Share2 stroke="#52B553" width={24} height={24} />
                            <Text
                                style={{
                                    fontSize: scale(14),
                                    color: '#52B553',
                                    marginTop: scale(4)
                                }}>
                                Chia sẻ
                            </Text>
                        </Pressable>
                        <Pressable
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginRight: scale(30)
                            }}
                            onPress={() => {
                                if (data?.is_combo) {
                                    showToast({
                                        title: 'Đây là khóa học tổng hợp, vui lòng truy cập vào khóa học con để bắt đầu học'
                                    })
                                } else {
                                    navigation.navigate(
                                        ROUTES.CourseDetailTrial,
                                        {
                                            courseId: data?.id,
                                            currentLecture:
                                                data?.first_lecture_id
                                        }
                                    )
                                }
                            }}>
                            <Navigation
                                stroke="#52B553"
                                fill={'#52B553'}
                                width={24}
                                height={24}
                            />
                            <Text outlined style={{ color: '#52B553' }}>
                                Học thử
                            </Text>
                        </Pressable>
                    </View>
                    {data && (
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                            {userInfo?.id === 'trial' ? (
                                <Button
                                    pt={2}
                                    pb={2}
                                    pr={5}
                                    pl={5}
                                    style={{
                                        backgroundColor: '#52B553',
                                        borderRadius: 8
                                    }}
                                    onPress={clearDataAfterLogout}>
                                    Đến trang đăng nhập
                                </Button>
                            ) : (
                                <>
                                    {!data?.relational && data?.ios_price ? (
                                        <Button
                                            onPress={handlePurchase}
                                            isLoading={loadingVerify}
                                            isLoadingText="Đang xử lý"
                                            leftIcon={
                                                <>
                                                    <ShoppingCart
                                                        stroke="#fff"
                                                        size={10}
                                                    />
                                                </>
                                            }>
                                            Mua ngay
                                        </Button>
                                    ) : null}

                                    {data?.relational &&
                                        data?.is_roadmap === 1 ? (
                                        <Button
                                            onPress={handleToLearningPath}
                                            isLoading={loadingVerify}
                                            isLoadingText="Đang vào">
                                            {dataRoadmap?.Roadmaps.data[0]
                                                .sub_course.order_number2 !== 0
                                                ? 'Học ngay'
                                                : data?.roadmap_test_result > 0
                                                    ? 'Xem kết quả'
                                                    : 'Làm bài test'}
                                        </Button>
                                    ) : null}

                                    {data?.relational &&
                                        !data?.is_combo &&
                                        !data?.is_roadmap ? (
                                        <Button
                                            onPress={gotoCourse}
                                            isLoading={loadingVerify}
                                            isLoadingText="Đang vào">
                                            Học ngay
                                        </Button>
                                    ) : null}
                                </>
                            )}
                        </View>
                    )}
                </View>
            </SafeAreaView>
        </View>
    )
}

export default CourseInfo
