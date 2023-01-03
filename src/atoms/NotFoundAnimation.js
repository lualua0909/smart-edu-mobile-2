import React from 'react'

import LottieView from 'lottie-react-native'

import animationImg from 'assets/animations/not-found.json'
import { Center } from 'native-base'

export default () => (
    <Center>
        <LottieView
            source={animationImg}
            autoPlay
            loop
            style={{
                width: 500,
                height: 150
            }}
        />
    </Center>
)
