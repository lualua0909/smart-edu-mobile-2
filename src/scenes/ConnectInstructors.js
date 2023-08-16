import axios from 'app/Axios'
import { LoadingAnimation, NoDataAnimation } from 'app/atoms'
import PopupDelete from 'app/components/PopupDelete'
import PopupRate from 'app/components/PopupRate'
import PopupSurveyCall from 'app/components/PopupSurveyCall'
import COLORS from 'app/constants/colors'
import { scale } from 'app/helpers/responsive'
import { hashing } from 'app/helpers/utils'
import { svgWhiteBack } from 'assets/svg'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'

import Countdown from 'react-countdown'
import {
    FlatList,
    Linking,
    Pressable,
    RefreshControl,
    StatusBar,
    View
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SvgXml } from 'react-native-svg'
import { TabView } from 'react-native-tab-view'
import { ScrollView } from 'react-native-virtualized-view'

import { Box, HStack, Heading, Stack, Text } from 'native-base'

const types = new Map([
    ['booking-list-approved', 'Đã xác nhận'],
    ['booking-list-waiting', 'Chờ xác nhận'],
    ['booking-list-cancelled', 'Đã hủy']
])

const ConnectInstructors = ({ navigation, route }) => {
    const { initTab } = route.params
    const [tabIndex, setTabIndex] = useState(0)
    const [isShowModel, setIsShowModel] = useState(false)
    const [isSurveyCall, setisSurveyCall] = useState(false)
    const [isOpenPopupRate, setIsOpenPopupRate] = useState(false)

    useEffect(() => {
        if (initTab) {
            setTabIndex(initTab)
        }
    }, [initTab])

    const routes = [
        {
            key: 'tab-1',
            title: types.get('booking-list-approved')
        },
        {
            key: 'tab-2',
            title: types.get('booking-list-waiting')
        },
        {
            key: 'tab-3',
            title: types.get('booking-list-cancelled')
        }
    ]

    const renderScene = ({ route }) => {
        return route?.key === 'tab-1' ? (
            <ListData type="booking-list-approved" />
        ) : route?.key === 'tab-2' ? (
            <ListData type="booking-list-waiting" />
        ) : (
            <ListData type="booking-list-cancelled" />
        )
    }

    const onSubmitSurvey = () => {
        setisSurveyCall(!isSurveyCall)
        setIsOpenPopupRate(true)
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <StatusBar barStyle="light-content" />
            <View>
                <SafeAreaView
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: 16
                    }}
                    edges={['top']}>
                    <Pressable
                        hitSlop={15}
                        onPress={() => navigation.goBack()}
                        style={{ paddingHorizontal: scale(16) }}>
                        <SvgXml
                            xml={svgWhiteBack}
                            width={scale(16)}
                            height={scale(16)}
                            color="#4F4F4F"
                        />
                    </Pressable>
                    <Text
                        style={{
                            fontSize: scale(16),
                            color: '#4F4F4F',
                            lineHeight: scale(20)
                        }}>
                        Lịch kết nối
                    </Text>
                    <View></View>
                    {/* <Pressable
                        style={{ paddingHorizontal: scale(16) }}
                        onPress={() =>
                            navigation.navigate(ROUTES.ConnectInstructorHistory)
                        }
                    >
                        <SvgXml
                            xml={svgListOrder}
                            width={scale(24)}
                            height={scale(24)}
                            color="#4F4F4F"
                        />
                    </Pressable> */}
                </SafeAreaView>
            </View>
            <View
                style={{
                    paddingTop: scale(16),
                    paddingBottom: scale(10),
                    backgroundColor: '#fff'
                }}>
                <View
                    style={{
                        alignSelf: 'center',
                        flexDirection: 'row',
                        borderWidth: 1,
                        borderColor: COLORS.green,
                        padding: scale(2),
                        borderRadius: scale(5)
                    }}>
                    <Pressable
                        onPress={() => setTabIndex(0)}
                        style={[
                            {
                                paddingVertical: scale(6),
                                width: scale(125),
                                alignItems: 'center'
                            },
                            tabIndex == 0 && {
                                backgroundColor: COLORS.green,
                                borderRadius: scale(5)
                            }
                        ]}>
                        <Text
                            style={[
                                {
                                    lineHeight: scale(20),
                                    fontSize: scale(16),
                                    color: COLORS.green
                                },
                                tabIndex == 0 && { color: '#fff' }
                            ]}>
                            Đã xác nhận
                        </Text>
                    </Pressable>
                    <Pressable
                        onPress={() => setTabIndex(1)}
                        style={[
                            {
                                paddingVertical: scale(6),
                                width: scale(125),
                                alignItems: 'center'
                            },
                            tabIndex == 1 && {
                                backgroundColor: COLORS.green,
                                borderRadius: scale(5)
                            }
                        ]}>
                        <Text
                            style={[
                                {
                                    lineHeight: scale(20),
                                    fontSize: scale(16),
                                    color: COLORS.green
                                },
                                tabIndex == 1 && { color: '#fff' }
                            ]}>
                            Chờ xác nhận
                        </Text>
                    </Pressable>
                    <Pressable
                        onPress={() => setTabIndex(2)}
                        style={[
                            {
                                paddingVertical: scale(6),
                                width: scale(100),
                                alignItems: 'center'
                            },
                            tabIndex == 2 && {
                                backgroundColor: COLORS.green,
                                borderRadius: scale(5)
                            }
                        ]}>
                        <Text
                            style={[
                                {
                                    lineHeight: scale(20),
                                    fontSize: scale(16),
                                    color: COLORS.green
                                },
                                tabIndex == 2 && { color: '#fff' }
                            ]}>
                            Đã hủy
                        </Text>
                    </Pressable>
                </View>
            </View>
            <PopupDelete
                isVisible={isShowModel}
                onBackPress={setIsShowModel}
                headers="Xác nhận"
                message="Bạn chắc chắn muốn hủy buổi học với giảng viên?"
            />
            <View>
                <PopupRate
                    isVisible={isOpenPopupRate}
                    onBackPress={setIsOpenPopupRate}
                    message="Bạn đánh giá cuộc gọi này như thế nào?"
                />
            </View>
            <PopupSurveyCall
                isVisible={isSurveyCall}
                onBackPress={setisSurveyCall}
                onSubmit={onSubmitSurvey}
                message="Chúc mừng! Bạn đã hoàn tất cuộc gọi, chúng tôi mong bạn có những kiến thức hữu ích"
            />

            <TabView
                navigationState={{ index: tabIndex, routes }}
                renderScene={renderScene}
                renderTabBar={() => null}
                onIndexChange={setTabIndex}
                style={{
                    backgroundColor: '#fff'
                }}
            />
        </View>
    )
}

