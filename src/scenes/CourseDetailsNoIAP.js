import Axios from 'app/Axios'
import { getGlobalState, useGlobalState } from 'app/Store'
import {
    Avatar,
    CourseDetailSkeleton,
    NoData,
    Rate,
    showToast
} from 'app/atoms'
import { API_URL, APP_URL, COURSE_IMG_PATH, STYLES } from 'app/constants'
import BenefitTab from 'app/containers/BenefitTab'
import ComboTab from 'app/containers/ComboTab'
import ComboTeacherTab from 'app/containers/ComboTeacherTab'
import CommentTab from 'app/containers/CommentTab'
import LectureTab from 'app/containers/LectureTab'
import TeacherTab from 'app/containers/TeacherTab'
import { scale } from 'app/helpers/responsive'
import { getData, storeData, toCurrency } from 'app/helpers/utils'
import { svgCertificate, svgNote, svgOnline, svgOrangeStar } from 'assets/svg'
import React, { useEffect, useState } from 'react'

import { Dimensions, Linking, Share } from 'react-native'
import { BookOpen, Heart, Share2, ShoppingCart } from 'react-native-feather'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SvgXml } from 'react-native-svg'
import { TabBar, TabView } from 'react-native-tab-view'
import { WebView } from 'react-native-webview'

import {
    Button,
    Image,
    Pressable,
    ScrollView,
    Text,
    VStack,
    View
} from 'native-base'

const w = Dimensions.get('window').width
const h = Dimensions.get('window').height

