import React, { useState, useEffect } from 'react'
import { View, Image, Pressable, ScrollView } from 'react-native'
import { scale } from 'app/helpers/responsive'
import { STYLES, ROUTES } from 'app/constants'
import Axios from 'app/Axios'
import useFormInput from 'app/helpers/useFormInput'
import EncryptedStorage from 'react-native-encrypted-storage'
import { useGlobalState } from 'app/Store'
import { Input, Stack, Button, useToast, Center, Text } from 'native-base'
import messaging from '@react-native-firebase/messaging'

const Login = ({ navigation }) => {
    const toast = useToast()
    const username = useFormInput('')
    const password = useFormInput('')
    const fcmToken = useFormInput('')
    const [loading, setLoading] = useState(false)
    const [userInfo, setUserInfo] = useGlobalState('userInfo')
    const [random, setRandom] = useGlobalState('random')

    useEffect(async () => {
        const token = await messaging().getToken()
        if (token) {
            console.log('fcm token = ', token)
            fcmToken.setValue(token)
        }
    }, [])

    const doLogin = () => {
        if (username.value.length > 0 && password.value.length > 0) {
            setLoading(true)
            Axios.post('login', {
                username: username.value.toLowerCase(),
                password: password.value,
                mobile_fcm_token: fcmToken.value,
            })
                .then((res) => {
                    if (res.data.status === 200) {
                        console.log(res.data)
                        // if (firebase.messaging.isSupported()) {
                        //     getNewToken()
                        // }
                        setUserInfo(res?.data)
                        setRandom(Math.random())
                        EncryptedStorage.setItem(
                            '@userInfo',
                            JSON.stringify(res?.data)
                        )
                    } else {
                        toast.show({
                            title: res.data.message,
                            placement: 'top',
                            status: 'danger',
                        })
                    }
                })
                .catch((error) => {
                    toast.show({
                        title: error.message,
                        placement: 'top',
                        status: 'danger',
                    })
                })
                .finally(() => setLoading(false))
        } else {
            toast.show({
                title: 'Vui lòng nhập đầy đủ thông tin',
                placement: 'top',
                status: 'danger',
            })
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <ScrollView
                scrollEnabled={false}
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{
                    flexGrow: 1,
                    justifyContent: 'center',
                }}
            >
                <Image
                    source={require('assets/images/login-bg.png')}
                    style={{
                        width: '100%',
                        height: '70%',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                    }}
                    resizeMode="cover"
                />
                <View
                    style={{
                        paddingHorizontal: scale(30),
                        zIndex: 1,
                        marginTop: scale(90),
                    }}
                >
                    <View
                        style={[
                            STYLES.boxShadow,
                            {
                                width: '100%',
                                borderRadius: scale(10),
                                paddingVertical: scale(42),
                                paddingHorizontal: scale(28),
                            },
                        ]}
                    >
                        <Text
                            style={{
                                fontWeight: '900',
                                color: '#0E564D',
                                fontSize: scale(16),
                                textAlign: 'center',
                            }}
                        >
                            ĐĂNG NHẬP
                        </Text>
                        <Text
                            style={{
                                marginTop: scale(8),
                                fontSize: scale(15),
                                textAlign: 'center',
                                color: '#6C746E',
                            }}
                        >
                            Chào mừng bạn đến với SmartEdu !
                        </Text>
                        <Stack
                            space={4}
                            w="100%"
                            alignItems="center"
                            style={{ marginTop: scale(16) }}
                        >
                            <Input
                                size="md"
                                placeholder="Tài khoản"
                                {...username}
                                blurOnSubmit={true}
                            />
                            <Input
                                size="md"
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
                                marginTop: scale(24),
                                alignSelf: 'flex-end',
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: scale(14),
                                    color: '#0075FF',
                                    textDecorationLine: 'underline',
                                }}
                            >
                                Quên mật khẩu?
                            </Text>
                        </Pressable>
                        <Center>
                            <Button
                                size="md"
                                isLoading={loading}
                                isLoadingText="Đang đăng nhập"
                                style={{
                                    marginTop: scale(16),
                                }}
                                onPress={doLogin}
                            >
                                Đăng nhập
                            </Button>
                        </Center>

                        <Pressable
                            onPress={() => navigation.navigate(ROUTES.Register)}
                            style={{
                                alignSelf: 'center',
                                marginTop: scale(16),
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: scale(14),
                                    color: '#1D1D1D',
                                    textAlign: 'center',
                                }}
                            >
                                Bạn chưa có tài khoản?{' '}
                                <Text
                                    style={{
                                        fontSize: scale(14),
                                        color: '#0075FF',
                                        textDecorationLine: 'underline',
                                    }}
                                >
                                    Đăng ký ngay
                                </Text>
                            </Text>
                        </Pressable>
                    </View>
                </View>
                {/* <SafeAreaView
                    style={{
                        position: 'absolute',
                        bottom: scale(0),
                        alignSelf: 'center',
                        marginBottom: scale(15),
                    }}
                    edges={['bottom']}
                >
                    <Pressable
                        hitSlop={30}
                        style={{
                            position: 'absolute',
                            bottom: scale(0),
                            alignSelf: 'center',
                        }}
                    >
                        <Text
                            style={{
                                fontWeight: 'bold',
                                color: '#23B55D',
                                fontSize: scale(16),
                            }}
                        >
                            Khám phá ngay
                        </Text>
                    </Pressable>
                </SafeAreaView> */}
            </ScrollView>
        </View>
    )
}

export default Login