export default ConnectInstructors

const ListData = ({ type = 'booking-list-waiting' }) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(0)
    const [refreshing, setRefreshing] = useState(false)

    const getData = (refresh = false) => {
        setLoading(true)
        axios
            .get(`mentor-call/${type}/${page * 9}`)
            .then(res => {
                if (res.data.status === 200) return res.data
            })
            .then(resData => {
                const list = resData?.data
                console.log('list', list)
                if (refreshing) {
                    setIsRefetch(false)
                    setData(list)
                } else {
                    setData(Array.isArray(data) ? [...data, ...list] : list)
                }
            })
            .catch(e => {
                console.log(e)
            })
            .finally(() => {
                setLoading(false)
                if (refresh) {
                    setRefreshing(false)
                }
            })
    }

    const refetch = React.useCallback(() => getData(true), [refreshing])

    useEffect(() => {
        getData(false)
    }, [page])

    const handleLoadMore = () => {
        setPage(page + 1)
    }

    return (
        <ScrollView
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={refetch} />
            }>
            {loading ? (
                <LoadingAnimation />
            ) : data?.length ? (
                <FlatList
                    data={data}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <MentorCallItem index={index} data={item} />
                    )}
                    contentContainerStyle={{
                        paddingTop: scale(16),
                        paddingBottom: scale(50)
                    }}
                    // onEndReached={handleLoadMore}
                    // onEndReachedThreshold={0.5}
                    showsVerticalScrollIndicator={false}
                />
            ) : (
                <NoDataAnimation />
            )}
        </ScrollView>
    )
}

