import React from 'react'
import { VStack, Heading, Center } from 'native-base'
import LottieView from 'lottie-react-native'
import animationImg from 'assets/animations/Searching.json'

export default () => (
    <Center flex={1} px="3">
        <VStack space={2} justifyContent="center">
            <LottieView
                source={animationImg}
                autoPlay
                loop
                style={{
                    width: '100%',
                    height: 200,
                }}
            />
            <Center>
                <Heading fontSize="xl">Đang tải thông tin bài học</Heading>
            </Center>
        </VStack>
    </Center>
)
