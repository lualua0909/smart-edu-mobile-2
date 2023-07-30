import { useGlobalState } from 'app/Store'
import { Avatar } from 'app/atoms'
import { ROUTES } from 'app/constants'
import { scale } from 'app/helpers/responsive'
import React, { useState } from 'react'

import { useNavigation } from '@react-navigation/native'
import { View } from 'react-native'
import { Star } from 'react-native-feather'

import { Badge, Center, HStack, Pressable, Text } from 'native-base'

const TeacherItem = ({ item, index }) => {
    const navigation = useNavigation()
    const fullName = `${item?.first_name} ${item?.last_name}`
    const [userInfo, setUserInfo] = useGlobalState('userInfo')
    const [visible, setVisible] = useGlobalState('visibleNotLogin')

    return (
        <Pressable
            key={index}
            onPress={() => {
                if (userInfo?.id === 'trial') {
                    setVisible(true)
                } else {
                    navigation.navigate(ROUTES.TeacherInfo, {
                        id: item?.id
                    })
                }
            }}
            style={{
                flexDirection: 'row',
                marginBottom: scale(8),
                borderColor: '#eee',
                borderWidth: 1,
                borderRadius: scale(16),
                padding: scale(8)
            }}>
            <View style={{ width: scale(114), height: scale(114) }}>
                <Center>
                    <Avatar isSquare name={fullName} userId={item?.id} />
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
                        <Star
                            stroke="orange"
                            fill="orange"
                            width={scale(16)}
                            height={scale(16)}
                        />
                        <Text
                            ml="1"
                            style={{
                                fontSize: scale(12),
                                color: '#000'
                            }}>
                            5
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
            <View style={{ flex: 1, marginLeft: scale(9) }}>
                <Text
                    numberOfLines={1}
                    style={{
                        fontSize: scale(16),
                        color: '#1F1F1F',
                        paddingTop: scale(5)
                    }}>
                    {fullName}
                </Text>
                <View
                    style={{
                        paddingVertical: scale(4),
                        marginTop: scale(4),
                        alignSelf: 'flex-start'
                    }}>
                    <Badge colorScheme="success" variant="subtle">
                        {item?.department}
                    </Badge>
                </View>
                <HStack space={3}>
                    <Text
                        numberOfLines={3}
                        style={{
                            fontSize: scale(12),
                            color: '#6C746E',
                            marginTop: scale(4)
                        }}>
                        {item?.position}
                    </Text>
                </HStack>
                {/* <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        alignSelf: 'flex-end'
                    }}>
                    <Text
                        style={{
                            fontSize: scale(16),
                            color: '#6C746E',
                            textDecorationLine: 'line-through'
                        }}>
                        {toCurrency(1234567)}đ
                    </Text>
                    <Text
                        style={{
                            fontSize: scale(16),
                            color: '#52B553',
                            marginLeft: scale(8)
                        }}>
                        {toCurrency(1234567)}đ / 30p
                    </Text>
                </View> */}
            </View>
        </Pressable>
    )
}

export default TeacherItem
