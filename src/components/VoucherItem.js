import { scale } from 'app/helpers/responsive'
import React from 'react'

import { Image, Pressable, View } from 'react-native'

import { Checkbox, Text } from 'native-base'

const VoucherItem = ({ value, index }) => {
    return (
        <Pressable
            style={{
                backgroundColor: '#FFFFFF',
                padding: scale(10),
                paddingTop: scale(3)
            }}>
            <View
                style={{
                    flexDirection: 'row',
                    borderTopWidth: index === 0 ? 0 : 1,
                    borderColor: '#E6E6E6',
                    paddingTop: 10
                }}>
                <View style={{ width: scale(114) }}>
                    <Image
                        source={{
                            uri: 'https://phplaravel-695396-2297336.cloudwaysapps.com/public/courses/91.webp?0.3996675997251453'
                        }}
                        style={{
                            width: '100%',
                            height: scale(100)
                        }}
                        alt="image"
                    />
                </View>
                <View style={{ flex: 1, marginLeft: scale(12) }}>
                    <Text
                        numberOfLines={3}
                        style={{
                            fontSize: scale(16),
                            color: '#6C746E'
                        }}>
                        Áp dụng cho đơn hàng đầu tiên chi, max 2 d...
                    </Text>
                    <Text
                        style={{
                            color: '#F88417',
                            fontSize: scale(12),

                            borderWidth: 1,
                            borderColor: '#F88417',
                            borderRadius: 5,
                            padding: scale(4),
                            marginTop: scale(8),
                            alignSelf: 'flex-start'
                        }}>
                        Tối đa 100k
                    </Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginTop: scale(5)
                        }}>
                        <Text
                            style={{
                                fontSize: scale(12),
                                color: '#1D1D1D'
                            }}>
                            HSD: 28.08.2022
                        </Text>
                        <Text
                            style={{
                                color: '#0075FF',
                                fontSize: scale(12)
                            }}>
                            Điều kiện
                        </Text>
                    </View>
                </View>
                <Checkbox isChecked colorScheme="green" />
            </View>
        </Pressable>
    )
}

export default VoucherItem
