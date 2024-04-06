import { Text } from 'app/atoms'
import animationImg from 'assets/animations/congratulation.json'
import React from 'react'

import LottieView from 'lottie-react-native'
import { View } from 'react-native'

import { AspectRatio } from 'native-base'

export default () => (
    <View>
        <AspectRatio w="100%" ratio={16 / 9}>
            <LottieView
                source={animationImg}
                autoPlay
                loop
                style={{
                    border: 'none'
                }}
            />
        </AspectRatio>
        <Text bold style={{ textAlign: 'center', fontSize: 18 }}>
            Bạn đã hoàn thành khóa học
        </Text>
    </View>
)
