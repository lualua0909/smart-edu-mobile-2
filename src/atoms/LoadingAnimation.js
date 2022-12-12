import React from 'react'
import { Center } from 'native-base'
import LottieView from 'lottie-react-native'
import animationImg from 'assets/animations/loading.json'

export default () => (
    <Center>
        <LottieView
            source={animationImg}
            autoPlay
            loop
            style={{
                width: 300,
                height: 100,
            }}
        />
    </Center>
)
