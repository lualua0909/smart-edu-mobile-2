import React from 'react'
import { View, Text, Pressable } from 'react-native'
import { scale } from 'app/helpers/responsive'
import { toCurrency } from 'app/helpers/utils'
import { SvgXml } from 'react-native-svg'
import { svgOrangeStar } from 'assets/svg'
import { useNavigation } from '@react-navigation/native'
import { FONTS, ROUTES } from 'app/constants'
import { Avatar } from 'app/atoms'
import { HStack, Center } from 'native-base'
import { Star } from 'react-native-feather'

const TeacherItem = ({ item, index }) => {
    const navigation = useNavigation()
    const fullName = `${item?.first_name} ${item?.last_name}`

    return (
        <Pressable
            key={index}
            onPress={() =>
                navigation.navigate(ROUTES.TeacherInfo, { id: item?.id })
            }
            style={{ flexDirection: 'row', marginBottom: scale(16) }}
        >
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
                        opacity: 0.7,
                    }}
                >
                    <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                        <Star
                            stroke="orange"
                            fill="orange"
                            width={scale(16)}
                            height={scale(16)}
                        />
                        <Text
                            style={{
                                fontFamily: FONTS.MulishSemiBold,
                                fontSize: scale(12),
                                color: '#000',
                                marginLeft: scale(4),
                            }}
                        >
                            5.0
                        </Text>
                    </View>
                    <Text
                        style={{
                            fontFamily: FONTS.MulishSemiBold,
                            fontSize: scale(12),
                            color: '#000',
                            marginLeft: scale(4),
                        }}
                    >
                        Việt Nam
                    </Text>
                </View>
            </View>
            <View style={{ flex: 1, marginLeft: scale(9) }}>
                <Text
                    numberOfLines={1}
                    style={{
                        fontFamily: FONTS.MulishBold,
                        fontSize: scale(18),
                        color: '#1F1F1F',
                    }}
                >
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
                            fontFamily: FONTS.Mulish,
                            fontSize: scale(14),
                            color: '#6C746E',
                            marginTop: scale(4),
                        }}
                    >
                        {item?.department}
                    </Text>
                </HStack>
                <HStack space={3}>
                    <Text
                        numberOfLines={2}
                        style={{
                            fontFamily: FONTS.Mulish,
                            fontSize: scale(14),
                            color: '#6C746E',
                            marginTop: scale(4),
                        }}
                    >
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
                            fontFamily: FONTS.Mulish,
                            fontSize: scale(16),
                            color: '#6C746E',
                            textDecorationLine: 'line-through',
                        }}
                    >
                        {toCurrency(1234567)}đ
                    </Text>
                    <Text
                        style={{
                            fontFamily: FONTS.MulishBold,
                            fontSize: scale(16),
                            color: '#52B553',
                            marginLeft: scale(8),
                        }}
                    >
                        {toCurrency(1234567)}đ / 30p
                    </Text>
                </View> */}
            </View>
        </Pressable>
    )
}

export default TeacherItem
