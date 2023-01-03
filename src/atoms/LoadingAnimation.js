import animationImg from 'assets/animations/loading.json'
import React from 'react'

import LottieView from 'lottie-react-native'

import { Center } from 'native-base'

export default () => (
    <Center>
        <LottieView
            source={animationImg}
            autoPlay
            loop
            style={{
                width: 300,
                height: 100
            }}
        />
    </Center>
)
