import React, { useMemo, useState } from 'react'
import { View, Pressable, Image, Dimensions } from 'react-native'
import { scale } from 'app/helpers/responsive'
import { Text } from 'native-base'

const { width } = Dimensions.get('window')
const HeaderChat = ({}) => {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Image
                source={require('assets/images/header-chat-1.png')}
                style={{ width: width * 0.62, height: scale(40) }}
                resizeMode="stretch"
            />
            <Image
                source={require('assets/images/header-chat-2.png')}
                style={{
                    width: width * 0.59,
                    height: scale(40),
                    left: -width * 0.21,
                    zIndex: -1,
                }}
                resizeMode="stretch"
            />
            <Pressable
                style={{
                    width: '50%',
                    height: '100%',
                    position: 'absolute',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Text
                    style={{
                        fontSize: scale(16),
                        color: '#0E564D',
                    }}
                >
                    Trò chuyện
                </Text>
            </Pressable>
            <Pressable
                style={{
                    width: '50%',
                    height: '100%',
                    position: 'absolute',
                    justifyContent: 'center',
                    alignItems: 'center',
                    right: 0,
                }}
            >
                <Text
                    style={{
                        fontSize: scale(16),
                        color: '#fff',
                        left: -scale(10),
                    }}
                >
                    Bạn cùng học
                </Text>
            </Pressable>
        </View>
    )
}

export default HeaderChat
