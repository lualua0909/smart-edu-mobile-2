import React from 'react'

import Ionicons from 'react-native-vector-icons/Ionicons'

import { Button, Menu } from 'native-base'

const MenuUser = ({ userId, navigation }) => {
    const menus = [
        {
            icon: <Ionicons name="person-circle" color="#aaa" size={18} />,
            title: 'Thông tin cá nhân',
            onPress: () => navigation.navigate('Profile')
        },
        {
            icon: <Ionicons name="server" color="#aaa" size={18} />,
            title: 'Khóa học hiện có',
            onPress: () =>
                navigation.navigate('MyCourses', {
                    userId
                })
        },
        {
            icon: <Ionicons name="school" color="#aaa" size={18} />,
            title: 'Chứng chỉ',
            onPress: () =>
                navigation.navigate('MyCertificates', {
                    userId
                })
        },
        {
            icon: <Ionicons name="ios-analytics" color="#aaa" size={18} />,
            title: 'Quá trình học tập',
            onPress: () => navigation.navigate('LearningHistory')
        },
        {
            icon: <Ionicons name="people-circle" color="#aaa" size={18} />,
            title: 'Bạn bè',
            onPress: () =>
                navigation.navigate('FriendList', {
                    userId
                })
        }
    ]
    return (
        <Menu
            trigger={triggerProps => (
                <Button
                    variant="ghost"
                    style={{ width: '50%' }}
                    _text={{
                        color: '#1F2937'
                    }}
                    endIcon={
                        <Ionicons
                            name="ios-chevron-down"
                            color="#1F2937"
                            size={16}
                        />
                    }
                    {...triggerProps}>
                    Xem thêm thông tin
                </Button>
            )}>
            {menus?.map((item, index) => (
                <Menu.Item onPress={() => item?.onPress()} key={index}>
                    {item?.icon} {item?.title}
                </Menu.Item>
            ))}
        </Menu>
    )
}

export default MenuUser
