import { useGlobalState } from 'app/Store'
import { Center, NoDataAnimation, Text } from 'app/atoms'
// import { NoData } from 'app/atoms'
// import ComingExam from 'app/components/ComingExamCard'
import CourseItem from 'app/components/CourseItem'
// import CourseOverviewChart from 'app/components/CourseOverviewChart'
import FriendItem from 'app/components/FriendItem'
// import TeacherItem from 'app/components/TeacherItem'
import { STYLES } from 'app/constants'
import { scale } from 'app/helpers/responsive'
import animationImg from 'assets/animations/dashboard.json'
import React from 'react'

import LottieView from 'lottie-react-native'
import { FlatList, Pressable, ScrollView, StyleSheet, View } from 'react-native'
import { ChevronRight, Settings } from 'react-native-feather'

const Overview = ({ navigation }) => {
    const [dashboardInfo, _setDashboardInfo] = useGlobalState('dashboardInfo')
    // const [selectedCourse, setSelectedCourse] = useState()

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Center>
                    <LottieView
                        source={animationImg}
                        autoPlay
                        loop
                        style={{
                            width: 500,
                            height: 200
                        }}
                    />
                </Center>
                <View
                    style={{
                        paddingVertical: scale(16),
                        paddingHorizontal: scale(35),
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                    {/* <View
                        style={{
                            borderWidth: 1,
                            borderColor: '#F3C72B',
                            borderRadius: scale(10),
                            padding: scale(10),
                            width: '48%',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                        <Text
                            style={{
                                fontSize: scale(16),
                                color: '#193769',
                                lineHeight: scale(20)
                            }}>
                            SE xu
                        </Text>
                        <Text
                            style={{
                                marginTop: scale(4),
                                fontSize: scale(20),
                                color: '#F3C72B',
                                textAlign: 'center',
                                lineHeight: scale(20)
                            }}>
                            0đ
                        </Text>
                    </View> */}
                    <View
                        style={{
                            borderWidth: 1,
                            borderColor: '#16671E',
                            borderRadius: scale(10),
                            padding: scale(10),
                            width: '100%',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                        <Text
                            bold
                            style={{
                                fontSize: scale(16),
                                color: '#193769',
                                lineHeight: scale(20)
                            }}>
                            Số khóa học
                        </Text>
                        <Text
                            bold
                            style={{
                                marginTop: scale(4),
                                lineHeight: scale(20),
                                fontSize: scale(20),
                                color: '#16671E',
                                textAlign: 'center'
                            }}>
                            {dashboardInfo?.count}
                        </Text>
                    </View>
                </View>
                {/* <View
                    style={{
                        borderTopWidth: scale(12),
                        borderTopColor: '#fff',
                        padding: scale(16)
                    }}>
                    <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.formTitle}>Thống kê</Text>
                        <Pressable
                            style={{
                                flex: 1,
                                marginLeft: scale(14),
                                borderWidth: 1,
                                borderColor: '#D9D9D9',
                                borderRadius: scale(2),
                                paddingVertical: scale(8),
                                paddingHorizontal: scale(12),
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                            <Text
                                style={{
                                    fontSize: scale(13),
                                    color: '#6C746E'
                                }}>
                                01/11/2021
                            </Text>
                            <SvgXml
                                xml={svgCalendarArrow}
                                width={scale(16)}
                                height={scale(16)}
                            />
                            <Text
                                style={{
                                    fontSize: scale(13),
                                    color: '#6C746E'
                                }}>
                                01/11/2021
                            </Text>
                            <SvgXml
                                xml={svgGreyCalendar}
                                width={scale(16)}
                                height={scale(16)}
                                style={{ marginLeft: scale(3) }}
                            />
                        </Pressable>
                    </View>
                    <View>
                        <CourseOverviewChart
                            data={dashboardInfo?.continue_courses}
                            selectCourse={setSelectedCourse}
                        />
                        <Text
                            style={{
                                fontSize: scale(16),
                                color: '#0E564D',
                                textAlign: 'center',
                                marginTop: scale(16),
                                lineHeight: scale(20)
                            }}>
                            {selectedCourse?.title}
                        </Text>
                        <Text
                            style={{
                                fontSize: scale(16),
                                color: '#6C6C6C',
                                textAlign: 'center',
                                marginTop: scale(4),
                                lineHeight: scale(20)
                            }}>
                            Tiến độ hoàn thành:{' '}
                            <Text
                                bold
                                style={{
                                    color: '#000'
                                }}>
                                {selectedCourse?.process}%
                            </Text>
                        </Text>
                    </View>
                </View> */}
                {/* <View
                    style={{
                        borderTopWidth: scale(12),
                        borderTopColor: '#fff',
                        padding: scale(16)
                    }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                        <Text style={styles.formTitle}>
                            Lịch học offline sắp đến
                        </Text>
                        <Pressable
                            hitSlop={20}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                            <Text
                                style={{
                                    fontSize: scale(14),
                                    color: '#0075FF'
                                }}>
                                Tất cả
                            </Text>
                           <ChevronRight
                                stroke="#0075FF"
                                width={20}
                                height={20}
                            />
                        </Pressable>
                    </View>
                    {dashboardInfo?.schedule_ofline?.length ? (
                        dashboardInfo?.schedule_ofline?.map((item, index) => {
                            return (
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        marginTop: scale(16)
                                    }}>
                                    <View
                                        style={{
                                            backgroundColor:
                                                'rgba(1, 167, 2, 0.16)',
                                            borderRadius: scale(5),
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            paddingHorizontal: scale(4),
                                            paddingVertical: scale(22)
                                        }}>
                                        <Text
                                            style={{
                                                fontSize: scale(19),
                                                color: '#007739'
                                            }}>
                                            02
                                        </Text>
                                        <Text
                                            style={{
                                                fontSize: scale(12),
                                                color: '#007739',
                                                marginTop: scale(7)
                                            }}>
                                            Tháng 12
                                        </Text>
                                        <Text
                                            style={{
                                                fontSize: scale(12),
                                                color: '#007739',
                                                marginTop: scale(7)
                                            }}>
                                            2021
                                        </Text>
                                        <View
                                            style={{
                                                width: '100%',
                                                height: 1,
                                                backgroundColor: '#AEE4B0',
                                                marginVertical: scale(7)
                                            }}
                                        />
                                        <Text
                                            style={{
                                                fontSize: scale(12),
                                                color: '#007739'
                                            }}>
                                            Lúc 9:30
                                        </Text>
                                    </View>
                                    <View
                                        style={{
                                            flex: 1,
                                            marginLeft: scale(16)
                                        }}>
                                        <Text
                                            style={{
                                                fontSize: scale(16),
                                                color:'#6C746E'
                                            }}>
                                            Khóa học SD1
                                        </Text>
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                marginTop: scale(8)
                                            }}>
                                            <SvgXml
                                                xml={svgBlackHome}
                                                width={scale(20)}
                                                height={scale(20)}
                                            />
                                            <Text
                                                numberOfLines={2}
                                                style={{
                                                    flex: 1,
                                                    marginLeft: scale(10),

                                                    fontSize: scale(14),
                                                    color:'#6C746E'
                                                }}>
                                                307A Nguyễn Trọng Tuyển, P.10,
                                                Quận Phú Nhuận, TP.HCM,. chiều
                                                cao cứng
                                            </Text>
                                        </View>
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                marginTop: scale(8)
                                            }}>
                                            {new Array(6)
                                                .fill(0)
                                                .map((_, index) => {
                                                    if (index < 5) {
                                                        return (
                                                            <Image
                                                                key={index}
                                                                source={{
                                                                    uri: 'https://ca.hellomagazine.com/imagenes//healthandbeauty/mother-and-baby/20211114126287/david-beckham-dog-sage-kiss/0-608-981/david-beckham-t.jpg'
                                                                }}
                                                                style={{
                                                                    width: scale(
                                                                        48
                                                                    ),
                                                                    height: scale(
                                                                        48
                                                                    ),
                                                                    left: `-${
                                                                        50 *
                                                                        index
                                                                    }%`,
                                                                    borderRadius:
                                                                        scale(
                                                                            48
                                                                        ),
                                                                    borderWidth: 1,
                                                                    borderColor:
                                                                        '#c2c2c2'
                                                                }}
                                                            />
                                                        )
                                                    }
                                                    return (
                                                        <View
                                                            style={{
                                                                width: scale(
                                                                    48
                                                                ),
                                                                height: scale(
                                                                    48
                                                                ),
                                                                left: `-${
                                                                    50 * index
                                                                }%`,
                                                                borderRadius:
                                                                    scale(48),
                                                                justifyContent:
                                                                    'center',
                                                                alignItems:
                                                                    'center',
                                                                backgroundColor:
                                                                    '#EBF6FA'
                                                            }}>
                                                            <Text
                                                                style={{
                                                                    fontSize:
                                                                        scale(
                                                                            12
                                                                        )
                                                                }}>
                                                                +86
                                                            </Text>
                                                        </View>
                                                    )
                                                })}
                                        </View>
                                    </View>
                                </View>
                            )
                        })
                    ) : (
                        <NoData />
                    )}
                </View> */}
                {/* <View
                    style={{
                        borderTopWidth: scale(12),
                        borderTopColor: '#fff',
                        padding: scale(16)
                    }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                        <Text style={styles.formTitle}>Kì thi sắp đến</Text>
                        <Pressable
                            hitSlop={20}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                            <Text
                                style={{
                                    fontSize: scale(14),
                                    color: '#0075FF'
                                }}>
                                Tất cả
                            </Text>
                            <ChevronRight
                                stroke="#0075FF"
                                width={20}
                                height={20}
                            />
                        </Pressable>
                    </View>
                    <View>
                        {dashboardInfo?.examinations?.length ? (
                            dashboardInfo?.examinations?.map((item, index) => {
                                return <ComingExam />
                            })
                        ) : (
                            <NoData />
                        )}
                    </View>
                </View> */}
                <View
                    style={{
                        borderTopWidth: scale(12),
                        borderTopColor: '#fff',
                        padding: scale(16),
                        paddingBottom: 0
                    }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                        <Text bold style={styles.formTitle}>
                            Khóa học của tôi
                        </Text>
                        <Pressable
                            hitSlop={20}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}
                            onPress={() =>
                                navigation.navigate(ROUTES.CoursesByUser, {
                                    userId: null
                                })
                            }>
                            <Text
                                style={{
                                    fontSize: scale(14),
                                    color: '#0075FF'
                                }}>
                                Tất cả
                            </Text>

                            <ChevronRight
                                stroke="#0075FF"
                                width={20}
                                height={20}
                            />
                        </Pressable>
                    </View>
                    <View style={{ marginTop: scale(24) }}>
                        {dashboardInfo?.continue_courses?.length ? (
                            <FlatList
                                data={dashboardInfo?.continue_courses}
                                keyExtractor={(_, index) => index.toString()}
                                horizontal
                                contentContainerStyle={{
                                    paddingLeft: scale(5)
                                }}
                                showsHorizontalScrollIndicator={false}
                                renderItem={({ item, index }) => (
                                    <CourseItem
                                        isMine
                                        isHorizontal
                                        item={item}
                                        index={index}
                                    />
                                )}
                            />
                        ) : (
                            <NoDataAnimation />
                        )}
                    </View>
                </View>
                {/* <View
                    style={{
                        borderTopWidth: scale(12),
                        borderTopColor: '#fff',
                        padding: scale(16),
                        paddingBottom: 0
                    }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                        <Text style={styles.formTitle}>
                            Giảng viên yêu thích
                        </Text>
                        <Pressable
                            hitSlop={20}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                            <Text
                                style={{
                                    fontSize: scale(14),
                                    color: '#0075FF'
                                }}>
                                Tất cả
                            </Text>
                           <ChevronRight
                                stroke="#0075FF"
                                width={20}
                                height={20}
                            />
                        </Pressable>
                    </View>
                    <View style={{ marginTop: scale(8) }}>
                        {[].map((_, index) => (
                            <TeacherItem key={index} />
                        ))}
                    </View>
                </View> */}
                <View
                    style={{
                        borderTopWidth: scale(12),
                        borderTopColor: '#fff',
                        padding: scale(16)
                    }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                        <Text bold style={styles.formTitle}>
                            Bạn bè
                        </Text>
                        <Pressable
                            hitSlop={20}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}
                            onPress={() =>
                                navigation.navigate(ROUTES.Friends, {
                                    userId: null
                                })
                            }>
                            <Text
                                style={{
                                    fontSize: scale(14),
                                    color: '#0075FF'
                                }}>
                                Tất cả
                            </Text>
                            <ChevronRight
                                stroke="#0075FF"
                                width={20}
                                height={20}
                            />
                        </Pressable>
                    </View>
                    <View>
                        {dashboardInfo?.latest5Friends?.length ? (
                            <FriendItem
                                data={dashboardInfo?.latest5Friends}
                                horizontal
                            />
                        ) : (
                            <NoDataAnimation />
                        )}
                    </View>
                </View>
                <View
                    style={{
                        borderTopWidth: scale(12),
                        borderTopColor: '#fff',
                        padding: scale(16)
                    }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                        <Text bold style={styles.formTitle}>
                            Có thể bạn quan tâm
                        </Text>
                        <Pressable
                            hitSlop={20}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                            <Text
                                style={{
                                    fontSize: scale(14),
                                    color: '#0075FF'
                                }}>
                                Tất cả
                            </Text>
                            <ChevronRight
                                stroke="#0075FF"
                                width={20}
                                height={20}
                            />
                        </Pressable>
                    </View>
                    <View style={{ marginTop: scale(14) }}>
                        {dashboardInfo?.wishlist?.length ? (
                            <FlatList
                                data={dashboardInfo?.wishlist}
                                keyExtractor={(_, index) => index.toString()}
                                horizontal
                                contentContainerStyle={{
                                    marginTop: scale(16),
                                    paddingLeft: scale(16)
                                }}
                                showsHorizontalScrollIndicator={false}
                                renderItem={({ item, index }) => (
                                    <CourseItem
                                        isHorizontal
                                        item={item}
                                        index={index}
                                    />
                                )}
                            />
                        ) : (
                            <NoDataAnimation />
                        )}
                    </View>
                </View>
            </ScrollView>
            <Pressable
                onPress={() => {
                    console.log('View all')
                }}
                style={[
                    {
                        position: 'absolute',
                        top: '50%',
                        right: 0,
                        padding: scale(13),
                        borderTopLeftRadius: scale(24),
                        borderBottomLeftRadius: scale(24)
                    },
                    STYLES.boxShadow
                ]}>
                <Settings stroke="#000" width={24} height={24} />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    formTitle: {
        fontSize: scale(18),
        color: '#6C746E',
        lineHeight: scale(20)
    }
})

export default Overview
