import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    Pressable,
    ScrollView,
    Share,
    Dimensions,
    Linking,
} from 'react-native'
import { SvgXml } from 'react-native-svg'
import { scale } from 'app/helpers/responsive'
import { svgCertificate, svgNote, svgOnline, svgOrangeStar } from 'assets/svg'
import { FONTS, STYLES, API_URL, COURSE_IMG_PATH, APP_URL } from 'app/constants'
import { TabView, TabBar } from 'react-native-tab-view'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Avatar, CourseDetailSkeleton, NoData } from 'app/atoms'
import { toCurrency, storeData, getData } from 'app/helpers/utils'
import { VStack, Image, useToast, Button } from 'native-base'
import Axios from 'app/Axios'
import BenefitTab from 'app/containers/BenefitTab'
import { WebView } from 'react-native-webview'
import LectureTab from 'app/containers/LectureTab'
import TeacherTab from 'app/containers/TeacherTab'
import CommentTab from 'app/containers/CommentTab'
import RenderHtml from 'react-native-render-html'
import { Heart, Share2, BookOpen, ShoppingCart } from 'react-native-feather'
import { useGlobalState } from 'app/Store'

const w = Dimensions.get('window').width
const h = Dimensions.get('window').height

const routes = [
    {
        key: 'tab-1',
        title: 'Giới thiệu',
    },
    {
        key: 'tab-2',
        title: 'Nội dung',
    },
    {
        key: 'tab-3',
        title: 'Giảng viên',
    },
    {
        key: 'tab-4',
        title: 'Đánh giá',
    },
]

