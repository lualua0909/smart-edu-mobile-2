import { setGlobalState } from 'app/Store'
import { Center, Text } from 'app/atoms'
import { scale } from 'app/helpers/responsive'
import { storeData } from 'app/helpers/utils'
import React from 'react'

import LottieView from 'lottie-react-native'
import { Platform, Pressable, SafeAreaView } from 'react-native'

import animationImg from 'assets/animations/online-learning.json'

const Trial = () => {
    const toTrialPage = () => {
        const userInfo = {
            expiredDate: null,
            first_name: 'Học',
            id: 'trial',
            last_name: 'Thử',
            level: 3,
            notifications: [],
            status: 200,
            step: null,
            token: 'Bearer',
            totalCoins: null,
            username: 'Học thử'
        }
        setGlobalState('userInfo', userInfo)
        storeData('@userInfo', userInfo)
    }

    return (
        <SafeAreaView
            style={{
                position: 'absolute',
                bottom: scale(0),
                alignSelf: 'center',
                marginBottom: scale(30),
                width: '100%'
            }}
            edges={['bottom']}>
            <Center>
                {Platform.isPad ? null : (
                    <LottieView
                        source={animationImg}
                        autoPlay
                        loop
                        style={{
                            width: 100,
                            height: 'auto'
                        }}
                    />
                )}
                <Text
                    style={{
                        color: '#6C746E',
                        fontSize: 16
                    }}>
                    Trải nghiệm không cần tài khoản?
                </Text>
                <Pressable
                    hitSlop={30}
                    style={{ marginTop: 6 }}
                    onPress={toTrialPage}>
                    <Text
                        bold
                        style={{
                            color: '#23B55D',
                            fontSize: 18
                        }}>
                        Khám phá ngay
                    </Text>
                </Pressable>
            </Center>
        </SafeAreaView>
    )
}

export default Trial
