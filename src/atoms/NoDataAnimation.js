import React from 'react'
import { Center } from 'native-base'
import LottieView from 'lottie-react-native'
import animationImg from 'assets/animations/no-data.json'

export default ({ style }) => (
    <Center>
        <LottieView
            source={animationImg}
            autoPlay
            loop
            style={{
                width: 500,
                height: 150,
                ...style,
            }}
        />
    </Center>
)
