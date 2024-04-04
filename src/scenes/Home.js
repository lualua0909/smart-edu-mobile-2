import axios from 'app/Axios'
import { setGlobalState, useGlobalState } from 'app/Store'
import { Avatar, Button, NoDataAnimation as NoData, Text } from 'app/atoms'
import CourseItem from 'app/components/CourseItem'
import HotMentors from 'app/components/HotMentors'
import { COLORS, COURSE_IMG_PATH, ROUTES, STYLES } from 'app/constants'
import { scale } from 'app/helpers/responsive'
import { clearDataAfterLogout } from 'app/helpers/utils'
import { svgList, svgOrangeStar, svgStudy } from 'assets/svg'
import React, { useEffect, useState } from 'react'

import { FlatList } from 'react-native'
import DeviceInfo from 'react-native-device-info'
import { Flag, Rss } from 'react-native-feather'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SvgXml } from 'react-native-svg'
import { ScrollView } from 'react-native-virtualized-view'

import {
    Box,
    Center,
    Image,
    Modal,
    Pressable,
    Progress,
    View
} from 'native-base'

const Home = ({ navigation }) => {
    const [userInfo, setUserState] = useGlobalState('userInfo')
    const [dashboardInfo, setDashboardInfo] = useGlobalState('dashboardInfo')
    const [homeInfo, setHomeInfo] = useGlobalState('homeInfo')
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        if (userInfo?.id !== 'trial') {
            axios.get('courses/get-list-in-dashboard').then(res => {
                if (res.data.status === 200) {
                    setDashboardInfo(res?.data)
                }
            })
        }
    }, [userInfo])

    useEffect(() => {
        axios.get('homepage-info/iOS').then(res => {
            setHomeInfo(res?.data?.data)
        })
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <SafeAreaView edges={['top']} style={{ flex: 1 }}>
                <Pressable
                    onPress={() =>
                        userInfo?.id !== 'trial'
                            ? navigation.navigate(ROUTES.Overview)
                            : null
                    }
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingVertical: scale(5),
                        paddingHorizontal: scale(16)
                    }}>
                    {userInfo?.id !== 'trial' ? (
                        <Avatar
                            userId={userInfo?.id}
                            name={
                                userInfo?.first_name + ' ' + userInfo?.last_name
                            }
                        />
                    ) : null}
                    <View style={{ marginLeft: scale(16), flex: 1 }}>
                        <Text
                            style={{
                                fontSize: 16,
                                color: '#6C746E'
                            }}>
                            Xin chào,{' '}
                            <Text
                                bold
                                style={{
                                    color: '#0EBF46'
                                }}>
                                {userInfo?.id === 'trial'
                                    ? 'bạn đến với Smart Training'
                                    : userInfo?.last_name}
                            </Text>
                        </Text>
                        {userInfo?.id === 'trial' ? (
                            <Button
                                size="md"
                                width={200}
                                mt={2}
                                onPress={clearDataAfterLogout}>
                                Đến trang đăng nhập
                            </Button>
                        ) : (
                            <Text
                                style={{
                                    fontSize: 16,
                                    color: '#6C746E',
                                    marginTop: scale(4)
                                }}>
                                Đến{' '}
                                <Text style={{ color: '#0EBF46' }}>
                                    trang tổng quan
                                </Text>
                            </Text>
                        )}
                    </View>
                </Pressable>
                <ScrollView
                    contentContainerStyle={{
                        paddingBottom: scale(30)
                    }}>
                    {userInfo?.id !== 'trial' ? (
                        <Section
                            title="DUY TRÌ HỌC TẬP"
                            svgIcon={svgStudy}
                            list={dashboardInfo?.continue_courses}
                            renderItem={({ item, index }) => (
                                <Pressable
                                    key={index}
                                    onPress={() =>
                                        navigation.navigate(ROUTES.CourseInfo, {
                                            id: item?.id
                                        })
                                    }>
                                    <View
                                        style={{
                                            paddingRight: scale(8),
                                            marginBottom: scale(16)
                                        }}>
                                        <View
                                            style={[
                                                {
                                                    flexDirection: 'row',
                                                    paddingTop: scale(8),
                                                    paddingBottom: scale(8),
                                                    paddingRight: scale(3),
                                                    paddingLeft: scale(6),
                                                    borderRadius: scale(5)
                                                },
                                                STYLES.boxShadow
                                            ]}>
                                            <View
                                                style={{
                                                    flex: 1,
                                                    marginRight: scale(4),
                                                    justifyContent:
                                                        'space-between',
                                                    paddingBottom: scale(7)
                                                }}>
                                                <Text
                                                    numberOfLines={2}
                                                    style={{
                                                        fontSize: scale(12),
                                                        color: '#6C746E',
                                                        width: 200
                                                    }}>
                                                    {item?.title}
                                                </Text>
                                                <View
                                                    style={{
                                                        marginTop: scale(15)
                                                    }}>
                                                    <Box w="80%" maxW="400">
                                                        <Progress
                                                            colorScheme="green"
                                                            value={
                                                                item?.process
                                                            }
                                                        />
                                                        <Text
                                                            style={{
                                                                fontSize:
                                                                    scale(12),
                                                                color: '#000'
                                                            }}>
                                                            {item?.process}%
                                                        </Text>
                                                    </Box>
                                                </View>
                                            </View>
                                            <Image
                                                resizeMode="cover"
                                                source={{
                                                    uri: `${COURSE_IMG_PATH}${item?.id}.webp`
                                                }}
                                                style={{
                                                    width: scale(89),
                                                    height: scale(89)
                                                }}
                                                alt="image"
                                            />
                                        </View>
                                    </View>
                                </Pressable>
                            )}
                        />
                    ) : null}

                    <Section
                        title="DANH SÁCH THỂ LOẠI"
                        svgIcon={svgList}
                        list={homeInfo?.course_groups}
                        renderItem={({ item, index }) => (
                            <Pressable
                                onPress={() =>
                                    navigation.navigate('CourseList', {
                                        courseGroupSelected: item?.id
                                    })
                                }>
                                <View
                                    key={index}
                                    style={{
                                        paddingRight: scale(8),
                                        marginBottom: scale(16)
                                    }}>
                                    <View
                                        style={[
                                            {
                                                flexDirection: 'row',
                                                paddingTop: scale(10),
                                                paddingLeft: scale(10),
                                                borderBottomWidth: scale(4),
                                                borderRadius: scale(5),
                                                borderBottomColor: COLORS.green
                                            },
                                            STYLES.boxShadow
                                        ]}>
                                        <View
                                            style={{
                                                flex: 1,
                                                marginRight: scale(4),
                                                justifyContent: 'space-between',
                                                paddingBottom: scale(7)
                                            }}>
                                            <Text
                                                bold
                                                numberOfLines={3}
                                                style={{
                                                    fontSize: scale(12),
                                                    color: '#6C746E',
                                                    width: 200
                                                }}>
                                                {item?.name}
                                            </Text>
                                        </View>
                                        <Image
                                            source={require('assets/images/people.jpg')}
                                            style={{
                                                width: scale(60),
                                                height: scale(89)
                                            }}
                                            alt="image"
                                        />
                                    </View>
                                </View>
                            </Pressable>
                        )}
                    />

                    <Section
                        title="KHÓA HỌC HOT"
                        icon={<Flag stroke="#0E564D" width={scale(22)} />}
                        list={homeInfo?.courses}
                        renderItem={({ item, index }) => (
                            <CourseItem
                                isHorizontal
                                index={index}
                                item={item}
                            />
                        )}
                    />

                    <Section
                        title="GIẢNG VIÊN NỔI BẬT"
                        icon={<Rss stroke="#0E564D" width={scale(22)} />}
                        list={homeInfo?.pinned_mentors}
                        renderItem={({ item, index }) => (
                            <Pressable
                                onPress={() => {
                                    if (userInfo?.id !== 'trial') {
                                        navigation.navigate(
                                            ROUTES.TeacherInfo,
                                            {
                                                id: item?.id
                                            }
                                        )
                                    } else {
                                        setGlobalState('visibleNotLogin', true)
                                    }
                                }}
                                style={[
                                    {
                                        width: scale(124),
                                        borderColor: '#d9d9d9',
                                        marginRight: scale(16),
                                        borderRadius: scale(5),
                                        borderBottomWidth: scale(6),
                                        borderBottomColor: COLORS.green
                                    },
                                    STYLES.boxShadow
                                ]}>
                                <View>
                                    <Center>
                                        <Avatar
                                            userId={item?.id}
                                            size={scale(124)}
                                            isSquare
                                        />
                                    </Center>
                                    <View
                                        style={{
                                            paddingHorizontal: scale(11),
                                            paddingVertical: scale(5),
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            width: '100%',
                                            position: 'absolute',
                                            bottom: 0,
                                            left: 0,
                                            backgroundColor: '#eee',
                                            opacity: 0.7
                                        }}>
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                alignItems: 'center'
                                            }}>
                                            <SvgXml
                                                xml={svgOrangeStar}
                                                width={scale(16)}
                                                height={scale(16)}
                                            />
                                            <Text
                                                style={{
                                                    fontSize: scale(12),
                                                    color: '#000',
                                                    marginLeft: scale(4)
                                                }}>
                                                5.0
                                            </Text>
                                        </View>
                                        <Text
                                            style={{
                                                fontSize: scale(12),
                                                color: '#000'
                                            }}>
                                            Việt Nam
                                        </Text>
                                    </View>
                                </View>
                                <View
                                    style={{
                                        paddingVertical: scale(7),
                                        paddingHorizontal: scale(11)
                                    }}>
                                    <Text
                                        style={{
                                            fontSize: scale(14),
                                            color: '#333'
                                        }}>
                                        {item?.first_name} {item?.last_name}
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: scale(12),
                                            color: '#333'
                                        }}>
                                        {item?.department}
                                    </Text>
                                </View>
                            </Pressable>
                        )}
                    />

                    <HotMentors data={homeInfo?.mentor_fields} />
                </ScrollView>
            </SafeAreaView>
            <UpdateAlert
                isOpen={showModal}
                onClose={() => setShowModal(false)}
            />
        </View>
    )
}

