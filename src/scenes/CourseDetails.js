import axios from 'app/Axios'
import { Avatar, CourseDetailSkeleton, showToast } from 'app/atoms'
import { API_URL, APP_URL, COURSE_IMG_PATH, STYLES } from 'app/constants'
import BenefitTab from 'app/containers/BenefitTab'
import CommentTab from 'app/containers/CommentTab'
import LectureTab from 'app/containers/LectureTab'
import TeacherTab from 'app/containers/TeacherTab'
import { scale } from 'app/helpers/responsive'
import { svgCertificate, svgNote, svgOnline, svgOrangeStar } from 'assets/svg'
import React, { useEffect, useState } from 'react'

import {
    Linking,
    Platform,
    Pressable,
    ScrollView,
    Share,
    View
} from 'react-native'
import { BookOpen, Heart, Share2 } from 'react-native-feather'
import {
    endConnection,
    flushFailedPurchasesCachedAsPendingAndroid,
    getProducts,
    initConnection,
    purchaseErrorListener,
    purchaseUpdatedListener,
    requestPurchase,
    useIAP,
    validateReceiptIos
} from 'react-native-iap'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SvgXml } from 'react-native-svg'
import { TabBar, TabView } from 'react-native-tab-view'
import Video from 'react-native-video'

import { Button, Image, Text, VStack, useToast } from 'native-base'

