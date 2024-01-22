import axios from 'app/Axios'
import { setGlobalState, useGlobalState } from 'app/Store'
import { Input, showToast } from 'app/atoms'
import Trial from 'app/components/Trial'
import { STYLES } from 'app/constants'
import { scale } from 'app/helpers/responsive'
import useFormInput from 'app/helpers/useFormInput'
import { storeData } from 'app/helpers/utils'
import React, { useEffect, useState } from 'react'

import messaging from '@react-native-firebase/messaging'
import { Image } from 'react-native'
import { Eye, EyeOff, Lock, Shield } from 'react-native-feather'

import HeaderBack from 'app/components/header-back'
import {
    Button,
    Center,
    Pressable,
    ScrollView,
    Stack,
    Text,
    View
} from 'native-base'

const SignUp = () => {
    const username = useFormInput('')
    const password = useFormInput('')
    const email = useFormInput('')
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
                title: 'Vui lòng nhập tài khoản và mật khẩu',
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
                <HeaderBack
                    white
                    style={{
                        position: 'absolute',
                        top: 50,
                        left: 0
                    }}
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
                            ĐĂNG KÝ TÀI KHOẢN
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
                                placeholder="Email"
                                {...email}
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
                                type={show ? 'text' : 'password'}
                                placeholder="Mật khẩu"
                                {...password}
                                blurOnSubmit={true}
                                onSubmitEditing={doLogin}
                                InputRightElement={
                                    <Pressable onPress={() => setShow(!show)}>
                                        {show ? (
                                            <Eye
                                                width={18}
                                                height={18}
                                                color="#555"
                                                style={{ marginRight: 10 }}
                                            />
                                        ) : (
                                            <EyeOff
                                                width={18}
                                                height={18}
                                                color="#555"
                                                style={{ marginRight: 10 }}
                                            />
                                        )}
                                    </Pressable>
                                }
                            />
                        </Stack>
                        <Center>
                            <Button
                                size="md"
                                isLoading={loading}
                                isLoadingText="Đang xử lý"
                                style={{
                                    marginTop: scale(16)
                                }}
                                onPress={doLogin}>
                                Đăng ký
                            </Button>
                        </Center>
                    </View>
                </View>
                <Trial />
            </ScrollView>
        </View>
    )
}

export default SignUp
