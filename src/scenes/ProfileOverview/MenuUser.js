import { Select } from 'app/atoms'
import { Text } from 'app/atoms'
import React from 'react'

import { useNavigation } from '@react-navigation/native'
import { Pressable } from 'react-native'
import { Calendar, Users } from 'react-native-feather'

const MenuUser = ({ userId }) => {
    const navigation = useNavigation()
    const menus = [
        // {
        //     icon: <List color="#1F2937" width={16} height={16} />,
        //     title: 'Thông tin cá nhân',
        //     onPress: () => navigation.navigate('Profile')
        // },
        {
            title: 'Khóa học hiện có',
            onPress: () =>
                navigation.navigate('MyCourses', {
                    userId
                })
        },
        {
            title: 'Chứng chỉ',
            onPress: () =>
                navigation.navigate('MyCertificates', {
                    userId
                })
        },
        {
            title: 'Quá trình học tập',
            onPress: () => navigation.navigate('LearningHistory')
        },
        {
            title: 'Bạn bè',
            onPress: () =>
                navigation.navigate('FriendList', {
                    userId
                })
        }
    ]

    return (
        <Select
            placeholder="Xem thêm thông tin"
            data={menus}
            displayItem={(item, index, isSelected) => {
                return (
                    <Pressable onPress={() => menus[index]?.onPress()}>
                        <Text style={{ color: '#fff' }}>{item?.title}</Text>
                    </Pressable>
                )
            }}
        />
    )
}

export default MenuUser
