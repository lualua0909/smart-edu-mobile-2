import animationImg from 'assets/animations/congratulation.json'
import React from 'react'

import LottieView from 'lottie-react-native'
import { Dimensions } from 'react-native'

import { AspectRatio, Box, Heading, Stack } from 'native-base'

const w = Dimensions.get('window').width
const h = Dimensions.get('window').height

export default () => (
    <Box alignItems="center">
        <Box
            h={Math.min(h, w) - 20}
            maxW="80"
            rounded="lg"
            overflow="hidden"
            shadow={5}
            _dark={{
                backgroundColor: 'gray.700'
            }}
            _light={{
                backgroundColor: 'gray.50'
            }}>
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
            <Stack p="4">
                <Stack space={2}>
                    <Heading size="md" ml="-1">
                        Xin chúc mừng bạn đã hoàn thành khóa học
                    </Heading>
                </Stack>
            </Stack>
        </Box>
    </Box>
)
