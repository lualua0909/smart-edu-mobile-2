import { useQuery } from '@apollo/client'
import axios from 'app/Axios'
import { useGlobalState } from 'app/Store'
import {
    AbsoluteSpinner,
    Avatar,
    Button,
    CourseDetailSkeleton,
    Rate,
    Text,
    VideoViewer,
    showToast
} from 'app/atoms'
import { APP_URL, COURSE_IMG_PATH, STYLES } from 'app/constants'
import BenefitTab from 'app/containers/BenefitTab'
import ComboTab from 'app/containers/ComboTab'
import CommentTab from 'app/containers/CommentTab'
import LectureTab from 'app/containers/LectureTab'
import TeacherTab from 'app/containers/TeacherTab'
import { scale } from 'app/helpers/responsive'
import { clearDataAfterLogout, errorLog, toCurrency } from 'app/helpers/utils'
import { ROADMAP_LIST } from 'app/qqlStore/queries'
import { svgCertificate, svgNote, svgOnline } from 'assets/svg'
import React, { useEffect, useState } from 'react'

import {
    Alert,
    Image,
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
import {
    PurchaseError,
    currentPurchase,
    endConnection,
    finishTransaction,
    getProducts,
    initConnection,
    isIosStorekit2,
    purchaseErrorListener,
    purchaseUpdatedListener,
    requestPurchase
} from 'react-native-iap'
import { SvgXml } from 'react-native-svg'
import { TabBar, TabView } from 'react-native-tab-view'

const CourseInfo = ({ navigation, route }) => {
    const { id } = route.params
    const { data: dataRoadmap } = useQuery(ROADMAP_LIST, {
        variables: { course_id: 162 }
    })

    const [data, setData] = useState()
    const [loading, setLoading] = useState(false)
    const [loadingSpinner, setLoadingSpinner] = useState(false)
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
    const course_id_ipa = `course_id_${id}`
    const [currentId, setCurrentId] = useState()
    const [success, setSuccess] = useState(false)
    const [products, setProducts] = useState()
    const [userInfo, _setuserInfo] = useGlobalState('userInfo')
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
        let purchaseUpdateSubscription
        let purchaseErrorSubscription

        const initializeIAP = async () => {
            try {
                await initConnection()

                // if (isAndroid) {
                //     await flushFailedPurchasesCachedAsPendingAndroid()
                // } else {
                //     // await clearTransactionIOS()
                // }
            } catch (error) {
                if (error instanceof PurchaseError) {
                    errorLog({
                        message: `[${error.code}]: ${error.message}`,
                        error
                    })
                } else {
                    errorLog({ message: 'finishTransaction', error })
                }
            }
        }

        const fetchProducts = async () => {
            try {
                const products = await getProducts({
                    skus: [course_id_ipa]
                })
                setProducts(products)
            } catch (error) {
                console.log('Error fetching products:', error)
            }
        }

        const handlePurchaseUpdate = async purchase => {
            const receipt = purchase.transactionReceipt
                ? purchase.transactionReceipt
                : purchase.originalJson

            setLoadingSpinner(false)

            if (receipt) {
                try {
                    await markUserAsBought(purchase)
                    const acknowledgeResult = await finishTransaction({
                        purchase,
                        isConsumable: false
                    })

                    setLoadingSpinner(false)
                    console.info('acknowledgeResult', acknowledgeResult)
                } catch (error) {
                    errorLog({ message: 'finishTransaction', error })
                }
            }
        }

        const handlePurchaseError = error => {
            setLoadingSpinner(false)
            Alert.alert('Lỗi', 'Yêu cầu thanh toán thất bại', [
                {
                    text: 'Ok',
                    onPress: () => {},
                    style: 'default'
                }
            ])
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

    const handlePurchase = async () => {
        if (!products[0]?.productId) return
        setLoadingSpinner(true)
        try {
            const purchase = await requestPurchase({
                sku: products[0]?.productId
            })

            await markUserAsBought(purchase)
            setLoadingSpinner(false)
        } catch (error) {
            setLoadingSpinner(false)
            Alert.alert('Lỗi', 'Yêu cầu thanh toán thất bại', [
                {
                    text: 'Ok',
                    onPress: () => {},
                    style: 'default'
                }
            ])
            if (error instanceof PurchaseError) {
                errorLog({
                    message: `[${error.code}]: ${error.message}`,
                    error
                })
            } else {
                errorLog({ message: 'handleBuyProduct', error })
            }
        }
    }

    const markUserAsBought = async purchase => {
        await axios.post('payment/activate', {
            productId: purchase.productId,
            transactionDate: purchase.transactionDate,
            transactionId: purchase.transactionId,
            transactionReceipt: purchase.transactionReceipt,
            courseId: id
        })
    }

    const checkCurrentPurchase = async (
        currentPurchase,
        finishTransaction,
        setSuccess
    ) => {
        setLoadingSpinner(false)
        try {
            if (
                (isIosStorekit2() && currentPurchase?.transactionId) ||
                currentPurchase?.transactionReceipt
            ) {
                await finishTransaction({
                    purchase: currentPurchase,
                    isConsumable: false
                })

                setSuccess(true)

                // Call the API to mark the user as bought
                await markUserAsBought(currentPurchase)
            }
        } catch (error) {
            if (error instanceof PurchaseError) {
                errorLog({
                    message: `[${error.code}]: ${error.message}`,
                    error
                })
            } else {
                errorLog({ message: 'handleBuyProduct', error })
            }
        }
    }

    useEffect(() => {
        checkCurrentPurchase(currentPurchase, finishTransaction, setSuccess)
    }, [currentPurchase, finishTransaction, setSuccess])

    useEffect(() => {
        if (data) {
            setIsLiked(data?.isLiked)
        }
    }, [])

    useEffect(() => {
        if (id) {
            setLoading(true)
            axios
                .get(
                    `${
                        userInfo?.id !== 'trial' ? 'auth-' : ''
                    }get-course-info/${id}`
                )
                .then(res => {
                    if (res.data && res?.data?.status === 200) {
                        return res.data
                    } else {
                        showToast({
                            title: 'Khóa học không tồn tại hoặc bị ẩn, vui lòng liên hệ quản trị viên',
                            status: 'error'
                        })

                        console.log('res= ', res.data)
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
                        <BenefitTab
                            courseId={data?.id}
                            longDes={data?.l_des?.split('</p>')}
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
                        }>
                        {data?.is_combo ? (
                            <ComboTab data={data} />
                        ) : data?.is_roadmap ? null : (
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

    const addToWishList = () => {
        axios
            .get('courses/add-wishlist/' + data?.id)
            .then(res => {
                if (res.data.status === 200) {
                    showToast({
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
                showToast({
                    title: 'Đã xóa khóa học khỏi danh sách yêu thích',
                    status: 'success',
                    placement: 'top'
                })
                setIsLiked(false)
            }
        })
    }

    const handleToLearningPath = () => {
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
            navigation.navigate(ROUTES.EntranceTest)
        }
        setLoadingVerify(false)
    }

    const gotoCourse = async () => {
        setLoadingVerify(true)
        try {
            const res = await axios.get('courses/verify/' + data?.slug)

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
                        courseId: data?.id,
                        currentLecture:
                            data?.relational?.current_lecture ||
                            data?.first_lecture_id
                    })
                }
            }
        } catch (error) {
            console.log(`*********** error ***********`, error)
        }

        setLoadingVerify(false)
    }

    const renderDetailCourse = isRoadmap => {
        if (isRoadmap) {
            const dataDetail = [
                { title: 'Chương trình E-Learning kết hợp Workshop/Seminar.' },
                { title: 'Chứng chỉ Viện Quản trị và Tài chính (IFA).' },
                {
                    title: 'Cơ hội nhận Chứng chỉ ĐH California, Dominguez Hills, Hoa Kỳ.'
                },
                { title: 'Cơ hội nghề nghiệp và thăng tiến trong sự nghiệp.' },
                {
                    title: 'Cơ hội tham gia cuộc thi "Tôi của Tương lai" do IFA tổ chức.'
                },
                {
                    title: 'Tham gia cộng đồng "Hành trình sự nghiệp - Job Jorney"'
                }
            ]
            return (
                <View style={{ marginTop: scale(16) }}>
                    {dataDetail.map((item, index) => (
                        <View
                            key={index}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'flex-start',
                                marginVertical: 3
                            }}>
                            <Text>{index + 1}. </Text>
                            <Text
                                style={{
                                    marginLeft: scale(9),
                                    paddingTop: scale(2),
                                    fontSize: scale(16),
                                    color: '#6C746E'
                                }}>
                                {item.title}
                            </Text>
                        </View>
                    ))}
                </View>
            )
        }
        return (
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
                            color: '#6C746E'
                        }}>
                        Khóa học gồm{' '}
                        <Text>
                            {data?.is_combo
                                ? `${data?.combo?.length} khóa học con`
                                : `${data?.total_lectures} bài giảng`}
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
                                paddingTop: scale(2),
                                fontSize: scale(16),
                                color: '#6C746E'
                            }}>
                            Có lớp học offline
                        </Text>
                    </View>
                ) : null}
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: scale(8)
                    }}>
                    <DollarSign
                        width={scale(22)}
                        height={scale(22)}
                        stroke="#6C746E"
                    />
                    <Text
                        bold
                        style={{
                            marginLeft: scale(9),
                            paddingTop: scale(2),
                            fontSize: scale(16),
                            color: '#095F2B'
                        }}>
                        {toCurrency(data?.ios_price)}đ
                    </Text>
                </View>
            </View>
        )
    }

    if (loading) {
        return <CourseDetailSkeleton />
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
                            fontSize: scale(16),
                            color: '#6C746E',
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
                                    bold
                                    style={{
                                        fontSize: scale(18),
                                        color: '#6C746E',
                                        paddingTop: scale(2)
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
                            paddingTop: scale(5),
                            color: '#6C746E',
                            lineHeight: scale(20)
                        }}>
                        {data?.s_des}
                    </Text>
                    {renderDetailCourse(data?.isRoadmap)}
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
                                        title: 'Đây là khóa học tổng hợp, vui lòng truy cập vào khóa học con để bắt đầu học',
                                        status: 'warning'
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
                                    {!!data?.relational &&
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

                                    {!!data?.relational &&
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
            {loadingSpinner && (
                <AbsoluteSpinner
                    style={{
                        marginTop: 20
                    }}
                />
            )}
        </View>
    )
}

export default CourseInfo
