import { Text } from 'app/atoms'
import { scale } from 'app/helpers/responsive'
import { svgClock, svgCredit, svgTabCourse, svgUser } from 'assets/svg'
import React from 'react'

import { Pressable, View } from 'react-native'
import Modal from 'react-native-modal'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SvgXml } from 'react-native-svg'

const MenuUser = ({
    userId,
    visible,
    navigation,
    onBackPress,
    onDropPress,
    setVisible
}) => {
    const menus = [
        {
            icon: svgUser,
            title: 'Thông tin cá nhân',
            onPress: () => navigation.navigate('Profile')
        },
        {
            icon: svgTabCourse('#000000'),
            title: 'Khóa học hiện có',
            onPress: () =>
                navigation.navigate(ROUTES.CoursesByUser, {
                    userId
                })
        },
        {
            icon: svgCredit,
            title: 'Chứng chỉ',
            onPress: () =>
                navigation.navigate(ROUTES.CertificateList, {
                    userId
                })
        },
        {
            icon: svgClock,
            title: 'Quá trình học tập',
            onPress: () => navigation.navigate(ROUTES.LearningHistory)
        }
        // {
        //     icon: svgUser,
        //     title: 'Bạn bè',
        //     onPress: () =>
        //         navigation.navigate(ROUTES.Friends, {
        //             userId
        //         })
        // }
    ]

    return (
        <Modal
            style={{ margin: 0, justifyContent: 'flex-end' }}
            isVisible={visible}
            onBackButtonPress={onBackPress}
            onBackdropPress={onDropPress}>
            <View
                style={{
                    backgroundColor: '#fff',
                    paddingTop: scale(24)
                }}>
                <SafeAreaView>
                    <View style={{ paddingLeft: scale(16) }}>
                        {menus?.map((item, index) => (
                            <Pressable
                                style={{ paddingTop: scale(12) }}
                                key={index}
                                onPress={() => {
                                    setVisible(false)
                                    item.onPress()
                                }}>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center'
                                    }}>
                                    <SvgXml
                                        xml={item?.icon}
                                        width={scale(21)}
                                        height={scale(21)}
                                        style={{ color: '#000' }}
                                    />
                                    <Text
                                        style={{
                                            fontSize: scale(17),
                                            marginLeft: scale(15),
                                            flex: 1,
                                            color: '#000'
                                        }}>
                                        {item?.title}
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        marginTop: scale(10)
                                    }}>
                                    <View style={{ width: scale(21) }} />
                                    <View
                                        style={{
                                            flex: 1,
                                            marginLeft: scale(15),
                                            height: 1,
                                            backgroundColor: '#ddd'
                                        }}
                                    />
                                </View>
                            </Pressable>
                        ))}
                    </View>
                </SafeAreaView>
            </View>
        </Modal>
    )
}

export default MenuUser
