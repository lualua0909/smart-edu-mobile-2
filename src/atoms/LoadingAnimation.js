import { Center } from 'app/atoms'
import animationImg from 'assets/animations/loading.json'
import React from 'react'

import LottieView from 'lottie-react-native'

export default () => (
    <Center style={{ height: 200 }}>
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
