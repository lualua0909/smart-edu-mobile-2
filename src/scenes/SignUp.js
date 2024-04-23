import axios from 'app/Axios'
import { Button, Center, Input, Text, showToast } from 'app/atoms'
import Trial from 'app/components/Trial'
import { STYLES } from 'app/constants'
import { scale } from 'app/helpers/responsive'
import useFormInput from 'app/helpers/useFormInput'
import React, { useState } from 'react'

import { Image, ScrollView, View } from 'react-native'

import HeaderBack from 'app/components/header-back'

const SignUp = () => {
    const mailInput = useFormInput('')
    const [loading, setLoading] = useState(false)

    const doLogin = () => {
        const email = mailInput.value.toLowerCase()
        const emailRegex = /\S+@\S+\.\S+/
        if (!emailRegex.test(email)) {
            showToast({
                title: 'Lỗi',
                description: 'Email không hợp lệ',
                status: 'error'
            })
            return
        }

        if (email) {
            setLoading(true)
            axios
                .post('register-mobile', {
                    email
                })
                .then(res => {
                    if (res.data.status === 200) {
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
                title: 'Lỗi',
                description: 'Vui lòng nhập đầy đủ thông tin',
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
                    source={require('assets/images/login-bg.webp')}
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
                        zIndex: 1
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
                                fontSize: 16,
                                textAlign: 'center',
                                marginBottom: 10
                            }}>
                            ĐĂNG KÝ TÀI KHOẢN
                        </Text>
                        <Input
                            allowClear
                            placeholder="Email"
                            {...mailInput}
                            blurOnSubmit={true}
                        />
                        <Center>
                            <Button
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
