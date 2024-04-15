import axios from 'app/Axios'
import { Avatar, CourseDetailSkeleton, Rate, Text } from 'app/atoms'
import { COLORS } from 'app/constants'
import { scale } from 'app/helpers/responsive'
import { svgWhiteBack } from 'assets/svg'
import React, { useEffect, useState } from 'react'

import {
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    View
} from 'react-native'
import { Check, Link, Package } from 'react-native-feather'
import { SvgXml } from 'react-native-svg'
import { TabBar, TabView } from 'react-native-tab-view'

import HeaderBack from 'app/components/header-back'

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

const TeacherInfo = ({ route }) => {
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
                        console.log('Data =====', res.data)
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
                <Check
                    size={scale(14)}
                    color={COLORS.green}
                    style={{
                        marginRight: scale(10)
                    }}
                />
                <Text
                    style={{
                        flex: 1,
                        lineHeight: scale(20),
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
                            // textTransform: 'uppercase',
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
            style={{ backgroundColor: '#007739' }}
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
                    alt="image"
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
                            color: '#fff',
                            lineHeight: scale(20)
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
                    size={scale(120)}
                    name={fullName}
                    userId={data?.mentor?.id}
                />
                <Text
                    bold
                    style={{
                        fontSize: scale(18),
                        color: '#0E564D',
                        marginTop: scale(10),
                        lineHeight: scale(20)
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
                        marginTop: scale(8),
                        lineHeight: scale(20),
                        paddingHorizontal: 5
                    }}>
                    <Link color="#0E564D" width={16} />{' '}
                    {data?.mentor?.department}
                </Text>
                <Text
                    style={{
                        fontSize: scale(16),
                        color: '#6C746E',
                        marginTop: scale(8),
                        lineHeight: scale(20),
                        paddingHorizontal: 5
                    }}>
                    <Package color="#0E564D" width={16} />{' '}
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