const CourseInfo = ({ navigation, route }) => {
    const { id } = route.params
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
    const [carts, setCarts] = useGlobalState('carts')
    const [isTrial, setIsTrial] = useGlobalState('isTrial')
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
        if (id) {
            setLoading(true)
            Axios.get(
                `${
                    userInfo?.id === 'trial'
                        ? 'get-course-info'
                        : 'auth-get-course-info'
                }/${id}`
            )
                .then(res => {
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
                    console.log('auth-get-course-info', data.data)
                })
                .catch(err => console.error(err))
                .finally(() => setLoading(false))
        }
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
                                longDes={data?.l_des.split('</p>')}
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
        Axios.get('courses/add-wishlist/' + data?.id)
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
        Axios.get('courses/remove-from-wishlist/' + data?.id).then(res => {
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
        setInCart(true)
        const carts = (await getData('@cart')) || []
        const course = {
            id: data?.id,
            title: data?.title,
            new_price: data?.new_price,
            old_price: data?.old_price
        }

        const newCarts = Array.isArray(carts) ? [course, ...carts] : [course]
        storeData('@cart', newCarts)
        setCarts(newCarts)
        showToast({
            title: 'Đã thêm khóa học vào giỏ hàng',
            status: 'success'
        })
    }

    const gotoCourse = () => {
        setLoadingVerify(true)
        Axios.get('courses/verify/' + data?.slug)
            .then(res => {
                if (res.data.status === 200) {
                    if (res?.data?.survey) {
                        showToast({
                            title: 'Thông báo từ hệ thống',
                            description:
                                'Bạn chưa hoàn thành khảo sát trước khóa học, vui lòng thực hiện khảo sát để tiếp tục khóa học',
                            status: 'success'
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
                                data?.first_lecture_id
                        })
                    }
                } else {
                    console.log('Error')
                }
            })
            .finally(() => setLoadingVerify(false))
    }

    const renderButton = () => {
        //Đã mua và không phải khóa combo
        if (data?.relational && !data?.is_combo) {
            return (
                <Button
                    size="sm"
                    style={{
                        backgroundColor: '#52B553',
                        borderRadius: 8
                    }}
                    onPress={gotoCourse}
                    isLoading={loadingVerify}
                    leftIcon={<BookOpen stroke="#fff" size={12} />}>
                    Học ngay
                </Button>
            )
        }

        if (!data?.relational && inCart) {
            return (
                <Button
                    size="sm"
                    style={{
                        backgroundColor: '#52B553',
                        borderRadius: 8
                    }}
                    onPress={() => navigation.navigate(ROUTES.Carts)}
                    isLoading={loadingVerify}
                    leftIcon={<ShoppingCart stroke="#fff" size={12} />}>
                    Đến giỏ hàng
                </Button>
            )
        }

        if (data?.relational && data?.is_combo) {
            return (
                <Button
                    size="md"
                    style={{
                        backgroundColor: '#52B553',
                        borderRadius: 8
                    }}
                    onPress={() =>
                        showToast({
                            title: 'Đây là khóa học tổng hợp, vui lòng truy cập vào khóa học con để bắt đầu học',
                            status: 'error'
                        })
                    }
                    isLoading={loadingVerify}>
                    Học ngay
                </Button>
            )
        }

        return (
            <Button
                size="sm"
                style={{
                    backgroundColor: '#52B553',
                    borderRadius: 8
                }}
                onPress={addToCart}
                isLoading={loadingVerify}
                leftIcon={<ShoppingCart stroke="#fff" size={12} />}>
                Mua ngay
            </Button>
        )
    }
    return (
        <View style={{ flex: 1 }}>
            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={false}>
                {data?.video_path ? (
                    <WebView
                        originWhitelist={['*']}
                        source={{
                            uri: `${API_URL}public/${data?.video_path}`
                        }}
                        style={{ height: 200, width: Math.min(w, h) }}
                    />
                ) : (
                    <Image
                        resizeMode="contain"
                        source={{
                            uri: `${COURSE_IMG_PATH}${data?.id}.webp`
                        }}
                        style={{
                            width: '100%',
                            height: scale(200),
                            borderTopLeftRadius: scale(10),
                            borderTopRightRadius: scale(10)
                        }}
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
                    <View style={{ marginTop: scale(16) }}>
                        {!data?.is_combo && (
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}>
                                <SvgXml
                                    xml={svgNote}
                                    width={scale(24)}
                                    height={scale(24)}
                                />
                                <Text
                                    style={{
                                        marginLeft: scale(9),

                                        fontSize: scale(16),
                                        color: '#6C746E'
                                    }}>
                                    Khóa học gồm{' '}
                                    <Text>
                                        {data?.total_lectures || 0} bài giảng
                                    </Text>
                                </Text>
                            </View>
                        )}
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginTop: scale(8)
                            }}>
                            <SvgXml
                                xml={svgCertificate}
                                width={scale(24)}
                                height={scale(24)}
                            />
                            <Text
                                style={{
                                    marginLeft: scale(9),

                                    fontSize: scale(16),
                                    color: '#6C746E'
                                }}>
                                Cấp <Text>chứng chỉ quốc tế CSUDH</Text>
                            </Text>
                        </View>
                        {data?.is_offline ? (
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginTop: scale(8)
                                }}>
                                <SvgXml
                                    xml={svgOnline}
                                    width={scale(24)}
                                    height={scale(24)}
                                />
                                <Text
                                    style={{
                                        marginLeft: scale(9),

                                        fontSize: scale(16),
                                        color: '#6C746E'
                                    }}>
                                    Có lớp học offline
                                </Text>
                            </View>
                        ) : null}
                    </View>
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
                {data?.new_price || data?.old_price ? (
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingVertical: 5
                        }}>
                        {data?.new_price && data?.old_price ? (
                            <View
                                style={{
                                    paddingVertical: scale(5),
                                    paddingHorizontal: scale(10),
                                    borderRadius: scale(5),
                                    borderWidth: 1,
                                    borderColor: '#FC0000'
                                }}>
                                <Text
                                    bold
                                    style={{
                                        fontSize: scale(14),
                                        color: '#FF0000'
                                    }}>
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
                                display: 'flex',
                                flexDirection: 'row'
                            }}>
                            <Text
                                bold
                                style={{
                                    fontSize: scale(16),
                                    color: '#656565',
                                    textDecorationLine: 'line-through'
                                }}>
                                {data?.old_price && data?.new_price
                                    ? toCurrency(data?.old_price)
                                    : 1212}
                            </Text>
                            <Text
                                bold
                                style={{
                                    marginLeft: scale(24),
                                    fontSize: scale(18),
                                    color: '#095F2B'
                                }}>
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
                {isTrial && userInfo?.id === 'trial' && !data?.is_combo ? (
                    <Button
                        size="sm"
                        style={{
                            width: 100
                        }}
                        leftIcon={<BookOpen stroke="#fff" size={12} />}
                        onPress={() =>
                            navigation.navigate(ROUTES.CourseDetailTrial, {
                                courseId: data?.id,
                                currentLecture: data?.first_lecture_id
                            })
                        }
                        isLoading={loadingVerify}>
                        Học thử
                    </Button>
                ) : null}
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between'
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
                    </View>
                    {data && (
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                            {renderButton()}
                        </View>
                    )}
                </View>
            </SafeAreaView>
        </View>
    )
}

export default CourseInfo
