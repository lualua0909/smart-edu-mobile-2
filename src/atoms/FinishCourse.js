import { Text } from 'app/atoms'
import animationImg from 'assets/animations/congratulation.json'
import React from 'react'

import LottieView from 'lottie-react-native'
import { View } from 'react-native'

export default () => (
    <View>
        <LottieView
            source={animationImg}
            autoPlay
            loop
            style={{
                width: '100%',
                border: 'none'
            }}
        />
        <Text bold style={{ textAlign: 'center', fontSize: 18 }}>
            Bạn đã hoàn thành khóa học
        </Text>
    </View>
)
