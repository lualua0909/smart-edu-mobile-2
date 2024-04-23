import { useQuery } from '@apollo/client'
import axios from 'app/Axios'
import { setGlobalState, useGlobalState } from 'app/Store'
import {
    AbsoluteSpinner,
    Avatar,
    CourseDetailSkeleton,
    Rate,
    Text,
    VideoViewer,
    showToast
} from 'app/atoms'
import { APP_URL, COURSE_IMG_PATH, ROUTES } from 'app/constants'
import BenefitTab from 'app/containers/BenefitTab'
import ComboTab from 'app/containers/ComboTab'
import CommentTab from 'app/containers/CommentTab'
import LectureTab from 'app/containers/LectureTab'
import TeacherTab from 'app/containers/TeacherTab'
import { scale } from 'app/helpers/responsive'
import { useIapPayment } from 'app/helpers/useIapPayment'
import {
    clearDataAfterLogout,
    isAndroid,
    isIOS,
    storeData,
    toCurrency
} from 'app/helpers/utils'
import { ROADMAP_LIST } from 'app/qqlStore/queries'
import { svgCertificate, svgNote, svgOnline } from 'assets/svg'
import React, { useEffect, useState } from 'react'

import { Image, Pressable, ScrollView, Share, View } from 'react-native'
import { DollarSign, Heart, Navigation, Share2 } from 'react-native-feather'
import { SvgXml } from 'react-native-svg'
import { TabBar, TabView } from 'react-native-tab-view'

const CourseInfo = ({ navigation, route }) => {
    const { id } = route.params
    const { data: dataRoadmap } = useQuery(ROADMAP_LIST, {
        variables: { course_id: 162 }
    })
    const [inCart, setInCart] = useState(false)
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
    const { handlePurchase } = isIOS
        ? useIapPayment({
              course_id_ipa,
              setLoadingSpinner
          })
        : {}

    useEffect(() => {
        if (data) {
            setIsLiked(data?.isLiked)
        }
    }, [])

    const addToCart = () => {
        console.log('add to cart')
        if (userInfo?.id === 'trial') {
            setGlobalState('visibleNotLogin', true)
        } else {
            setInCart(true)
            const course = {
                id: data?.id,
                title: data?.title,
                new_price: data?.new_price,
                old_price: data?.old_price
            }
            const newCarts = [course]
            storeData('@cart', newCarts)
            setGlobalState('carts', newCarts)
            showToast({
                title: 'Đã thêm khóa học vào giỏ hàng',
                status: 'success'
            })

            navigation.navigate(ROUTES.Carts)
        }
    }

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

                        navigation.goBack()
                    }
                })
                .then(data => {
                    setData(data?.data)
                })
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

    const onShare = () => {
        Share.share({
            message: `${APP_URL}course-details/${data?.slug}`
        })
    }

    const addToWishList = () => {
        axios.get('courses/add-wishlist/' + data?.id).then(res => {
            if (res.data.status === 200) {
                showToast({
                    title: 'Đã thêm khóa học vào danh sách yêu thích',
                    status: 'success',
                    placement: 'top'
                })
                setIsLiked(true)
            }
        })
    }

    const removeToWishList = () => {
        axios.get('courses/remove-from-wishlist/' + data?.id).then(res => {
            if (res.data.status === 200) {
                showToast({
                    title: 'Đã xóa khóa học khỏi danh sách yêu thích',
                    status: 'error',
                    placement: 'top'
                })
                setIsLiked(false)
            }
        })
    }
    const handleToLearningPath = () => {
        const adjust =
            dataRoadmap?.Roadmaps.data[0].sub_course.order_number2 &&
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
                            {isIOS ? toCurrency(data?.ios_price) + 'đ' : null}
                            {isAndroid
                                ? data?.old_price && data?.new_price
                                    ? toCurrency(data?.new_price) + 'đ'
                                    : toCurrency(data?.old_price) + 'đ'
                                : null}
                        </Text>
                    </View>
                    {dataDetail.map((item, index) => (
                        <View
                            key={index}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'flex-start',
                                marginVertical: 3
                            }}>
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
                        {isIOS ? toCurrency(data?.ios_price) + 'đ' : null}
                        {isAndroid
                            ? data?.old_price && data?.new_price
                                ? toCurrency(data?.new_price) + 'đ'
                                : toCurrency(data?.old_price) + 'đ'
                            : null}
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
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: 5
                }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
                                    title: 'Đây là khóa học tổng hợp',
                                    description:
                                        'Vui lòng truy cập vào khóa học con để bắt đầu học'
                                })
                            } else {
                                navigation.navigate(ROUTES.CourseDetailTrial, {
                                    isTrial: true,
                                    courseId: data?.id,
                                    currentLecture: data?.first_lecture_id
                                })
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
                            <Pressable
                                style={{
                                    width: 200,
                                    paddingVertical: 10,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: '#52B553'
                                }}
                                onPress={clearDataAfterLogout}>
                                <Text
                                    style={{
                                        fontSize: scale(14),
                                        color: '#fff',
                                        marginTop: scale(4)
                                    }}>
                                    Đến trang đăng nhập
                                </Text>
                            </Pressable>
                        ) : (
                            <>
                                {(!data?.relational &&
                                    isIOS &&
                                    data?.ios_price) ||
                                (!isIOS && data?.old_price) ? (
                                    <Pressable
                                        style={{
                                            width: 150,
                                            paddingVertical: 10,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            backgroundColor: '#52B553'
                                        }}
                                        onPress={
                                            isIOS ? handlePurchase : addToCart
                                        }>
                                        <Text
                                            style={{
                                                fontSize: scale(14),
                                                color: '#fff',
                                                marginTop: scale(4)
                                            }}>
                                            Mua ngay
                                        </Text>
                                    </Pressable>
                                ) : null}
                                {!!data?.relational &&
                                data?.is_roadmap === 1 ? (
                                    <Pressable
                                        style={{
                                            width: 150,
                                            paddingVertical: 10,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            backgroundColor: '#52B553'
                                        }}
                                        onPress={handleToLearningPath}>
                                        <Text
                                            style={{
                                                fontSize: scale(14),
                                                color: '#fff',
                                                marginTop: scale(4)
                                            }}>
                                            {dataRoadmap?.Roadmaps.data[0]
                                                .sub_course.order_number2 !== 0
                                                ? 'Học ngay'
                                                : data?.roadmap_test_result > 0
                                                ? 'Xem kết quả'
                                                : 'Làm bài test'}
                                        </Text>
                                    </Pressable>
                                ) : null}

                                {!!data?.relational &&
                                !data?.is_combo &&
                                !data?.is_roadmap ? (
                                    <Pressable
                                        style={{
                                            width: 150,
                                            paddingVertical: 10,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            backgroundColor: '#52B553'
                                        }}
                                        onPress={gotoCourse}>
                                        <Text
                                            style={{
                                                fontSize: scale(14),
                                                color: '#fff',
                                                marginTop: scale(4)
                                            }}>
                                            Học ngay
                                        </Text>
                                    </Pressable>
                                ) : null}
                            </>
                        )}
                    </View>
                )}
            </View>
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
