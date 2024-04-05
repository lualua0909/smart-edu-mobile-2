import { Button } from 'app/atoms'
import React from 'react'

import { useNavigation } from '@react-navigation/native'
import { Award, BookOpen, ChevronDown } from 'react-native-feather'

import { Menu } from 'native-base'

const MenuUser = ({ userId }) => {
    const navigation = useNavigation()

    const menus = [
        // {
        //     icon: <List color="#1F2937" width={16} height={16} />,
        //     title: 'Thông tin cá nhân',
        //     onPress: () => navigation.navigate('Profile')
        // },
        {
            icon: <BookOpen color="#1F2937" width={16} height={16} />,
            title: 'Khóa học hiện có',
            onPress: () =>
                navigation.navigate('MyCourses', {
                    userId
                })
        },
        {
            icon: <Award color="#1F2937" width={16} height={16} />,
            title: 'Chứng chỉ',
            onPress: () =>
                navigation.navigate('MyCertificates', {
                    userId
                })
        }
        // {
        //     icon: <Calendar color="#1F2937" width={16} height={16} />,
        //     title: 'Quá trình học tập',
        //     onPress: () => navigation.navigate('LearningHistory')
        // }
        // {
        //     icon: <Users color="#1F2937" width={16} height={16} />,
        //     title: 'Bạn bè',
        //     onPress: () => navigation.navigate('FriendList')
        // }
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
                        <ChevronDown color="#1F2937" width={16} height={16} />
                    }
                    {...triggerProps}>
                    Xem thêm thông tin
                </Button>
            )}>
            {menus?.map((item, index) => (
                <Menu.Item onPress={() => item?.onPress()} key={item?.title}>
                    {item?.icon} {item?.title}
                </Menu.Item>
            ))}
        </Menu>
    )
}

export default MenuUser
