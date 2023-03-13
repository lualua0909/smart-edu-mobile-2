import axios from 'app/Axios'
import { Avatar, CourseDetailSkeleton } from 'app/atoms'
import { API_URL, APP_URL, COURSE_IMG_PATH, STYLES } from 'app/constants'
import BenefitTab from 'app/containers/BenefitTab'
import CommentTab from 'app/containers/CommentTab'
import LectureTab from 'app/containers/LectureTab'
import TeacherTab from 'app/containers/TeacherTab'
import { scale } from 'app/helpers/responsive'
import { svgCertificate, svgNote, svgOnline, svgOrangeStar } from 'assets/svg'
import React, { useEffect, useState } from 'react'

import { Linking, Pressable, ScrollView, Share, View } from 'react-native'
import { BookOpen, Heart, Share2 } from 'react-native-feather'
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
                        toast.show({
                            title: 'Khóa học không tồn tại hoặc bị ẩn, vui lòng liên hệ quản trị viên',
                            status: 'error',
                            placement: 'top'
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

                                    fontSize: scale(16),
                                    color: '#52B553',
                                    marginLeft: 16
                                }}>
                                Mô tả chi tiết
                            </Text>
                            <Text
                                style={{
                                    fontSize: scale(16),
                                    paddingHorizontal: 15
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
                        toast.show({
                            title: 'Thông báo từ hệ thống',
                            description:
                                'Bạn chưa hoàn thành khảo sát trước khóa học, vui lòng thực hiện khảo sát để tiếp tục khóa học',
                            status: 'success',
                            placement: 'top'
                        })
                        navigation.navigate(ROUTES.Survey, {
                            surveyId: res?.data?.survey
                        })
                        // setTimeout(() => {
                        //     Linking.openURL(
                        //         `${APP_URL}take-survey/${res?.data?.survey}`
                        //     )
                        // }, 500)
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
                            color: '#1F1F1F'
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
                                        color: '#1F1F1F'
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

                            color: '#1F1F1F'
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
                {/* {data?.new_price || data?.old_price ? (
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between'
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
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                            <Text
                                style={{
                                    fontSize: scale(16),
                                    color: '#656565',
                                    textDecorationLine: 'line-through'
                                }}>
                                {data?.old_price && data?.new_price
                                    ? toCurrency(data?.old_price)
                                    : null}
                            </Text>
                            <Text
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
                ) : null} */}
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
                    {data && (
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                            <Button
                                size="md"
                                pt={2}
                                pb={2}
                                pr={5}
                                pl={5}
                                style={{
                                    backgroundColor: '#52B553',
                                    borderRadius: 8
                                }}
                                onPress={gotoCourse}
                                isLoading={loadingVerify}
                                isLoadingText="Đang vào"
                                leftIcon={<BookOpen stroke="#fff" size={10} />}>
                                Học ngay
                            </Button>
                        </View>
                    )}
                </View>
            </SafeAreaView>
        </View>
    )
}

export default CourseInfo