export default Home

const UpdateAlert = ({ isOpen, onClose }) => (
    <Modal isOpen={isOpen} onClose={onClose}>
        <Modal.Content maxWidth="400px">
            <Modal.CloseButton />
            <Modal.Header>Cập nhật phần mềm</Modal.Header>
            <Modal.Body>
                <Text>
                    Bạn cần cập nhật phiên bản mới nhất của ứng dụng để sử dụng
                    các tính năng mới nhất.
                </Text>
                <Text>Version hiện tại: {DeviceInfo.getReadableVersion()}</Text>
            </Modal.Body>
        </Modal.Content>
    </Modal>
)

const Section = ({ title, list, icon, svgIcon, renderItem }) => {
    return (
        <View
            style={{
                paddingVertical: scale(16)
            }}>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: scale(16)
                }}>
                {icon || <SvgXml xml={svgIcon} width={scale(22)} />}
                <Text
                    bold
                    style={{
                        letterSpacing: 0.5,
                        marginLeft: scale(8),
                        fontSize: scale(16),
                        color: '#0E564D',
                        paddingTop: scale(5)
                    }}>
                    {title}
                </Text>
            </View>
            {list?.length ? (
                <FlatList
                    data={list || []}
                    keyExtractor={(_, index) => index.toString()}
                    contentContainerStyle={{
                        paddingLeft: scale(16),
                        paddingTop: scale(16)
                    }}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    renderItem={renderItem}
                />
            ) : (
                <NoData />
            )}
        </View>
    )
}
