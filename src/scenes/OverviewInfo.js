import React, { useState } from 'react'
import { View, Pressable, ScrollView, StyleSheet, FlatList } from 'react-native'
import { Text } from 'native-base'
import { SvgXml } from 'react-native-svg'
import { scale } from 'app/helpers/responsive'
import { svgFourSquares, svgBlueViewMore, svgBlackHome } from 'assets/svg'
import { STYLES } from 'app/constants'
import CourseItem from 'app/components/CourseItem'
import CourseOverviewChart from 'app/components/CourseOverviewChart'
import ComingExam from 'app/components/ComingExamCard'
import TeacherItem from 'app/components/TeacherItem'
import FriendItem from 'app/components/FriendItem'
import { useGlobalState } from 'app/Store'
import LottieView from 'lottie-react-native'
import animationImg from 'assets/animations/dashboard.json'
import { Center } from 'native-base'

const Overview = ({ navigation, route }) => {
    const [dashboardInfo, setDashboardInfo] = useGlobalState('dashboardInfo')
    const [selectedCourse, setSelectedCourse] = useState()

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* <Image
                    source={{
                        uri: `${API_URL}public/user-avatars/${userInfo?.id}-cover.webp?rand=${random}`,
                    }}
                    resizeMode="cover"
                    style={{ width: '100%', height: scale(200) }}
                /> */}
                <Center>
                    <LottieView
                        source={animationImg}
                        autoPlay
                        loop
                        style={{
                            width: 500,
                            height: 200,
                        }}
                    />
                </Center>
                <View
                    style={{
                        paddingVertical: scale(16),
                        paddingHorizontal: scale(35),
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <View
                        style={{
                            borderWidth: 1,
                            borderColor: '#F3C72B',
                            borderRadius: scale(10),
                            padding: scale(10),
                            width: '48%',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Text
                            style={{
                                fontWeight: 'bold',
                                fontSize: scale(18),
                                color: '#193769',
                            }}
                        >
                            SE xu
                        </Text>
                        <Text
                            style={{
                                marginTop: scale(4),

                                fontWeight: 'bold',
                                fontSize: scale(20),
                                color: '#F3C72B',
                                textAlign: 'center',
                            }}
                        >
                            0đ
                        </Text>
                    </View>
                    <View
                        style={{
                            borderWidth: 1,
                            borderColor: '#16671E',
                            borderRadius: scale(10),
                            padding: scale(10),
                            width: '48%',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Text
                            style={{
                                fontWeight: 'bold',
                                fontSize: scale(18),
                                color: '#193769',
                            }}
                        >
                            Số khóa học
                        </Text>
                        <Text
                            style={{
                                marginTop: scale(4),

                                fontWeight: 'bold',
                                fontSize: scale(20),
                                color: '#16671E',
                                textAlign: 'center',
                            }}
                        >
                            {dashboardInfo?.count}
                        </Text>
                    </View>
                </View>
                <Notifications
                    title="Thông báo nội bộ"
                    data={dashboardInfo?.newest_notifs}
                />
                <Notifications
                    title="Bảng tin hệ thống"
                    data={dashboardInfo?.newest_sys_notifs}
                />
                <View
                    style={{
                        borderTopWidth: scale(12),
                        borderTopColor: '#f4f4f4',
                        padding: scale(16),
                    }}
                >
                    <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                        <Text style={styles.formTitle}>Thống kê</Text>
                        {/* <Pressable
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
                                justifyContent: 'center',
                            }}
                        >
                            <Text
                                style={{
                                    
                                    fontSize: scale(13),
                                    color: '#1F1F1F',
                                }}
                            >
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
                                    color: '#1F1F1F',
                                }}
                            >
                                01/11/2021
                            </Text>
                            <SvgXml
                                xml={svgGreyCalendar}
                                width={scale(16)}
                                height={scale(16)}
                                style={{ marginLeft: scale(3) }}
                            />
                        </Pressable> */}
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
                            }}
                        >
                            {selectedCourse?.title}
                        </Text>
                        <Text
                            style={{
                                fontSize: scale(16),
                                color: '#6C6C6C',
                                textAlign: 'center',
                                marginTop: scale(4),
                            }}
                        >
                            Tiến độ hoàn thành:{' '}
                            <Text style={{ fontWeight: 'bold', color: '#000' }}>
                                {selectedCourse?.process}%
                            </Text>
                        </Text>
                    </View>
                </View>
                <View
                    style={{
                        borderTopWidth: scale(12),
                        borderTopColor: '#f4f4f4',
                        padding: scale(16),
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Text style={styles.formTitle}>
                            Lịch học offline sắp đến
                        </Text>
                        <Pressable
                            hitSlop={20}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: scale(14),
                                    color: '#0075FF',
                                }}
                            >
                                Tất cả
                            </Text>
                            <SvgXml
                                xml={svgBlueViewMore}
                                style={{ width: scale(16), height: scale(16) }}
                            />
                        </Pressable>
                    </View>
                    {dashboardInfo?.schedule_ofline?.map((item, index) => {
                        return (
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginTop: scale(16),
                                }}
                            >
                                <View
                                    style={{
                                        backgroundColor:
                                            'rgba(1, 167, 2, 0.16)',
                                        borderRadius: scale(5),
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        paddingHorizontal: scale(4),
                                        paddingVertical: scale(22),
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: scale(19),
                                            color: '#007739',
                                        }}
                                    >
                                        02
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: scale(12),
                                            color: '#007739',
                                            marginTop: scale(7),
                                        }}
                                    >
                                        Tháng 12
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: scale(12),
                                            color: '#007739',
                                            marginTop: scale(7),
                                        }}
                                    >
                                        2021
                                    </Text>
                                    <View
                                        style={{
                                            width: '100%',
                                            height: 1,
                                            backgroundColor: '#AEE4B0',
                                            marginVertical: scale(7),
                                        }}
                                    />
                                    <Text
                                        style={{
                                            fontSize: scale(12),
                                            color: '#007739',
                                        }}
                                    >
                                        Lúc 9:30
                                    </Text>
                                </View>
                                <View
                                    style={{ flex: 1, marginLeft: scale(16) }}
                                >
                                    <Text
                                        style={{
                                            fontSize: scale(16),
                                            color: '#1F1F1F',
                                        }}
                                    >
                                        Khóa học SD1
                                    </Text>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            marginTop: scale(8),
                                        }}
                                    >
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
                                                color: '#1F1F1F',
                                            }}
                                        >
                                            307A Nguyễn Trọng Tuyển, P.10, Quận
                                            Phú Nhuận, TP.HCM,. chiều cao cứng
                                        </Text>
                                    </View>
                                    {/* <View
                                        style={{
                                            flexDirection: 'row',
                                            marginTop: scale(8),
                                        }}
                                    >
                                        {new Array(6)
                                            .fill(0)
                                            .map((_, index) => {
                                                if (index < 5) {
                                                    return (
                                                        <Image
                                                            key={index}
                                                            source={{
                                                                uri: 'https://ca.hellomagazine.com/imagenes//healthandbeauty/mother-and-baby/20211114126287/david-beckham-dog-sage-kiss/0-608-981/david-beckham-t.jpg',
                                                            }}
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
                                                                borderWidth: 1,
                                                                borderColor:
                                                                    '#c2c2c2',
                                                            }}
                                                        />
                                                    )
                                                }
                                                return (
                                                    <View
                                                        style={{
                                                            width: scale(48),
                                                            height: scale(48),
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
                                                                '#EBF6FA',
                                                        }}
                                                    >
                                                        <Text
                                                            style={{
                                                                fontSize:
                                                                    scale(12),
                                                            }}
                                                        >
                                                            +86
                                                        </Text>
                                                    </View>
                                                )
                                            })}
                                    </View> */}
                                </View>
                            </View>
                        )
                    })}
                </View>
                <View
                    style={{
                        borderTopWidth: scale(12),
                        borderTopColor: '#f4f4f4',
                        padding: scale(16),
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Text style={styles.formTitle}>Kì thi sắp đến</Text>
                        <Pressable
                            hitSlop={20}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: scale(14),
                                    color: '#0075FF',
                                }}
                            >
                                Tất cả
                            </Text>
                            <SvgXml
                                xml={svgBlueViewMore}
                                style={{ width: scale(16), height: scale(16) }}
                            />
                        </Pressable>
                    </View>
                    <View>
                        {dashboardInfo?.examinations?.map((item, index) => {
                            return <ComingExam />
                        })}
                    </View>
                </View>
                <View
                    style={{
                        borderTopWidth: scale(12),
                        borderTopColor: '#f4f4f4',
                        padding: scale(16),
                        paddingBottom: 0,
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Text style={styles.formTitle}>Khóa học của tôi</Text>
                        <Pressable
                            hitSlop={20}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                            onPress={() =>
                                navigation.navigate(ROUTES.CoursesByUser, {
                                    userId: null,
                                })
                            }
                        >
                            <Text
                                style={{
                                    fontSize: scale(14),
                                    color: '#0075FF',
                                }}
                            >
                                Tất cả
                            </Text>
                            <SvgXml
                                xml={svgBlueViewMore}
                                style={{ width: scale(16), height: scale(16) }}
                            />
                        </Pressable>
                    </View>
                    <View style={{ marginTop: scale(24) }}>
                        <FlatList
                            data={dashboardInfo?.continue_courses}
                            keyExtractor={(_, index) => index.toString()}
                            horizontal
                            contentContainerStyle={{
                                marginTop: scale(16),
                                paddingLeft: scale(16),
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
                    </View>
                </View>
                <View
                    style={{
                        borderTopWidth: scale(12),
                        borderTopColor: '#f4f4f4',
                        padding: scale(16),
                        paddingBottom: 0,
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Text style={styles.formTitle}>
                            Giảng viên yêu thích
                        </Text>
                        <Pressable
                            hitSlop={20}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: scale(14),
                                    color: '#0075FF',
                                }}
                            >
                                Tất cả
                            </Text>
                            <SvgXml
                                xml={svgBlueViewMore}
                                style={{ width: scale(16), height: scale(16) }}
                            />
                        </Pressable>
                    </View>
                    <View style={{ marginTop: scale(8) }}>
                        {[].map((_, index) => (
                            <TeacherItem key={index} />
                        ))}
                    </View>
                </View>
                <View
                    style={{
                        borderTopWidth: scale(12),
                        borderTopColor: '#f4f4f4',
                        padding: scale(16),
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Text style={styles.formTitle}>Bạn bè của bạn</Text>
                        <Pressable
                            hitSlop={20}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                            onPress={() =>
                                navigation.navigate(ROUTES.Friends, {
                                    userId: null,
                                })
                            }
                        >
                            <Text
                                style={{
                                    fontSize: scale(14),
                                    color: '#0075FF',
                                }}
                            >
                                Tất cả
                            </Text>
                            <SvgXml
                                xml={svgBlueViewMore}
                                style={{ width: scale(16), height: scale(16) }}
                            />
                        </Pressable>
                    </View>
                    <View>
                        {dashboardInfo?.latest5Friends?.map((item, index) => (
                            <FriendItem index={index} item={item} />
                        ))}
                    </View>
                </View>
                <View
                    style={{
                        borderTopWidth: scale(12),
                        borderTopColor: '#f4f4f4',
                        padding: scale(16),
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Text style={styles.formTitle}>
                            Có thể bạn quan tâm
                        </Text>
                        <Pressable
                            hitSlop={20}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: scale(14),
                                    color: '#0075FF',
                                }}
                            >
                                Tất cả
                            </Text>
                            <SvgXml
                                xml={svgBlueViewMore}
                                style={{ width: scale(16), height: scale(16) }}
                            />
                        </Pressable>
                    </View>
                    <View style={{ marginTop: scale(14) }}>
                        <FlatList
                            data={dashboardInfo?.wishlist}
                            keyExtractor={(_, index) => index.toString()}
                            horizontal
                            contentContainerStyle={{
                                marginTop: scale(16),
                                paddingLeft: scale(16),
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
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    formTitle: {
        fontWeight: 'bold',
        fontSize: scale(18),
        color: '#1F1F1F',
    },
})

export default Overview

const Notifications = ({ title, data }) => {
    return (
        <>
            {data?.length > 0 && (
                <View
                    style={{
                        borderTopWidth: scale(12),
                        borderTopColor: '#f4f4f4',
                        padding: scale(16),
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Text style={styles.formTitle}>{title}</Text>
                        <Pressable
                            hitSlop={20}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: scale(14),
                                    color: '#0075FF',
                                }}
                            >
                                Tất cả
                            </Text>
                            <SvgXml
                                xml={svgBlueViewMore}
                                style={{
                                    width: scale(16),
                                    height: scale(16),
                                }}
                            />
                        </Pressable>
                    </View>

                    <View style={{ marginTop: scale(12) }}>
                        {data?.map((item, index) => {
                            return (
                                <View
                                    key={index}
                                    style={{
                                        flexDirection: 'row',
                                        marginBottom: scale(8),
                                    }}
                                >
                                    <View style={{ alignItems: 'center' }}>
                                        <View
                                            style={{
                                                backgroundColor: '#E1E5F1',
                                                borderRadius: 100,
                                                padding: scale(4),
                                            }}
                                        >
                                            <View
                                                style={{
                                                    width: scale(10),
                                                    height: scale(10),
                                                    borderRadius: scale(10),
                                                    backgroundColor: '#4063E0',
                                                }}
                                            />
                                        </View>
                                        {/* <Dash
                                            style={{
                                                width: 1,
                                                height: '100%',
                                                flexDirection: 'column',
                                                position: 'absolute',
                                                zIndex: -1,
                                            }}
                                            dashColor="#4063E0"
                                        /> */}
                                    </View>
                                    <View
                                        style={{
                                            flex: 1,
                                            marginLeft: scale(4),
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontWeight: 'bold',
                                                fontSize: scale(14),
                                                color: '#4063E0',
                                            }}
                                        >
                                            {item?.title}
                                        </Text>
                                        <Text
                                            numberOfLines={2}
                                            style={{
                                                fontSize: scale(14),
                                                color: '#1F1F1F',
                                                marginTop: scale(4),
                                            }}
                                        >
                                            {item?.content}
                                        </Text>
                                    </View>
                                </View>
                            )
                        })}
                    </View>

                    <Pressable
                        style={[
                            {
                                position: 'absolute',
                                bottom: scale(3),
                                right: 0,
                                padding: scale(13),
                                borderTopLeftRadius: scale(24),
                                borderBottomLeftRadius: scale(24),
                            },
                            STYLES.boxShadow,
                        ]}
                    >
                        <SvgXml
                            xml={svgFourSquares}
                            width={scale(24)}
                            height={scale(24)}
                        />
                    </Pressable>
                </View>
            )}
        </>
    )
}