const MentorCallItem = ({ data }) => {
    const fullName = data?.first_name + ' ' + data?.last_name

    const openMentorCall = () => {
        const callId = hashing('mc-' + data?.id)
        Linking.openURL(`https://smarte.edu.vn/video-call/${callId}`)
    }

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
            // Render a completed state
            return (
                <Pressable onPress={openMentorCall}>
                    <LinearGradient
                        colors={['#0EBF46', '#087676']}
                        start={{ x: 1, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        style={{
                            height: 100,
                            flexDirection: 'row',
                            width: '100%',
                            justifyContent: 'center'
                        }}>
                        <View
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginHorizontal: scale(10)
                            }}>
                            <Text
                                style={{
                                    fontSize: scale(18),
                                    color: '#fff',
                                    lineHeight: scale(20)
                                }}>
                                Đến cuộc gọi ngay
                            </Text>
                        </View>
                    </LinearGradient>
                </Pressable>
            )
        } else {
            return (
                <LinearGradient
                    colors={['#0EBF46', '#087676']}
                    start={{ x: 1, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={{
                        height: 100,
                        flexDirection: 'row',
                        width: '100%',
                        justifyContent: 'center'
                    }}>
                    <View
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginHorizontal: scale(10)
                        }}>
                        <Text
                            style={{
                                fontSize: scale(20),
                                color: '#fff'
                            }}>
                            {days}
                        </Text>
                        <Text
                            style={{
                                fontSize: scale(14),
                                color: '#fff'
                            }}>
                            Ngày
                        </Text>
                    </View>
                    <View
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginHorizontal: scale(10)
                        }}>
                        <Text
                            style={{
                                fontSize: scale(20),
                                color: '#fff'
                            }}>
                            {hours}
                        </Text>
                        <Text
                            style={{
                                fontSize: scale(14),
                                color: '#fff'
                            }}>
                            Giờ
                        </Text>
                    </View>
                    <View
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginHorizontal: scale(10)
                        }}>
                        <Text
                            style={{
                                fontSize: scale(20),
                                color: '#fff'
                            }}>
                            {minutes}
                        </Text>
                        <Text
                            style={{
                                fontSize: scale(14),
                                color: '#fff'
                            }}>
                            Phút
                        </Text>
                    </View>
                    <View
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginHorizontal: scale(10)
                        }}>
                        <Text
                            style={{
                                fontSize: scale(20),
                                color: '#fff'
                            }}>
                            {seconds}
                        </Text>
                        <Text
                            style={{
                                fontSize: scale(14),
                                color: '#fff'
                            }}>
                            Giây
                        </Text>
                    </View>
                </LinearGradient>
            )
        }
    }

    return (
        <Box alignItems="center" style={{ marginBottom: 10 }}>
            <Box
                maxW="80"
                rounded="lg"
                overflow="hidden"
                _dark={{
                    borderColor: 'coolGray.600',
                    backgroundColor: 'gray.700'
                }}
                _web={{
                    shadow: 2,
                    borderWidth: 0
                }}
                _light={{
                    backgroundColor: 'gray.50'
                }}>
                <Box>
                    <Countdown
                        date={dayjs('2021-07-06 14:53:00')}
                        renderer={({
                            total,
                            days,
                            hours,
                            minutes,
                            seconds,
                            milliseconds,
                            completed
                        }) =>
                            renderer({
                                total,
                                days,
                                hours,
                                minutes,
                                seconds,
                                milliseconds,
                                completed
                            })
                        }
                    />
                </Box>
                <Stack p="4" space={3}>
                    <Stack space={2}>
                        <Heading size="md" ml="-1">
                            {fullName}
                        </Heading>
                        <Text
                            fontSize="xs"
                            _light={{
                                color: 'violet.500'
                            }}
                            _dark={{
                                color: 'violet.400'
                            }}
                            fontWeight="500"
                            ml="-0.5"
                            mt="-1">
                            {data?.title}
                        </Text>
                    </Stack>
                    <Text fontWeight="400">
                        Bạn có cuộc gọi với {data?.gender === 2 ? 'Cô' : 'Thầy'}{' '}
                        {fullName} vào lúc {data?.book_time}
                    </Text>
                    <HStack
                        alignItems="center"
                        space={4}
                        justifyContent="space-between">
                        <HStack alignItems="center">
                            <Text
                                color="coolGray.600"
                                _dark={{
                                    color: 'warmGray.200'
                                }}
                                fontWeight="400">
                                {data?.price || 'Cuộc gọi miễn phí'}
                            </Text>
                        </HStack>
                    </HStack>
                </Stack>
            </Box>
        </Box>
    )
}
