import { scale } from 'app/helpers/responsive'
import React from 'react'

import { Text, View } from 'react-native'

const Achievement = ({ data }) => {
    return (
        <View
            style={{
                paddingTop: scale(16),
                width: '100%'
            }}>
            <View
                style={{
                    paddingHorizontal: scale(16),
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                    <Text
                        style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            color: '#0E564D',
                            marginLeft: scale(8),
                            textTransform: 'uppercase'
                        }}>
                        Thành tích nổi bật
                    </Text>
                </View>
            </View>
            <View
                style={{
                    paddingBottom: scale(10),
                    paddingTop: scale(10)
                }}>
                {data?.map((value, index) => (
                    <>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                paddingHorizontal: scale(16),
                                paddingBottom: scale(10)
                            }}
                            key={index}>
                            {/* <Ionicons
                                name="md-ribbon"
                                color="orange"
                                size={32}
                            /> */}
                            <Text
                                style={{
                                    fontSize: 14,
                                    marginLeft: scale(5),
                                    flex: 1,
                                    color: '#000'
                                }}>
                                {value}
                            </Text>
                        </View>
                    </>
                ))}
            </View>
        </View>
    )
}

export default Achievement
