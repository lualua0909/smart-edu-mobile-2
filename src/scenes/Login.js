import axios from 'app/Axios'
import { setGlobalState, useGlobalState } from 'app/Store'
import { Button, Center, Input, Text, VStack, showToast } from 'app/atoms'
import Trial from 'app/components/Trial'
import { ROUTES, STYLES } from 'app/constants'
import { scale } from 'app/helpers/responsive'
import useFormInput from 'app/helpers/useFormInput'
import { storeData } from 'app/helpers/utils'
import React, { useEffect, useState } from 'react'

import messaging from '@react-native-firebase/messaging'
import { Image, Pressable, ScrollView, View } from 'react-native'
import { Eye, EyeOff, Lock, Shield } from 'react-native-feather'

const Login = ({ navigation }) => {
    const username = useFormInput('')
    const password = useFormInput('')
    const [loading, setLoading] = useState(false)
    const [fcmToken, setFcmToken] = useState()
    const [userInfo, setUserInfo] = useGlobalState('userInfo')
    const [random, setRandom] = useGlobalState('random')
    const [show, setShow] = useState(false)

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
        setGlobalState('isShow', true)
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
                        storeData('@userInfo', res?.data)
                    } else {
                        showToast({
                            title: res.data.message,
                            status: 'error'
                        })
                    }
                })
                .finally(() => setLoading(false))
        } else {
            showToast({
                title: 'Vui lòng nhập đầy đủ thông tin',
                status: 'error'
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
                        <VStack space={4} style={{ marginTop: scale(16) }}>
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
                                secureTextEntry={!show}
                                placeholder="Mật khẩu"
                                {...password}
                                onSubmitEditing={doLogin}
                                InputRightElement={
                                    <Pressable onPress={() => setShow(!show)}>
                                        {show ? (
                                            <Eye
                                                width={16}
                                                height={16}
                                                color="#555"
                                            />
                                        ) : (
                                            <EyeOff
                                                width={16}
                                                height={16}
                                                color="#555"
                                            />
                                        )}
                                    </Pressable>
                                }
                            />
                        </VStack>
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
                            onPress={() => navigation.navigate(ROUTES.SignUp)}
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
                <Trial />
            </ScrollView>
        </View>
    )
}

export default Login