const CourseInfo = ({ navigation, route }) => {
    const { id } = route.params
    const toast = useToast()
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
        footer: 0,
    })
    const [isLiked, setIsLiked] = useState(false)
    const [carts, setCarts] = useGlobalState('carts')

    useEffect(() => {
        if (data) {
            setIsLiked(data?.isLiked)
        }
    }, [])

    useEffect(() => {
        if (id) {
            setLoading(true)
            Axios.get(`auth-get-course-info/${id}`)
                .then((res) => {
                    if (res.data && res.data.status === 200) {
                        return res.data
                    } else {
                        toast.show({
                            title: 'Khóa học không tồn tại hoặc bị ẩn, vui lòng liên hệ quản trị viên',
                            status: 'error',
                            placement: 'top',
                        })
                        navigation.goBack()
                    }
                })
                .then((data) => {
                    setData(data?.data)
                    console.log('auth-get-course-info', data.data)
                })
                .catch((err) => console.error(err))
                .finally(() => setLoading(false))
        }
    }, [id])

    const renderScene = ({ route }) => {
        switch (route.key) {
            case 'tab-1':
                return (
                    <View
                        onLayout={(e) =>
                            setViewHeight({
                                ...viewHeight,
                                tab1: e.nativeEvent.layout.height,
                            })
                        }
                    >
                        <VStack space={4}>
                            <BenefitTab courseId={data?.id} />
                            <Text
                                style={{
                                    marginTop: scale(8),
                                    fontFamily: FONTS.MulishBold,
                                    fontSize: scale(16),
                                    color: '#52B553',
                                    marginLeft: 16,
                                }}
                            >
                                Mô tả chi tiết
                            </Text>
                            {data?.l_des && (
                                <RenderHtml
                                    contentWidth={w}
                                    source={{
                                        html: data?.l_des,
                                    }}
                                    tagsStyles={{
                                        p: {
                                            fontFamily: FONTS.Mulish,
                                            fontSize: 16,
                                            color: '#202020',
                                            fontWeight: '300',
                                            paddingLeft: 24,
                                            paddingRight: 10,
                                        },
                                    }}
                                />
                            )}
                        </VStack>
                    </View>
                )
            case 'tab-2':
                return (
                    <View
                        onLayout={(e) =>
                            setViewHeight({
                                ...viewHeight,
                                tab2: e.nativeEvent.layout.height,
                            })
                        }
                    >
                        <LectureTab
                            courseId={data?.id}
                            totalLectures={data?.total_lectures}
                        />
                    </View>
                )
            case 'tab-3':
                return (
                    <View
                        onLayout={(e) =>
                            setViewHeight({
                                ...viewHeight,
                                tab3: e.nativeEvent.layout.height,
                            })
                        }
                    >
                        {data?.mentor_id ? (
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
                        onLayout={(e) =>
                            setViewHeight({
                                ...viewHeight,
                                tab4: e.nativeEvent.layout.height,
                            })
                        }
                        style={{ padding: scale(16) }}
                    >
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
                message: `${APP_URL}course-details/${data?.slug}`,
            })
        } catch (error) {
            console.error(error)
        }
    }

    if (loading) {
        return <CourseDetailSkeleton />
    }

    const addToWishList = () => {
        Axios.get('courses/add-wishlist/' + data?.id)
            .then((res) => {
                if (res.data.status === 200) {
                    toast.show({
                        title: 'Đã thêm khóa học vào danh sách yêu thích',
                        status: 'success',
                        placement: 'top',
                    })
                    setIsLiked(true)
                }
            })
            .catch((err) => console.error(err))
    }

    const removeToWishList = () => {
        Axios.get('courses/remove-from-wishlist/' + data?.id).then((res) => {
            if (res.data.status === 200) {
                toast.show({
                    title: 'Đã xóa khóa học khỏi danh sách yêu thích',
                    status: 'success',
                    placement: 'top',
                })
                setIsLiked(false)
            }
        })
    }

    const addToCart = async () => {
        setInCart(true)
        const carts = (await getData('@cart')) || []
        const course = {
            id: data?.id,
            title: data?.title,
            new_price: data?.new_price,
            old_price: data?.old_price,
        }

        const newCarts = Array.isArray(carts) ? [course, ...carts] : [course]
        storeData('@cart', newCarts)
        setCarts(newCarts)
        toast.show({
            title: 'Đã thêm khóa học vào giỏ hàng',
            status: 'success',
            placement: 'top',
        })
    }

    const gotoCourse = () => {
        setLoadingVerify(true)
        Axios.get('courses/verify/' + data?.slug)
            .then((res) => {
                if (res.data.status === 200) {
                    if (res?.data?.survey) {
                        toast.show({
                            title: 'Thông báo từ hệ thống',
                            description:
                                'Bạn chưa hoàn thành khảo sát trước khóa học, vui lòng thực hiện khảo sát để tiếp tục khóa học',
                            status: 'success',
                            placement: 'top',
                        })
                        setTimeout(() => {
                            Linking.openURL(
                                `${APP_URL}take-survey/${res?.data?.survey}`
                            )
                        }, 500)
                    } else {
                        navigation.navigate(ROUTES.CourseDetail, {
                            courseId: data?.relational?.course_id,
                            currentLecture:
                                data?.relational?.current_lecture ||
                                data?.first_lecture_id,
                        })
                    }
                } else {
                    console.log('Error')
                }
            })
            .finally(() => setLoadingVerify(false))
    }

    return (
        <View style={{ flex: 1 }}>
            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
            >
                {data?.video_path ? (
                    <WebView
                        originWhitelist={['*']}
                        source={{
                            uri: `${API_URL}public/${data?.video_path}`,
                        }}
                        style={{ height: 200, width: Math.min(w, h) }}
                    />
                ) : (
                    <Image
                        resizeMode="contain"
                        source={{
                            uri: `${COURSE_IMG_PATH}${data?.id}.webp`,
                        }}
                        style={{
                            width: '100%',
                            height: scale(200),
                            borderTopLeftRadius: scale(10),
                            borderTopRightRadius: scale(10),
                        }}
                    />
                )}
                <View
                    style={{
                        paddingVertical: scale(16),
                        paddingHorizontal: scale(16),
                        borderBottomWidth: scale(2),
                        borderBottomColor: '#F0F1F6',
                    }}
                >
                    <Text
                        style={{
                            fontFamily: FONTS.MulishBold,
                            fontSize: scale(18),
                            color: '#1F1F1F',
                        }}
                    >
                        {data?.title}
                    </Text>
                    {data?.mentor_id && (
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginTop: scale(16),
                            }}
                        >
                            <Avatar userId={data?.mentor_id} />
                            <View style={{ marginLeft: scale(8) }}>
                                <Text
                                    style={{
                                        fontFamily: FONTS.MulishBold,
                                        fontSize: scale(16),
                                        color: '#1F1F1F',
                                    }}
                                >
                                    {teacherName}
                                </Text>
                                <View
                                    style={{
                                        paddingVertical: scale(3.5),
                                        paddingHorizontal: scale(8),
                                        borderRadius: scale(5),
                                        backgroundColor: '#FFF1DB',
                                        marginTop: scale(6),
                                        alignSelf: 'flex-start',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}
                                >
                                    <SvgXml
                                        xml={svgOrangeStar}
                                        width={scale(15)}
                                        height={scale(15)}
                                    />
                                    <Text
                                        style={{
                                            fontFamily: FONTS.Mulish,
                                            fontSize: scale(16),
                                            color: '#FF9A02',
                                            marginLeft: scale(4),
                                        }}
                                    >
                                        4.5
                                    </Text>
                                </View>
                            </View>
                        </View>
                    )}
                    <Text
                        style={{
                            marginTop: scale(16),
                            fontSize: scale(16),
                            fontFamily: FONTS.Mulish,
                            color: '#1F1F1F',
                        }}
                    >
                        {data?.s_des}
                    </Text>
                    <View style={{ marginTop: scale(16) }}>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            <SvgXml
                                xml={svgNote}
                                width={scale(24)}
                                height={scale(24)}
                            />
                            <Text
                                style={{
                                    marginLeft: scale(9),
                                    fontFamily: FONTS.Mulish,
                                    fontSize: scale(16),
                                    color: '#1F1F1F',
                                }}
                            >
                                Khóa học gồm{' '}
                                <Text style={{ fontFamily: FONTS.MulishBold }}>
                                    {data?.total_lectures || 0} bài giảng
                                </Text>
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginTop: scale(8),
                            }}
                        >
                            <SvgXml
                                xml={svgCertificate}
                                width={scale(24)}
                                height={scale(24)}
                            />
                            <Text
                                style={{
                                    marginLeft: scale(9),
                                    fontFamily: FONTS.Mulish,
                                    fontSize: scale(16),
                                    color: '#1F1F1F',
                                }}
                            >
                                Cấp{' '}
                                <Text style={{ fontFamily: FONTS.MulishBold }}>
                                    chứng chỉ hoàn thành
                                </Text>
                            </Text>
                        </View>
                        {data?.is_offline ? (
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginTop: scale(8),
                                }}
                            >
                                <SvgXml
                                    xml={svgOnline}
                                    width={scale(24)}
                                    height={scale(24)}
                                />
                                <Text
                                    style={{
                                        marginLeft: scale(9),
                                        fontFamily: FONTS.Mulish,
                                        fontSize: scale(16),
                                        color: '#1F1F1F',
                                    }}
                                >
                                    Có lớp học offline
                                </Text>
                            </View>
                        ) : null}
                    </View>
                </View>
                <TabView
                    navigationState={{ index: tabIndex, routes }}
                    renderScene={renderScene}
                    renderTabBar={(props) => (
                        <TabBar
                            {...props}
                            renderLabel={({ route, focused, color }) => (
                                <Text
                                    style={[
                                        {
                                            fontFamily: FONTS.MulishBold,
                                            fontSize: scale(15),
                                            color: '#1F1F1F',
                                            textAlign: 'center',
                                        },
                                        focused && { color: '#0E564D' },
                                    ]}
                                >
                                    {route.title}
                                </Text>
                            )}
                            style={{ backgroundColor: '#fff' }}
                            indicatorStyle={{
                                backgroundColor: '#0E564D',
                                borderTopLeftRadius: scale(2),
                                borderTopRightRadius: scale(2),
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
                            scale(100),
                    }}
                />
            </ScrollView>
            <SafeAreaView
                onLayout={(e) =>
                    setViewHeight({
                        ...viewHeight,
                        footer: e.nativeEvent.layout.height,
                    })
                }
                edges={['bottom']}
                style={[
                    {
                        position: 'absolute',
                        bottom: 0,
                        width: '100%',
                        paddingVertical: 5,
                        paddingHorizontal: scale(16),
                    },
                    STYLES.boxShadow,
                ]}
            >
                {data?.new_price || data?.old_price ? (
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        {data?.new_price && data?.old_price ? (
                            <View
                                style={{
                                    paddingVertical: scale(5),
                                    paddingHorizontal: scale(10),
                                    borderRadius: scale(5),
                                    borderWidth: 1,
                                    borderColor: '#FC0000',
                                }}
                            >
                                <Text
                                    style={{
                                        fontFamily: FONTS.MulishSemiBold,
                                        fontSize: scale(14),
                                        color: '#FF0000',
                                    }}
                                >
                                    giảm{' '}
                                    {((data?.old_price - data?.new_price) /
                                        data?.old_price) *
                                        100}
                                    %
                                </Text>
                            </View>
                        ) : null}
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            <Text
                                style={{
                                    fontFamily: FONTS.Mulish,
                                    fontSize: scale(16),
                                    color: '#656565',
                                    textDecorationLine: 'line-through',
                                }}
                            >
                                {data?.old_price && data?.new_price
                                    ? toCurrency(data?.old_price)
                                    : null}
                            </Text>
                            <Text
                                style={{
                                    marginLeft: scale(24),
                                    fontFamily: FONTS.MulishBold,
                                    fontSize: scale(18),
                                    color: '#095F2B',
                                }}
                            >
                                {data?.old_price && data?.new_price
                                    ? toCurrency(data?.new_price)
                                    : data?.old_price && !data?.new_price
                                    ? toCurrency(data?.old_price)
                                    : null}
                                đ
                            </Text>
                        </View>
                    </View>
                ) : null}
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                        {data && (
                            <Pressable
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginRight: scale(30),
                                }}
                                onPress={
                                    isLiked ? removeToWishList : addToWishList
                                }
                            >
                                <Heart
                                    stroke="#52B553"
                                    fill={isLiked ? '#52B553' : '#fff'}
                                    width={24}
                                    height={24}
                                />
                                <Text
                                    style={{
                                        fontFamily: FONTS.MulishSemiBold,
                                        fontSize: scale(14),
                                        color: '#52B553',
                                        marginTop: scale(4),
                                    }}
                                >
                                    {isLiked ? 'Đã thích' : 'Yêu thích'}
                                </Text>
                            </Pressable>
                        )}
                        <Pressable
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginRight: scale(30),
                            }}
                            onPress={onShare}
                        >
                            <Share2 stroke="#52B553" width={24} height={24} />
                            <Text
                                style={{
                                    fontFamily: FONTS.MulishSemiBold,
                                    fontSize: scale(14),
                                    color: '#52B553',
                                    marginTop: scale(4),
                                }}
                            >
                                Chia sẻ
                            </Text>
                        </Pressable>
                    </View>
                    {data && (
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            <Button
                                size="xs"
                                style={{
                                    backgroundColor: '#52B553',
                                    borderRadius: 8,
                                }}
                                isDisabled={!data?.relational && inCart}
                                onPress={() => {
                                    if (data?.relational) {
                                        gotoCourse()
                                    } else {
                                        addToCart()
                                    }
                                }}
                                isLoading={loadingVerify}
                                leftIcon={
                                    data?.relational ? (
                                        <BookOpen stroke="#fff" size={12} />
                                    ) : (
                                        <ShoppingCart stroke="#fff" size={12} />
                                    )
                                }
                            >
                                {data?.relational ? 'Học ngay' : 'Mua ngay'}
                            </Button>
                        </View>
                    )}
                </View>
            </SafeAreaView>
        </View>
    )
}

export default CourseInfo
