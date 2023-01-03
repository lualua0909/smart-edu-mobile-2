import { Avatar } from 'app/atoms'
import { scale } from 'app/helpers/responsive'
import { svgCompany, svgJob } from 'assets/svg'
import React from 'react'

import { useNavigation } from '@react-navigation/native'
import { Pressable, View } from 'react-native'
import { SvgXml } from 'react-native-svg'

import { Text } from 'native-base'

const FriendItem = ({ data }) => {
    const navigation = useNavigation()

    return (
        <>
            {data?.map((item, index) => {
                const fullName = `${item?.first_name} ${item?.last_name}`
                return (
                    <View
                        style={{
                            paddingBottom: scale(10),
                            backgroundColor: '#fff',
                            borderWidth: 1,
                            marginLeft: scale(10),
                            marginRight: scale(10),
                            marginTop: scale(10),
                            borderRadius: scale(8),
                            borderColor: '#B8BEC8'
                        }}
                        key={index}>
                        <Pressable
                            style={{
                                flexDirection: 'row',
                                margin: scale(10)
                            }}
                            onPress={() =>
                                navigation.navigate(ROUTES.ProfileOverview, {
                                    userId: item?.id
                                })
                            }>
                            <View
                                style={{
                                    width: scale(70),
                                    height: scale(70),
                                    margin: scale(15)
                                }}>
                                <Avatar userId={item?.id} name={fullName} />
                            </View>
                            <View style={{ flex: 1, marginLeft: scale(9) }}>
                                <Text
                                    numberOfLines={1}
                                    style={{
                                        fontSize: scale(16),
                                        color: '#1F1F1F'
                                    }}>
                                    {fullName}
                                </Text>
                                <Pressable
                                    style={{
                                        paddingVertical: scale(4),
                                        borderRadius: scale(5),
                                        marginTop: scale(4),
                                        alignItems: 'center',
                                        alignSelf: 'flex-start'
                                    }}>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            alignSelf: 'flex-start',
                                            marginTop: scale(10)
                                        }}>
                                        <SvgXml
                                            xml={svgJob}
                                            width={scale(18)}
                                        />
                                        <Text
                                            style={{
                                                fontSize: scale(16),
                                                color: '#6C746E',
                                                marginLeft: scale(8)
                                            }}>
                                            {item?.position}
                                        </Text>
                                    </View>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            alignSelf: 'flex-start',
                                            marginTop: scale(8)
                                        }}>
                                        <SvgXml
                                            xml={svgCompany}
                                            width={scale(18)}
                                        />
                                        <Text
                                            style={{
                                                fontSize: scale(16),
                                                color: '#6C746E',
                                                marginLeft: scale(8)
                                            }}>
                                            {item?.partner}
                                        </Text>
                                    </View>
                                </Pressable>
                            </View>
                        </Pressable>
                        {item?.isfriend && (
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                <Pressable
                                    style={{
                                        borderWidth: 1,
                                        borderColor: '#6C746E',
                                        width: '30%',
                                        alignContent: 'center',
                                        alignItems: 'center',
                                        marginRight: scale(5),
                                        borderRadius: scale(5)
                                    }}>
                                    <Text
                                        style={{
                                            fontSize: scale(16),
                                            color: '#363E57',
                                            padding: scale(5)
                                        }}>
                                        Xóa lời mời
                                    </Text>
                                </Pressable>
                                <Pressable
                                    style={{
                                        borderWidth: 1,
                                        borderColor: '#0B46A9',
                                        width: '30%',
                                        alignContent: 'center',
                                        alignItems: 'center',
                                        marginLeft: scale(5),
                                        backgroundColor: '#0B46A9',
                                        borderRadius: scale(5)
                                    }}>
                                    <Text
                                        style={{
                                            fontSize: scale(16),
                                            color: '#FFFFFF',
                                            padding: scale(5)
                                        }}>
                                        Xác nhận
                                    </Text>
                                </Pressable>
                            </View>
                        )}
                    </View>
                )
            })}
        </>
    )
}

export default FriendItem
