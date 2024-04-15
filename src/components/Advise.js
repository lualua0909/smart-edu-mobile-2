import { Avatar } from 'app/atoms'
import { Text } from 'app/atoms'
import { scale } from 'app/helpers/responsive'
import { toCurrency } from 'app/helpers/utils'
import { svgWhiteStar } from 'assets/svg'
import React, { useState } from 'react'

import { Image, Pressable, View } from 'react-native'
import { SvgXml } from 'react-native-svg'

const Advise = ({ data }) => {
    return (
        <Pressable
            style={{
                width: scale(226),
                marginRight: scale(12),
                borderRadius: scale(10),
                backgroundColor: 'green'
            }}>
            <Image
                source={require('assets/images/green-bg.jpg')}
                style={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    borderRadius: scale(10)
                }}
                alt="image"
            />
            <View
                style={{
                    paddingVertical: scale(16),
                    paddingHorizontal: scale(10)
                }}>
                <Text
                    style={{
                        fontSize: scale(18),
                        color: '#fff',
                        textAlign: 'center',
                        paddingTop: scale(5)
                    }}>
                    {data?.title}
                </Text>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: scale(20)
                    }}>
                    <Text
                        style={{
                            fontSize: scale(16),
                            color: '#fff',
                            marginRight: scale(20),
                            paddingTop: scale(5)
                        }}>
                        30 phút
                    </Text>
                    <Text
                        style={{
                            fontSize: scale(16),
                            color: '#fff',
                            paddingTop: scale(5)
                        }}>
                        {toCurrency(10000)} đ
                    </Text>
                </View>
                <View
                    style={{
                        marginTop: scale(30),
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                    <Avatar size={scale(48)} />
                    <View style={{ flex: 1, marginLeft: scale(4) }}>
                        <Text
                            style={{
                                fontSize: scale(16),
                                color: '#fff',
                                paddingTop: scale(5)
                            }}>
                            Smart Training
                        </Text>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                            <SvgXml
                                xml={svgWhiteStar}
                                width={scale(24)}
                                height={scale(24)}
                            />
                            <Text
                                style={{
                                    marginLeft: scale(4),

                                    fontSize: scale(14),
                                    color: '#fff'
                                }}>
                                5.0
                            </Text>
                            <View
                                style={{
                                    width: scale(3),
                                    height: scale(3),
                                    borderRadius: scale(3),
                                    marginHorizontal: scale(8),
                                    backgroundColor: '#fff'
                                }}
                            />
                            <Text
                                style={{
                                    fontSize: scale(14),
                                    color: '#fff'
                                }}>
                                Vietnam
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </Pressable>
    )
}

export default Advise
