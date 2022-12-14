import { Avatar } from 'app/atoms'
import { ROUTES } from 'app/constants'
import { scale } from 'app/helpers/responsive'
import React from 'react'

import { useNavigation } from '@react-navigation/native'
import { Pressable, View } from 'react-native'
import { Star } from 'react-native-feather'

import { Center, HStack } from 'native-base'
import { Text } from 'native-base'

const TeacherItem = ({ item, index }) => {
    const navigation = useNavigation()
    const fullName = `${item?.first_name} ${item?.last_name}`

    return (
        <Pressable
            key={index}
            onPress={() =>
                navigation.navigate(ROUTES.TeacherInfo, { id: item?.id })
            }
            style={{ flexDirection: 'row', marginBottom: scale(16) }}>
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
                        style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Star
                            stroke="orange"
                            fill="orange"
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
                            color: '#000',
                            marginLeft: scale(4)
                        }}>
                        Vi???t Nam
                    </Text>
                </View>
            </View>
            <View style={{ flex: 1, marginLeft: scale(9) }}>
                <Text
                    numberOfLines={1}
                    style={{
                        fontSize: scale(18),
                        color: '#1F1F1F'
                    }}>
                    {fullName}
                </Text>
                {/* <View
                    style={{
                        paddingVertical: scale(4),
                        marginTop: scale(4),
                        alignSelf: 'flex-start',
                    }}
                >
                    <Badge colorScheme="success" variant="outline">
                        {item?.department}
                    </Badge>
                </View> */}

                <HStack space={3}>
                    <Text
                        numberOfLines={2}
                        style={{
                            fontSize: scale(14),
                            color: '#6C746E',
                            marginTop: scale(4)
                        }}>
                        {item?.department}
                    </Text>
                </HStack>
                <HStack space={3}>
                    <Text
                        numberOfLines={2}
                        style={{
                            fontSize: scale(14),
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
                        alignSelf: 'flex-end',
                    }}
                >
                    <Text
                        style={{
                            
                            fontSize: scale(16),
                            color: '#6C746E',
                            textDecorationLine: 'line-through',
                        }}
                    >
                        {toCurrency(1234567)}??
                    </Text>
                    <Text
                        style={{
                            
                            fontSize: scale(16),
                            color: '#52B553',
                            marginLeft: scale(8),
                        }}
                    >
                        {toCurrency(1234567)}?? / 30p
                    </Text>
                </View> */}
            </View>
        </Pressable>
    )
}

export default TeacherItem
