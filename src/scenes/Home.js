import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    Pressable,
    ScrollView,
    FlatList,
    Linking,
} from 'react-native'
import { SvgXml } from 'react-native-svg'
import { scale } from 'app/helpers/responsive'
import { svgStudy, svgList } from 'assets/svg'
import {
    FONTS,
    STYLES,
    ROUTES,
    COLORS,
    NEWS_PATH,
    COURSE_IMG_PATH,
} from 'app/constants'
import { SafeAreaView } from 'react-native-safe-area-context'
import CourseItem from 'app/components/CourseItem'
import Advise from 'app/components/advise'
import { Box, Progress, Image } from 'native-base'
import { Avatar, NoDataAnimation as NoData } from 'app/atoms'
import { useGlobalState } from 'app/Store'
import Axios from 'app/Axios'
import { toRelativeTime } from 'app/helpers/utils'
import HotMentors from 'app/components/HotMentors'
import { Flag, Rss } from 'react-native-feather'

const Home = ({ navigation }) => {
    const [userInfo, setUserState] = useGlobalState('userInfo')
    const [dashboardInfo, setDashboardInfo] = useGlobalState('dashboardInfo')
    const [homeInfo, setHomeInfo] = useGlobalState('homeInfo')
    const [loading, setLoading] = useState(false)
    const [random, setRandom] = useGlobalState('random')

    useEffect(() => {
        Axios.get('courses/get-list-in-dashboard')
            .then((res) => {
                if (res.data.status === 200) {
                    setDashboardInfo(res?.data)
                }
            })
            .finally(() => setLoading(false))
    }, [])

    useEffect(() => {
        Axios.get('homepage-info')
            .then((res) => {
                setHomeInfo(res?.data?.data)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <SafeAreaView edges={['top']} style={{ flex: 1 }}>
                <ScrollView
                    contentContainerStyle={{ paddingBottom: scale(30) }}
                >
                    <Pressable
                        onPress={() => navigation.navigate(ROUTES.Overview)}
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingTop: scale(26),
                            paddingBottom: scale(16),
                            paddingHorizontal: scale(16),
                            borderTopWidth: scale(8),
                            borderTopColor: COLORS.borderGrey,
                        }}
                    >
                        <Avatar userId={userInfo?.id} />
                        <View style={{ marginLeft: scale(16), flex: 1 }}>
                            <Text
                                style={{
                                    fontFamily: FONTS.Mulish,
                                    fontSize: scale(18),
                                    color: '#1F1F1F',
                                }}
                            >
                                Xin chào{' '}
                                <Text style={{ color: '#0EBF46' }}>
                                    {userInfo?.last_name}
                                </Text>
                            </Text>
                            <Text
                                style={{
                                    fontFamily: FONTS.Mulish,
                                    fontSize: scale(14),
                                    color: '#1F1F1F',
                                    marginTop: scale(4),
                                }}
                            >
                                Chào mừng đến với{' '}
                                <Text style={{ color: '#0EBF46' }}>
                                    SmartEdu!
                                </Text>
                            </Text>
                        </View>
                    </Pressable>
                    <View
                        style={{
                            borderTopWidth: scale(8),
                            borderTopColor: COLORS.borderGrey,
                            padding: scale(16),
                        }}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}
                            >
                                <SvgXml xml={svgStudy} width={scale(24)} />
                                <Text
                                    style={{
                                        fontFamily: FONTS.MulishBold,
                                        fontSize: scale(16),
                                        color: '#0E564D',
                                        marginLeft: scale(8),
                                    }}
                                >
                                    DUY TRÌ HỌC TẬP
                                </Text>
                            </View>
                        </View>
                        {dashboardInfo?.continue_courses?.length ? (
                            <FlatList
                                data={dashboardInfo?.continue_courses?.slice(
                                    0,
                                    3
                                )}
                                keyExtractor={(_, index) => index.toString()}
                                showsHorizontalScrollIndicator={false}
                                horizontal
                                contentContainerStyle={{
                                    paddingTop: scale(16),
                                }}
                                renderItem={({ item, index }) => (
                                    <Pressable
                                        key={index}
                                        onPress={() =>
                                            navigation.navigate(
                                                ROUTES.CourseInfo,
                                                {
                                                    id: item?.id,
                                                }
                                            )
                                        }
                                    >
                                        <View
                                            style={{
                                                paddingRight: scale(8),
                                            }}
                                        >
                                            <View
                                                style={[
                                                    {
                                                        flexDirection: 'row',
                                                        paddingTop: scale(8),
                                                        paddingBottom: scale(8),
                                                        paddingRight: scale(3),
                                                        paddingLeft: scale(6),
                                                        borderWidth: 1,
                                                        borderColor: '#E6E6E6',
                                                        borderRadius: scale(5),
                                                    },
                                                    STYLES.boxShadow,
                                                ]}
                                            >
                                                <View
                                                    style={{
                                                        flex: 1,
                                                        marginRight: scale(4),
                                                        justifyContent:
                                                            'space-between',
                                                        paddingBottom: scale(7),
                                                    }}
                                                >
                                                    <Text
                                                        numberOfLines={3}
                                                        style={{
                                                            fontFamily:
                                                                FONTS.MulishBold,
                                                            fontSize: scale(14),
                                                            color: '#1F1F1F',
                                                            width: 200,
                                                        }}
                                                    >
                                                        {item?.title}
                                                    </Text>
                                                    <View
                                                        style={{
                                                            marginTop:
                                                                scale(15),
                                                        }}
                                                    >
                                                        <Box w="80%" maxW="400">
                                                            <Progress
                                                                colorScheme="green"
                                                                value={
                                                                    item?.process
                                                                }
                                                            />
                                                            <Text
                                                                style={{
                                                                    fontFamily:
                                                                        FONTS.MulishBold,
                                                                    fontSize:
                                                                        scale(
                                                                            12
                                                                        ),
                                                                    color: '#000',
                                                                }}
                                                            >
                                                                {item?.process}%
                                                            </Text>
                                                        </Box>
                                                    </View>
                                                </View>
                                                <Image
                                                    resizeMode="cover"
                                                    source={{
                                                        uri: `${COURSE_IMG_PATH}${item?.id}.webp`,
                                                    }}
                                                    style={{
                                                        width: scale(89),
                                                        height: scale(89),
                                                    }}
                                                />
                                            </View>
                                        </View>
                                    </Pressable>
                                )}
                            />
                        ) : (
                            <NoData />
                        )}
                        {/* <FlatList
                            data={dashboardInfo?.continue_courses?.slice(0, 3)}
                            keyExtractor={(_, index) => index.toString()}
                            contentContainerStyle={{ padding: scale(16) }}
                            showsHorizontalScrollIndicator={false}
                            horizontal
                            renderItem={({ item, index }) => (
                                <View
                                    style={[
                                        STYLES.boxShadow,
                                        {
                                            paddingTop: scale(7),
                                            paddingHorizontal: scale(16),
                                            paddingBottom: scale(22),
                                            justifyContent: 'space-between',
                                            maxWidth: '50%',
                                            marginRight: scale(12),
                                            borderRadius: scale(16),
                                            backgroundColor: [
                                                '#52B553',
                                                '#ED8E00',
                                                '#3E50F2',
                                            ][index],
                                        },
                                    ]}
                                >
                                    <Pressable
                                        onPress={() =>
                                            navigation.navigate(
                                                ROUTES.CourseInfo,
                                                {
                                                    id: item?.id,
                                                }
                                            )
                                        }
                                    >
                                        <Text
                                            style={{
                                                fontFamily: FONTS.Mulish,
                                                fontSize: scale(16),
                                                color: '#fff',
                                            }}
                                        >
                                            {item?.title}
                                        </Text>
                                        <View style={{ marginTop: scale(15) }}>
                                            <Text
                                                style={{
                                                    fontFamily:
                                                        FONTS.MulishBold,
                                                    fontSize: scale(20),
                                                    color: '#fff',
                                                }}
                                            >
                                                {item?.process}%
                                            </Text>
                                            <Box w="100%" maxW="400">
                                                <Progress
                                                    colorScheme="primary"
                                                    value={item?.process}
                                                />
                                            </Box>
                                        </View>
                                    </Pressable>
                                </View>
                            )}
                        /> */}
                    </View>
                    <View
                        style={{
                            borderTopWidth: scale(8),
                            borderTopColor: COLORS.borderGrey,
                            padding: scale(16),
                        }}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            <SvgXml xml={svgList} width={scale(20)} />
                            <Text
                                style={{
                                    marginLeft: scale(8),
                                    fontFamily: FONTS.MulishBold,
                                    fontSize: scale(16),
                                    color: '#0E564D',
                                }}
                            >
                                DANH SÁCH THỂ LOẠI
                            </Text>
                        </View>
                        {homeInfo?.course_groups?.length ? (
                            <FlatList
                                data={homeInfo?.course_groups || []}
                                keyExtractor={(_, index) => index.toString()}
                                contentContainerStyle={{
                                    paddingTop: scale(16),
                                }}
                                showsHorizontalScrollIndicator={false}
                                horizontal
                                renderItem={({ item, index }) => (
                                    <Pressable
                                        onPress={() =>
                                            navigation.navigate('CourseList', {
                                                courseGroupSelected: item?.id,
                                            })
                                        }
                                    >
                                        <View
                                            key={index}
                                            style={{
                                                paddingRight: scale(8),
                                            }}
                                        >
                                            <View
                                                style={[
                                                    {
                                                        flexDirection: 'row',
                                                        paddingTop: scale(3),
                                                        paddingBottom: scale(8),
                                                        paddingRight: scale(3),
                                                        paddingLeft: scale(6),
                                                        borderWidth: 1,
                                                        borderColor: '#E6E6E6',
                                                        borderBottomWidth:
                                                            scale(4),
                                                        borderRadius: scale(5),
                                                        borderBottomColor:
                                                            COLORS.green,
                                                    },
                                                    STYLES.boxShadow,
                                                ]}
                                            >
                                                <View
                                                    style={{
                                                        flex: 1,
                                                        marginRight: scale(4),
                                                        justifyContent:
                                                            'space-between',
                                                        paddingBottom: scale(7),
                                                    }}
                                                >
                                                    <Text
                                                        numberOfLines={3}
                                                        style={{
                                                            fontFamily:
                                                                FONTS.MulishBold,
                                                            fontSize: scale(14),
                                                            color: '#1F1F1F',
                                                            width: 200,
                                                        }}
                                                    >
                                                        {item?.name}
                                                    </Text>
                                                </View>
                                                <Image
                                                    source={require('assets/images/people.jpg')}
                                                    style={{
                                                        width: scale(60),
                                                        height: scale(89),
                                                    }}
                                                />
                                            </View>
                                        </View>
                                    </Pressable>
                                )}
                            />
                        ) : (
                            <NoData />
                        )}
                    </View>

                    <View
                        style={{
                            borderTopWidth: scale(8),
                            borderTopColor: COLORS.borderGrey,
                            paddingVertical: scale(16),
                        }}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                paddingHorizontal: scale(16),
                            }}
                        >
                            <Flag stroke="#0E564D" width={18} height={18} />
                            <Text
                                style={{
                                    fontFamily: FONTS.MulishBold,
                                    fontSize: scale(16),
                                    color: '#0E564D',
                                    marginLeft: scale(8),
                                }}
                            >
                                KHÓA HỌC HOT
                            </Text>
                        </View>
                        {homeInfo?.courses?.length ? (
                            <FlatList
                                data={homeInfo?.courses || []}
                                keyExtractor={(_, index) => index.toString()}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{
                                    paddingLeft: scale(16),
                                    paddingTop: scale(16),
                                }}
                                renderItem={({ item, index }) => (
                                    <CourseItem
                                        isHorizontal
                                        index={index}
                                        item={item}
                                    />
                                )}
                            />
                        ) : (
                            <NoData />
                        )}
                    </View>

                    <View
                        style={{
                            borderTopWidth: scale(8),
                            borderTopColor: COLORS.borderGrey,
                            paddingVertical: scale(16),
                        }}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                paddingHorizontal: scale(16),
                            }}
                        >
                            <Rss stroke="#0E564D" width={18} height={18} />
                            <Text
                                style={{
                                    fontFamily: FONTS.MulishBold,
                                    fontSize: scale(16),
                                    color: '#0E564D',
                                    marginLeft: scale(8),
                                }}
                            >
                                TIN TỨC/SỰ KIỆN
                            </Text>
                        </View>
                        {homeInfo?.news?.length ? (
                            <FlatList
                                data={homeInfo?.news || []}
                                keyExtractor={(_, index) => index.toString()}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{
                                    paddingLeft: scale(16),
                                    marginTop: scale(16),
                                }}
                                renderItem={({ item, index }) => {
                                    return (
                                        <Pressable
                                            key={index}
                                            style={{
                                                width: scale(196),
                                                marginRight: scale(12),
                                                borderBottomWidth: scale(6),
                                                borderBottomColor: COLORS.green,
                                                borderRadius: 5,
                                            }}
                                            onPress={() =>
                                                Linking.openURL(
                                                    'https://smarte.edu.vn/news-detail/' +
                                                        item?.id
                                                )
                                            }
                                        >
                                            <Image
                                                source={{
                                                    uri:
                                                        NEWS_PATH +
                                                        item.id +
                                                        '.webp?' +
                                                        random,
                                                }}
                                                alt="Alternate Text"
                                                size={scale(196)}
                                                resizeMode="cover"
                                                style={{ borderRadius: 5 }}
                                            />
                                            <View
                                                style={{
                                                    paddingVertical: scale(16),
                                                    paddingHorizontal: scale(8),
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        fontFamily:
                                                            FONTS.MulishBold,
                                                        fontSize: scale(16),
                                                        color: '#1F1F1F',
                                                    }}
                                                >
                                                    {item.title}
                                                </Text>
                                                <Text
                                                    numberOfLines={4}
                                                    style={{
                                                        marginTop: scale(8),
                                                        fontFamily:
                                                            FONTS.Mulish,
                                                        fontSize: scale(16),
                                                        color: '#1F1F1F',
                                                    }}
                                                >
                                                    {toRelativeTime(
                                                        item.created_at
                                                    )}
                                                </Text>
                                            </View>
                                        </Pressable>
                                    )
                                }}
                            />
                        ) : (
                            <NoData />
                        )}
                    </View>

                    {/* <HotMentors /> */}
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}

export default Home