const routes = [
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

const IAP_errors = {
    21000: 'The request to the App Store was not made using the HTTP POST request method.',
    21001: 'This status code is no longer sent by the App Store.',
    21002: 'The data in the receipt-data property was malformed or the service experienced a temporary issue. Try again.',
    21003: 'The receipt could not be authenticated.',
    21004: 'The shared secret you provided does not match the shared secret on file for your account.',
    21005: 'The receipt server was temporarily unable to provide the receipt. Try again.',
    21006: `This receipt is valid but the subscription has expired. When this status code is returned to your server, the receipt data is also decoded and returned as part of the response. Only returned for iOS 6-style transaction receipts for auto-renewable subscriptions.`,
    21007: 'This receipt is from the test environment, but it was sent to the production environment for verification.',
    21008: 'This receipt is from the production environment, but it was sent to the test environment for verification.',
    21009: 'Internal data access error. Try again later.',
    21010: 'The user account cannot be found or has been deleted.'
}

const CourseInfo = ({ navigation, route }) => {
    const { id } = route.params
    const toast = useToast()
    const [data, setData] = useState()
    const [loading, setLoading] = useState(false)
    const [loadingVerify, setLoadingVerify] = useState(false)
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
    const [course, setCourse] = useState([])
    const course_id_ipa = Platform.OS === 'ios' ? `course_id_101` : ''
    const [allowLearning, setAllowLearning] = useState(false)

    useEffect(() => {
        let purchaseUpdateSubscription
        let purchaseErrorSubscription

        const initializeIAP = async () => {
            try {
                await initConnection()
                await flushFailedPurchasesCachedAsPendingAndroid()
            } catch (error) {
                // Handle initialization error
                console.log('Error initializing IAP:', error)
            }
        }

        const fetchProducts = async () => {
            try {
                const products = await getProducts({
                    skus: [course_id_ipa]
                })
                console.log('Available products:', products)
            } catch (error) {
                console.log('Error fetching products:', error)
            }
        }

        const handlePurchaseUpdate = async purchase => {
            console.log('purchaseUpdatedListener', purchase)
        }

        const handlePurchaseError = error => {
            console.warn('purchaseErrorListener', error)
        }

        Promise.all([initializeIAP(), fetchProducts()])
            .then(() => {
                purchaseUpdateSubscription =
                    purchaseUpdatedListener(handlePurchaseUpdate)
                purchaseErrorSubscription =
                    purchaseErrorListener(handlePurchaseError)
            })
            .catch(error => {
                // Handle initialization error
                console.log('Error initializing IAP:', error)
            })

        return () => {
            if (purchaseUpdateSubscription) {
                purchaseUpdateSubscription.remove()
            }

            if (purchaseErrorSubscription) {
                purchaseErrorSubscription.remove()
            }
            endConnection()
        }
    }, [])

    const handlePurchase = async productionId => {
        try {
            const purchase = await requestPurchase({
                sku: course_id_ipa,
                andDangerouslyFinishTransactionAutomaticallyIOS: false
            })

            if (purchase && purchase.transactionReceipt) {
                const result = await validateReceipt(
                    purchase.transactionReceipt
                )

                if (result.status === 0) {
                    // call api to mark allow learning
                    setAllowLearning(true)
                } else {
                    console.error(
                        `*********** IAP_errors ***********`,
                        IAP_errors[result.status]
                    )
                }
            }
        } catch (error) {
            console.log('Error purchasing item:', error)
        }
    }

    const validateReceipt = async receipt => {
        const receiptBody = {
            'receipt-data': receipt,
            password: '3e21c5d0ef9e48868ca2b9a0dde0f618'
        }

        try {
            const result = await validateReceiptIos(receiptBody, null)
            return result // Return the result if needed
        } catch (error) {
            console.error('Receipt validation failed:', error)
            throw error // Throw the error to handle it in the calling code
        }
    }

    useEffect(() => {
        if (data) {
            setIsLiked(data?.isLiked)
        }
    }, [])

    useEffect(() => {
        if (id) {
            setLoading(true)
            axios
                .get(`auth-get-course-info/${id}`)
                .then(res => {
                    if (res.data && res?.data?.status === 200) {
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
                        <VStack space={4}>
                            <BenefitTab courseId={data?.id} />
                            <Text
                                style={{
                                    marginTop: scale(8),
                                    lineHeight: scale(20),
                                    fontSize: scale(16),
                                    color: '#52B553',
                                    marginLeft: 16
                                }}>
                                Mô tả chi tiết
                            </Text>
                            <Text
                                style={{
                                    fontSize: scale(16),
                                    paddingHorizontal: 15,
                                    paddingTop: scale(2),
                                    lineHeight: scale(20)
                                }}>
                                {data?.l_des?.replace(/<[^>]*>?/gm, '')}
                            </Text>
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
                        <LectureTab
                            courseId={data?.id}
                            totalLectures={data?.total_lectures}
                        />
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
                        <TeacherTab
                            mentorId={data?.mentor_id}
                            setTeacherName={setTeacherName}
                        />
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
                    toast.show({
                        title: 'Đã thêm khóa học vào danh sách yêu thích',
                        status: 'success',
                        placement: 'top'
                    })
                    setIsLiked(true)
                }
            })
            .catch(err => console.error(err))
    }

    const removeToWishList = () => {
        axios.get('courses/remove-from-wishlist/' + data?.id).then(res => {
            if (res.data.status === 200) {
                toast.show({
                    title: 'Đã xóa khóa học khỏi danh sách yêu thích',
                    status: 'success',
                    placement: 'top'
                })
                setIsLiked(false)
            }
        })
    }

    const gotoCourse = () => {
        setLoadingVerify(true)
        axios
            .get('courses/verify/' + data?.slug)
            .then(res => {
                if (res?.data?.status === 200) {
                    if (res?.data?.survey) {
                        showToast({
                            title: 'Bạn chưa hoàn thành khảo sát trước khóa học, vui lòng thực hiện khảo sát để tiếp tục khóa học'
                        })

                        navigation.navigate(ROUTES.Survey, {
                            surveyId: res?.data?.survey
                        })
                    } else {
                        navigation.navigate(ROUTES.CourseDetail, {
                            courseId: data?.relational?.course_id,
                            currentLecture:
                                data?.relational?.current_lecture ||
                                data?.first_lecture_id
                        })
                    }
                }
            })
            .finally(() => setLoadingVerify(false))
    }

    return (
        <View style={{ flex: 1 }}>
            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={false}>
                {data?.video_path ? (
                    <Video
                        paused
                        controls
                        source={{
                            uri: `${API_URL}public/${data?.video_path}`
                        }} // Can be a URL or a local file.
                        style={{ height: 200, width: '100%' }}
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
                        style={{
                            fontSize: scale(16),
                            fontWeight: 'bold',
                            color: '#1F1F1F',
                            paddingTop: scale(5)
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
                                    style={{
                                        fontSize: scale(16),
                                        color: '#1F1F1F',
                                        paddingTop: scale(2)
                                    }}>
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
                                        alignItems: 'center'
                                    }}>
                                    <SvgXml
                                        xml={svgOrangeStar}
                                        width={scale(15)}
                                        height={scale(15)}
                                    />
                                    <Text
                                        style={{
                                            fontSize: scale(16),
                                            color: '#FF9A02',
                                            marginLeft: scale(4)
                                        }}>
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
                            paddingTop: scale(5),
                            color: '#1F1F1F',
                            lineHeight: scale(20)
                        }}>
                        {data?.s_des}
                    </Text>
                    <View style={{ marginTop: scale(16) }}>
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
                                    paddingTop: scale(2),
                                    fontSize: scale(16),
                                    color: '#1F1F1F'
                                }}>
                                Khóa học gồm{' '}
                                <Text>
                                    {data?.total_lectures || 0} bài giảng
                                </Text>
                            </Text>
                        </View>
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
                                    paddingTop: scale(2),
                                    fontSize: scale(16),
                                    color: '#1F1F1F'
                                }}>
                                Cấp <Text>chứng chỉ hoàn thành</Text>
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
                                        paddingTop: scale(2),
                                        fontSize: scale(16),
                                        color: '#1F1F1F'
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
                        justifyContent: 'space-between'
                    }}>
                    <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {data && (
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
                        )}
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

                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                        <Button
                            isDisabled={!data?.relational}
                            pt={2}
                            pb={2}
                            pr={5}
                            pl={5}
                            style={{
                                backgroundColor: '#52B553',
                                borderRadius: 8
                            }}
                            onPress={
                                !data?.old_price ? handlePurchase : gotoCourse
                            }
                            isLoading={loadingVerify}
                            isLoadingText="Đang vào"
                            leftIcon={
                                <>
                                    <BookOpen stroke="#fff" size={10} />
                                </>
                            }>
                            {!data?.old_price ? 'Mua ngay' : 'Học ngay'}
                        </Button>
                    </View>
                </View>
            </SafeAreaView>
        </View>
    )
}

export default CourseInfo
