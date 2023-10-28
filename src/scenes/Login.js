import axios from 'app/Axios'
import { useGlobalState } from 'app/Store'
import { Input, showToast } from 'app/atoms'
import { ROUTES, STYLES } from 'app/constants'
import { scale } from 'app/helpers/responsive'
import useFormInput from 'app/helpers/useFormInput'
import { storeData } from 'app/helpers/utils'
import React, { useEffect, useState } from 'react'

import messaging from '@react-native-firebase/messaging'
import LottieView from 'lottie-react-native'
import { Image, Platform } from 'react-native'
import {
    ArrowUpCircle,
    ChevronRight,
    Key,
    Lock,
    Shield
} from 'react-native-feather'
import { SafeAreaView } from 'react-native-safe-area-context'

import animationImg from 'assets/animations/english-reading.json'
import {
    Button,
    Center,
    Pressable,
    ScrollView,
    Stack,
    Text,
    View
} from 'native-base'

const Login = ({ navigation }) => {
    const username = useFormInput('')
    const password = useFormInput('')
    const [loading, setLoading] = useState(false)
    const [fcmToken, setFcmToken] = useState()
    const [userInfo, setUserInfo] = useGlobalState('userInfo')
    const [random, setRandom] = useGlobalState('random')

    const getNewToken = async () => {
        try {
            const authorizationStatus = await messaging().requestPermission({
                sound: false,
                announcement: true,
                provisional: true
            })

            if (authorizationStatus) {
                console.log('Permission status:', authorizationStatus)
            }
            const token = await messaging().getToken()
            if (token) {
                console.log('token = ', token)
                setFcmToken(token)
            }
        } catch (error) {
            console.log('error = ', error)
        }
    }
    useEffect(() => {
        getNewToken()
    }, [])

    const doLogin = () => {
        if (username.value.length > 0 && password.value.length > 0) {
            setLoading(true)
            axios
                .post('login', {
                    username: username.value.toLowerCase(),
                    password: password.value,
                    mobile_fcm_token: fcmToken,
                    is_mobile: true
                })
                .then(res => {
                    if (res.data.status === 200) {
                        setUserInfo(res?.data)
                        setRandom(Math.random())
                        storeData('@userInfo', res?.data)
                    } else {
                        showToast({
                            title: res.data.message,
                            status: 'error'
                        })
                    }
                })
                .catch(error => {
                    showToast({
                        title: error.message,
                        status: 'error'
                    })
                })
                .finally(() => setLoading(false))
        } else {
            showToast({
                title: 'Vui lòng nhập đầy đủ thông tin',
                status: 'error'
            })
        }
    }

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
        setUserInfo(userInfo)
        setRandom(Math.random())
        storeData('@userInfo', userInfo)
    }

    return (
        <View style={{ flex: 1 }}>
            <ScrollView
                scrollEnabled={false}
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{
                    flexGrow: 1,
                    justifyContent: 'center'
                }}>
                <Image
                    source={require('assets/images/login-bg.png')}
                    style={{
                        width: '100%',
                        height: '70%',
                        position: 'absolute',
                        top: 0,
                        left: 0
                    }}
                    alt="image"
                    resizeMode="cover"
                />
                <View
                    style={{
                        paddingHorizontal: scale(30),
                        zIndex: 1,
                        marginTop: scale(90)
                    }}>
                    <View
                        style={[
                            STYLES.boxShadow,
                            {
                                width: '100%',
                                borderRadius: scale(10),
                                paddingVertical: 20,
                                paddingHorizontal: 20
                            }
                        ]}>
                        <Text
                            bold
                            style={{
                                color: '#0E564D',
                                fontSize: scale(16),
                                textAlign: 'center'
                            }}>
                            ĐĂNG NHẬP
                        </Text>
                        <Text
                            style={{
                                fontSize: scale(15),
                                textAlign: 'center',
                                color: '#6C746E'
                            }}>
                            Chào mừng bạn đến với SmartEdu
                        </Text>
                        <Stack
                            space={4}
                            w="100%"
                            alignItems="center"
                            style={{ marginTop: scale(16) }}>
                            <Input
                                allowClear
                                InputLeftElement={
                                    <Shield
                                        width={18}
                                        height={18}
                                        color="#555"
                                        style={{ marginLeft: 10 }}
                                    />
                                }
                                placeholder="Tài khoản"
                                {...username}
                                blurOnSubmit={true}
                            />
                            <Input
                                allowClear
                                InputLeftElement={
                                    <Lock
                                        width={18}
                                        height={18}
                                        color="#555"
                                        style={{ marginLeft: 10 }}
                                    />
                                }
                                type="password"
                                placeholder="Mật khẩu"
                                {...password}
                                blurOnSubmit={true}
                                onSubmitEditing={doLogin}
                            />
                        </Stack>
                        <Pressable
                            onPress={() =>
                                navigation.navigate(ROUTES.ForgotPassword)
                            }
                            hitSlop={20}
                            style={{
                                marginTop: 10,
                                alignSelf: 'flex-end'
                            }}>
                            <Text
                                bold
                                style={{
                                    fontSize: scale(14),
                                    color: '#23B55D',
                                    textDecorationLine: 'underline'
                                }}>
                                Quên mật khẩu?
                            </Text>
                        </Pressable>
                        <Center>
                            <Button
                                size="md"
                                isLoading={loading}
                                isLoadingText="Đang đăng nhập"
                                style={{
                                    marginTop: scale(16)
                                }}
                                onPress={doLogin}>
                                Đăng nhập
                            </Button>
                        </Center>

                        <Pressable
                            onPress={() => navigation.navigate(ROUTES.Register)}
                            style={{
                                alignSelf: 'center',
                                marginTop: scale(16)
                            }}>
                            <Text
                                style={{
                                    fontSize: 14,
                                    color: '#6C746E',
                                    textAlign: 'center'
                                }}>
                                Bạn chưa có tài khoản?{' '}
                                <Text
                                    bold
                                    style={{
                                        fontSize: scale(14),
                                        color: '#23B55D',
                                        textDecorationLine: 'underline'
                                    }}>
                                    Đăng ký ngay
                                </Text>
                            </Text>
                        </Pressable>
                    </View>
                </View>
                <SafeAreaView
                    style={{
                        position: 'absolute',
                        bottom: scale(0),
                        alignSelf: 'center',
                        marginBottom: scale(30),
                        width: '100%'
                        // zIndex: 2
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
                                fontSize: 14
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
            </ScrollView>
        </View>
    )
}

export default Login
