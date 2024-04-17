import { getGlobalState, useGlobalState } from 'app/Store'
import { Avatar, Text } from 'app/atoms'
import { COLORS, ROUTES } from 'app/constants'
import { scale } from 'app/helpers/responsive'
import { clearDataAfterLogout, getData, isAndroid } from 'app/helpers/utils'
import {
    svgAchievement,
    svgCalendarOffline,
    svgCanceled,
    svgClose,
    svgConfirmed,
    svgIconCharts,
    svgMyCourse,
    svgMyMeeting,
    svgWaitingConfirm,
    svgWhiteCart
} from 'assets/svg'
import React, { useEffect, useState } from 'react'

import { useNavigation } from '@react-navigation/native'
import {
    Image,
    ImageBackground,
    Linking,
    Pressable,
    ScrollView,
    StatusBar,
    StyleSheet,
    View
} from 'react-native'
import {
    Book,
    ChevronRight,
    CreditCard,
    DollarSign,
    Edit,
    HelpCircle,
    Info,
    LogOut,
    Shield,
    SkipBack
} from 'react-native-feather'
import Modal from 'react-native-modal'
import { SvgXml } from 'react-native-svg'

import MenuAction from 'app/components/menu-action'

const Menu = ({ route }) => {
    const navigation = useNavigation()
    const [visibleWarning, setVisibleWarning] = useState(false)
    const [visibleComingSoon, setVisibleComingSoon] = useState(false)
    const userInfo = getGlobalState('userInfo')
    const dashboardInfo = getGlobalState('dashboardInfo')
    const [carts, setCarts] = useGlobalState('carts')

    const getCarts = async () => {
        const carts = await getData('@cart')
        setCarts(carts || [])
    }

    useEffect(() => {
        getCarts()
    }, [route])

    const menus = [
        // {
        //     title: 'Đã yêu thích',
        //     icon: <Heart stroke="#52B553" width={18} height={18} />,
        //     onPress: () => navigation.navigate(ROUTES.Wishlist)
        // },
        {
            title: 'Thông tin cá nhân',
            icon: <Edit stroke="#52B553" width={18} height={18} />,
            onPress: () => navigation.navigate(ROUTES.ProfileInfo)
        },
        {
            title: 'Lịch sử giao dịch',
            icon: <DollarSign stroke="#52B553" width={18} height={18} />,
            onPress: () => navigation.navigate(ROUTES.TransactionList)
        },
        // {
        //     title: 'Lan tỏa tri thức',
        //     icon: <Radio stroke="#52B553" width={18} height={18} />,
        //     onPress: () => setVisibleWarning(true)
        // },
        {
            title: 'Trợ giúp và hỗ trợ',
            icon: <HelpCircle stroke="#52B553" width={18} height={18} />,
            onPress: () => navigation.navigate(ROUTES.Support)
        },
        {
            title: 'Phương thức thanh toán',
            icon: <CreditCard stroke="#52B553" width={18} height={18} />,
            onPress: () =>
                Linking.openURL('https://smarte.edu.vn/phuong-thuc-thanh-toan')
        },
        {
            title: 'Chính sách điều khoản',
            icon: <Book stroke="#52B553" width={18} height={18} />,
            onPress: () =>
                Linking.openURL('https://smarte.edu.vn/chinh-sach-dieu-khoan')
        },
        {
            title: 'Chính sách bảo mật',
            icon: <Shield stroke="#52B553" width={18} height={18} />,
            onPress: () =>
                Linking.openURL('https://smarte.edu.vn/chinh-sach-bao-mat')
        },
        {
            title: 'Chính sách hoàn/hủy',
            icon: <SkipBack stroke="#52B553" width={18} height={18} />,
            onPress: () =>
                Linking.openURL('https://smarte.edu.vn/chinh-sach-hoan-huy')
        },
        {
            title: 'Thông tin ứng dụng',
            icon: <Info stroke="#52B553" width={18} height={18} />,
            onPress: () => navigation.navigate(ROUTES.Language)
        },
        {
            title: 'Đăng xuất',
            icon: <LogOut stroke="#52B553" width={18} height={18} />,
            onPress: () => clearDataAfterLogout()
        }
    ]

    const closeModal = () => setVisibleWarning(false)

    const modalComingSoon = (
        <Modal
            isVisible={visibleComingSoon}
            onBackButtonPress={() => setVisibleComingSoon(false)}
            onBackdropPress={() => setVisibleComingSoon(false)}>
            <View
                style={{
                    backgroundColor: '#fff',
                    borderRadius: scale(5),
                    paddingBottom: scale(28)
                }}>
                <Image
                    source={require('assets/images/warning.png')}
                    style={{
                        width: scale(135),
                        height: scale(135),
                        alignSelf: 'center',
                        marginTop: -scale(80)
                    }}
                    resizeMode="contain"
                    alt="image"
                />
                <Pressable
                    onPress={() => setVisibleComingSoon(false)}
                    hitSlop={15}
                    style={{
                        position: 'absolute',
                        top: -scale(50),
                        right: scale(10)
                    }}>
                    <SvgXml
                        xml={svgClose('#fff')}
                        width={scale(24)}
                        height={scale(24)}
                    />
                </Pressable>
                <Text
                    style={{
                        textAlign: 'center',
                        marginTop: scale(20),
                        fontSize: scale(16),
                        color: '#6C746E'
                    }}>
                    Tính năng này sẽ có mặt trong phiên bản tiếp theo
                </Text>
            </View>
        </Modal>
    )

    const renderMentorConnect = (
        <View
            style={{
                backgroundColor: '#fff',
                paddingVertical: scale(16)
            }}>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingLeft: scale(16)
                }}>
                <Text bold style={styles.formTitleText}>
                    KẾT NỐI GIẢNG VIÊN
                </Text>
                {/* <Pressable
            style={{
                flexDirection: 'row',
                alignItems: 'center',
            }}
            onPress={() =>
                navigation.navigate(ROUTES.ConnectInstructors, {
                    initTab: 0,
                })
            }
        >
            <Text style={styles.formViewMoreText}>
                Xem lịch sử kết nối
            </Text>
            <ChevronRightIcon size={scale(24)} />
        </Pressable> */}
            </View>
            <View
                style={{
                    marginTop: scale(12),
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>
                <MenuAction
                    icon={svgWaitingConfirm}
                    title="Chờ xác nhận"
                    // description="03 lịch chờ"
                    backgroundColor="#EBFFFB"
                    // badge={3}
                    onPress={() =>
                        navigation.navigate(ROUTES.ConnectInstructors, {
                            initTab: 0
                        })
                    }
                />
                <MenuAction
                    icon={svgConfirmed}
                    title="Đã xác nhận"
                    // description="02 lịch học"
                    backgroundColor="#EBFFFB"
                    // badge={2}
                    onPress={() =>
                        navigation.navigate(ROUTES.ConnectInstructors, {
                            initTab: 1
                        })
                    }
                />
                <MenuAction
                    icon={svgCanceled}
                    title="Đã hủy"
                    // description="01 mục"
                    backgroundColor="#EBFFFB"
                    onPress={() =>
                        navigation.navigate(ROUTES.ConnectInstructors, {
                            initTab: 2
                        })
                    }
                />
            </View>
        </View>
    )

    return (
        <View style={{ flex: 1, backgroundColor: '#F0F1F6' }}>
            <StatusBar barStyle="light-content" />
            <ImageBackground
                source={require('assets/images/menu-header.jpg')}
                style={{
                    width: '100%',
                    height: scale(161),
                    justifyContent: 'center'
                }}>
                <View style={{ padding: scale(16) }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                        <Avatar userId={userInfo?.id} size={scale(60)} />
                        <View
                            style={{
                                marginLeft: scale(10)
                            }}>
                            <Text
                                style={{
                                    fontSize: 20,
                                    color: '#fff'
                                }}>
                                {userInfo?.first_name +
                                    ' ' +
                                    userInfo?.last_name}
                            </Text>
                            <Pressable
                                style={{ marginTop: scale(8) }}
                                onPress={() =>
                                    navigation.navigate(ROUTES.Overview)
                                }>
                                <Text
                                    style={{
                                        fontSize: scale(14),
                                        color: '#E1E1E1'
                                    }}>
                                    Đến trang tổng quan của bạn
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
                {isAndroid && (
                    <Pressable
                        style={{
                            position: 'absolute',
                            bottom: scale(16),
                            right: scale(16),
                            backgroundColor: COLORS.green,
                            width: scale(44),
                            height: scale(44),
                            borderRadius: scale(44),
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderWidth: 1,
                            borderColor: '#fff'
                        }}
                        onPress={() => navigation.navigate(ROUTES.Carts)}>
                        <SvgXml
                            xml={svgWhiteCart}
                            width={scale(26)}
                            height={scale(26)}
                        />
                        <View
                            style={{
                                position: 'absolute',
                                width: scale(18),
                                height: scale(18),
                                borderRadius: scale(18),
                                backgroundColor: '#F13642',
                                top: -scale(3),
                                right: -scale(3),
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                            <Text
                                style={{
                                    fontSize: scale(10),
                                    color: '#fff'
                                }}>
                                {carts?.length || 0}
                            </Text>
                        </View>
                    </Pressable>
                )}
            </ImageBackground>
            <ScrollView
                contentContainerStyle={{ paddingBottom: 20 }}
                showsVerticalScrollIndicator={false}>
                <View
                    style={{
                        backgroundColor: '#fff',
                        paddingVertical: scale(16)
                    }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingLeft: scale(16)
                        }}>
                        <Text bold style={styles.formTitleText}>
                            HỌC TẬP
                        </Text>
                        <Pressable
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}
                            onPress={() =>
                                navigation.navigate(ROUTES.LearningHistory)
                            }>
                            <Text bold style={styles.formViewMoreText}>
                                Xem quá trình học tập
                            </Text>
                            <ChevronRight width={scale(18)} color="#A3A3A3" />
                        </Pressable>
                    </View>
                    <View
                        style={{
                            // marginTop: scale(12),
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            flexWrap: 'wrap'
                        }}>
                        <MenuAction
                            icon={svgMyCourse}
                            title="KH của tôi"
                            description="xem khóa học"
                            backgroundColor="#E5FEEC"
                            onPress={() =>
                                navigation.navigate(ROUTES.CoursesByUser, {
                                    userId: null
                                })
                            }
                        />

                        {/* Nếu chưa đăng ký Chuỗi khóa học 12 kỹ năng thì không hiện */}

                        <MenuAction
                            icon={svgMyCourse}
                            title="KH theo lộ trình"
                            backgroundColor="#E5FEEC"
                            onPress={() =>
                                navigation.navigate(ROUTES.Course12Skill, {
                                    userId: null
                                })
                            }
                        />

                        {/*  */}
                        <MenuAction
                            icon={svgCalendarOffline}
                            title="KH yêu thích"
                            // description="02 Lịch học"
                            backgroundColor="#E8F9FE"
                            onPress={() => navigation.navigate(ROUTES.Wishlist)}
                        />
                        {/* <MenuAction
                            icon={svgMyMeeting}
                            title="Bạn bè"
                            // description="02 lịch học"
                            backgroundColor="#FFF4F0"
                            // badge={2}
                            onPress={() =>
                                navigation.navigate(ROUTES.Friends, {
                                    userId: null
                                })
                            }
                        /> */}
                        <MenuAction
                            icon={svgAchievement}
                            title="Chứng chỉ"
                            backgroundColor="#FFF8E3"
                            onPress={() =>
                                navigation.navigate(ROUTES.CertificateList)
                            }
                        />
                        <MenuAction
                            icon={svgMyMeeting}
                            title="Bạn bè"
                            backgroundColor="#FFF4F0"
                            onPress={() =>
                                navigation.navigate(ROUTES.Friends, {
                                    userId: null
                                })
                            }
                        />
                        {/* Nếu chưa đăng ký Chuỗi khóa học 12 kỹ năng thì không hiện */}
                        {dashboardInfo?.showLeaderboard ? (
                            <MenuAction
                                icon={svgIconCharts}
                                title="Bảng xếp hạng"
                                // badge={12}
                                onPress={() =>
                                    navigation.navigate(ROUTES.Leaderboard)
                                }
                                description="Lộ trình khoá học"
                                backgroundColor="#E5FEEC"
                            />
                        ) : null}
                    </View>
                </View>

                {isAndroid ? renderMentorConnect : null}
                {/* <View
                    style={{
                        backgroundColor: '#fff',
                        paddingVertical: scale(16)
                    }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingLeft: scale(16)
                        }}>
                        <Text style={styles.formTitleText}>
                            TIỆN ÍCH CỦA TÔI
                        </Text>
                    </View>
                    <View
                        style={{
                            marginTop: scale(12),
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}>
                        <MenuAction
                            icon={svgWallet}
                            title="Quản lý ví"
                            // description="03 khóa học"
                            backgroundColor="#FFF5E2"
                            onPress={() => setVisibleComingSoon(true)}
                        />
                        <MenuAction
                            icon={svgCoin}
                            title="Quản lý SE xu"
                            // description="02 lịch học"
                            backgroundColor="#FFF9CE"
                            onPress={() => setVisibleComingSoon(true)}
                        />
                        <MenuAction
                            icon={svgVoucher}
                            title="Kho voucher"
                            // description="01 mục"
                            backgroundColor="#FFF0F4"
                            onPress={() => setVisibleComingSoon(true)}
                        />
                    </View>
                </View> */}
                {/* <View
                    style={{
                        backgroundColor: '#fff',
                        paddingVertical: scale(16)
                    }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingLeft: scale(16)
                        }}>
                        <Text style={styles.formTitleText}>KHÁC</Text>
                    </View>
                    <View
                        style={{
                            marginTop: scale(12),
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}>
                        <MenuAction
                            icon={svgInternalNews}
                            title="Tin tức"
                            // description="03 khóa học"
                            backgroundColor="#EAF0FF"
                            // badge={23}
                            onPress={() => setVisibleComingSoon(true)}
                        />
                        <MenuAction
                            icon={svgMyMeeting}
                            title="Bạn bè"
                            // description="02 lịch học"
                            backgroundColor="#FFF4F0"
                            // badge={2}
                            onPress={() =>
                                navigation.navigate(ROUTES.Friends, {
                                    userId: null
                                })
                            }
                        />
                        <MenuAction
                            icon={svgExamination}
                            title="Kỳ thi"
                            // description="01 mục"
                            backgroundColor="#E5FEEC"
                            // badge={5}
                            onPress={() => setVisibleComingSoon(true)}
                        />
                    </View> 
                        </View>*/}

                {/* <View
                    style={{
                        backgroundColor: '#fff',
                        paddingVertical: scale(16)
                    }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingLeft: scale(16)
                        }}>
                        <Text bold style={styles.formTitleText}>
                            KHÁC
                        </Text>
                    </View>
                    <View
                        style={{
                            marginTop: scale(12),
                            flexDirection: 'row'
                            // justifyContent: 'start'
                        }}>
                        <MenuAction
                            icon={svgMyMeeting}
                            title="Bạn bè"
                            backgroundColor="#FFF4F0"
                            onPress={() =>
                                navigation.navigate(ROUTES.Friends, {
                                    userId: null
                                })
                            }
                        />
                {/*  */}
                {/* </View> */}
                {/* </View> */}
                <Pressable
                    onPress={() =>
                        navigation.navigate(ROUTES.ProfileOverview, {
                            userId: userInfo?.id
                        })
                    }>
                    <Image
                        source={require('assets/images/menu-banner.jpg')}
                        style={{
                            width: '100%',
                            height: scale(170)
                        }}
                        alt="image"
                    />
                </Pressable>
                <View style={{ backgroundColor: '#fff' }}>
                    {menus?.map(item => {
                        return (
                            <Pressable
                                key={item?.title}
                                style={{
                                    padding: scale(20),
                                    flexDirection: 'row',
                                    borderBottomWidth: 1,
                                    borderBottomColor: '#eee'
                                }}
                                onPress={item.onPress}>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center'
                                    }}>
                                    {typeof item?.icon === 'string' ||
                                    item?.icon instanceof String ? (
                                        <SvgXml
                                            xml={item.icon}
                                            width={scale(24)}
                                            height={scale(24)}
                                        />
                                    ) : (
                                        item.icon
                                    )}

                                    <Text style={styles.actionText}>
                                        {item.title}
                                    </Text>
                                </View>
                                {/* <ChevronRightIcon
                                    size={22}
                                    style={{ color: '#ccc' }}
                                /> */}
                            </Pressable>
                        )
                    })}
                </View>
            </ScrollView>
            <Modal
                isVisible={visibleWarning}
                onBackButtonPress={closeModal}
                onBackdropPress={closeModal}>
                <View
                    style={{
                        backgroundColor: '#fff',
                        borderRadius: scale(5),
                        paddingBottom: scale(28)
                    }}>
                    <Image
                        source={require('assets/images/warning.png')}
                        style={{
                            width: scale(135),
                            height: scale(135),
                            alignSelf: 'center',
                            marginTop: -scale(80)
                        }}
                        resizeMode="contain"
                        alt="image"
                    />
                    <Pressable
                        onPress={closeModal}
                        hitSlop={15}
                        style={{
                            position: 'absolute',
                            top: -scale(50),
                            right: scale(10)
                        }}>
                        <SvgXml
                            xml={svgClose('#fff')}
                            width={scale(24)}
                            height={scale(24)}
                        />
                    </Pressable>
                    <Text
                        style={{
                            textAlign: 'center',
                            marginTop: scale(20),
                            lineHeight: scale(20),
                            fontSize: scale(16),
                            color: '#6C746E'
                        }}>
                        Vui lòng dùng{' '}
                        <Text style={{ color: COLORS.green }}>máy tính</Text> để
                        thực hiện chức năng này
                    </Text>
                </View>
            </Modal>
            {modalComingSoon}
        </View>
    )
}

const styles = StyleSheet.create({
    formTitleText: {
        fontSize: scale(16),
        color: '#0E564D',
        letterSpacing: 0.7,
        paddingTop: scale(5)
    },
    actionText: {
        fontSize: scale(16),
        color: '#0E564D',
        marginLeft: scale(10),
        lineHeight: scale(18)
    }
})

export default Menu
