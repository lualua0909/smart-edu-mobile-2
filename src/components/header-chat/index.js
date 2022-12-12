import React, { useMemo, useState } from 'react'
import {
    View,
    Text,
    Pressable,
    Image,
    ScrollView,
    Dimensions,
    ImageBackground,
    FlatList,
} from 'react-native'
import Svg, { SvgXml } from 'react-native-svg'
import { scale } from 'app/helpers/responsive'
import { FONTS, STYLES, ROUTES, COLORS } from 'app/constants'
import { TabView, TabBar } from 'react-native-tab-view'
import { animateNextTransition } from 'app/helpers/utils'
import { SafeAreaView } from 'react-native-safe-area-context'
import LinearGradient from 'react-native-linear-gradient'

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
                        fontFamily: FONTS.MulishBold,
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
                        fontFamily: FONTS.MulishBold,
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
