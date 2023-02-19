import axios from 'app/Axios'
import { Avatar, CourseDetailSkeleton, Rate } from 'app/atoms'
import { COLORS } from 'app/constants'
import { scale } from 'app/helpers/responsive'
import { svgWhiteBack } from 'assets/svg'
import React, { useEffect, useState } from 'react'

import { Image, StatusBar, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SvgXml } from 'react-native-svg'
import { TabBar, TabView } from 'react-native-tab-view'

import HeaderBack from 'app/components/header-back'
import { Text } from 'native-base'
import { CheckIcon, ScrollView } from 'native-base'

const routes = [
    {
        key: 'tab-1',
        title: 'Trình độ chuyên môn'
    },
    {
        key: 'tab-2',
        title: 'Kinh nghiệm làm việc'
    },
    {
        key: 'tab-3',
        title: 'Kinh nghiệm giảng dạy'
    },
    {
        key: 'tab-4',
        title: 'Lĩnh vực tư vấn'
    }
]

const TeacherInfo = ({ navigation, route }) => {
    const { id } = route.params
    const [data, setData] = useState()
    const [loading, setLoading] = useState(true)
    const [tabIndex, setTabIndex] = useState(0)

    const fullName = `${data?.mentor?.first_name} ${data?.mentor?.last_name}`

    useEffect(() => {
        if (id) {
            setLoading(true)
            axios
                .get(`users/get-mentor-info/${id}`)
                .then(res => {
                    if (res.data.status === 200) {
                        setData(res.data)
                    }
                })
                .catch(err => console.error(err.message))
                .finally(() => setLoading(false))
        }
    }, [id])

    const renderContent = list => {
        return list?.map((item, index) => (
            <View
                key={index}
                style={{
                    flexDirection: 'row',
                    marginTop: scale(8)
                }}>
                <CheckIcon
                    size={scale(14)}
                    style={{
                        marginRight: scale(10),
                        marginTop: 5,
                        color: COLORS.green
                    }}
                />
                <Text
                    style={{
                        flex: 1,

                        color: '#202020',
                        fontSize: scale(16)
                    }}>
                    {item?.content}
                </Text>
            </View>
        ))
    }

    const renderScene = ({ route }) => {
        switch (route.key) {
            case 'tab-1':
                return (
                    <TabContent content={renderContent(data?.qualifications)} />
                )
            case 'tab-2':
                return (
                    <TabContent content={renderContent(data?.workExperience)} />
                )
            case 'tab-3':
                return (
                    <TabContent
                        content={renderContent(data?.teachingExperience)}
                    />
                )
            case 'tab-4':
                return (
                    <TabContent
                        content={renderContent(data?.fieldConsulting)}
                    />
                )
            default:
                return null
        }
    }

    if (loading) {
        return <CourseDetailSkeleton />
    }

    const renderLabel = ({ route, focused, color }) => {
        return (
            <View>
                <Text
                    style={[
                        focused ? styles.activeTabText : styles.tabText,
                        {
                            textTransform: 'uppercase',
                            whiteSpace: 'nowrap',
                            wordWrap: 'break-word'
                        }
                    ]}>
                    {route.title}
                </Text>
            </View>
        )
    }

    const renderTabBar = props => (
        <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: 'white' }}
            style={{ backgroundColor: COLORS.green }}
            renderLabel={renderLabel}
        />
    )

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <StatusBar barStyle="light-content" />
            <View>
                <Image
                    source={require('assets/images/teacher-info-header.png')}
                    style={{
                        width: '100%',
                        height: scale(120),
                        position: 'absolute'
                    }}
                    resizeMode="stretch"
                />
                <SafeAreaView
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingBottom: scale(15),
                        paddingTop: scale(10)
                    }}
                    edges={['top']}>
                    <HeaderBack white />
                    <Text
                        style={{
                            fontSize: scale(16),
                            color: '#fff'
                        }}>
                        Thông tin giảng viên
                    </Text>
                    <View style={{ paddingHorizontal: scale(16), opacity: 0 }}>
                        <SvgXml
                            xml={svgWhiteBack}
                            width={scale(24)}
                            height={scale(24)}
                        />
                    </View>
                </SafeAreaView>
            </View>

            <View
                style={{
                    alignItems: 'center',
                    paddingBottom: scale(11)
                }}>
                <Avatar
                    size={scale(180)}
                    name={fullName}
                    userId={data?.mentor?.id}
                />
                <Text
                    style={{
                        fontSize: scale(18),
                        color: '#000',
                        marginTop: scale(10)
                    }}>
                    {fullName}
                </Text>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: scale(8)
                    }}>
                    <Rate rate={5} size="24" />
                </View>
                <Text
                    style={{
                        fontSize: scale(16),
                        color: '#6C746E',
                        marginTop: scale(8)
                    }}>
                    {data?.mentor?.department}
                </Text>
                <Text
                    style={{
                        fontSize: scale(16),
                        color: '#6C746E',
                        marginTop: scale(8)
                    }}>
                    {data?.mentor?.position}
                </Text>
            </View>
            <TabView
                renderTabBar={renderTabBar}
                navigationState={{ index: tabIndex, routes }}
                renderScene={renderScene}
                onIndexChange={setTabIndex}
                style={{
                    backgroundColor: '#fff'
                }}
            />
            {/* <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        alignSelf: 'flex-end',
                    }}
                >
                    <Text
                        style={{
                            
                            fontSize: scale(16),
                            color: '#656565',
                            textDecorationLine: 'line-through',
                        }}
                    >
                        {toCurrency(11111111)}đ
                    </Text>
                    <Text
                        style={{
                            marginLeft: scale(24),
                            
                            fontSize: scale(18),
                            color: '#095F2B',
                        }}
                    >
                        {toCurrency(11111111)}đ/ 30 phút
                    </Text>
                </View> */}
            {/* <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: scale(14),
                        justifyContent: 'space-between',
                    }}
                >
                    <Pressable
                        style={{
                            width: '48%',
                            borderWidth: 1,
                            borderColor: COLORS.green,
                            paddingVertical: scale(12),
                            borderRadius: scale(10),
                            alignItems: 'center',
                        }}
                    >
                        <Text
                            style={{
                                
                                fontSize: scale(18),
                                color: COLORS.green,
                            }}
                        >
                            Theo dõi
                        </Text>
                    </Pressable>
                    <Pressable
                        style={{
                            width: '48%',
                            borderWidth: 1,
                            borderColor: COLORS.green,
                            paddingVertical: scale(12),
                            borderRadius: scale(10),
                            alignItems: 'center',
                            backgroundColor: COLORS.green,
                        }}
                    >
                        <Text
                            style={{
                                
                                fontSize: scale(18),
                                color: '#fff',
                            }}
                        >
                            Đặt lịch ngay
                        </Text>
                    </Pressable>
                </View> */}
        </View>
    )
}

export default TeacherInfo

const TabContent = ({ content }) => {
    return (
        <ScrollView
            h="80"
            _contentContainerStyle={{
                px: '20px',
                mb: '4',
                minW: '72'
            }}>
            {content}
            <View style={{ height: 50 }}></View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    activeTabText: {
        color: '#fff'
    },
    tabText: {
        color: '#ccc'
    }
})
