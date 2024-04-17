import axios from 'app/Axios'
import { Button, Center, Input, Text } from 'app/atoms'
import Trial from 'app/components/Trial'
import { STYLES } from 'app/constants'
import { scale } from 'app/helpers/responsive'
import useFormInput from 'app/helpers/useFormInput'
import React, { useState } from 'react'

import { Image, ScrollView, View } from 'react-native'

import HeaderBack from '../components/header-back'

const ForgotPassword = () => {
    const email = useFormInput('')
    const [loading, setLoading] = useState(false)

    const resetPassword = () => {
        if (email.value !== '') {
            setLoading(true)
            axios
                .post('reset-password/' + email.value)
                .then(res => {
                    if (res.data.status === 200) {
                        showToast({
                            title: 'Đã cấp lại mật khẩu mới cho bạn, vui lòng kiểm tra email',
                            status: 'success'
                        })
                    } else {
                        showToast({
                            title: res?.data?.message,
                            status: 'error'
                        })
                    }
                })
                .catch(err => {
                    showToast({ title: err.message, status: 'error' })
                })
                .finally(() => setLoading(false))
        } else {
            showToast({ title: 'Vui lòng nhập email', status: 'error' })
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
                    resizeMode="cover"
                    alt="image"
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
                                paddingVertical: scale(42)
                            }
                        ]}>
                        <View style={{ paddingHorizontal: scale(28) }}>
                            <Text
                                bold
                                style={{
                                    color: '#0E564D',
                                    fontSize: 16,
                                    textAlign: 'center'
                                }}>
                                QUÊN MẬT KHẨU
                            </Text>
                            <Text
                                style={{
                                    marginTop: scale(8),
                                    textAlign: 'center',
                                    marginBottom: 20
                                }}>
                                Nhập email để khôi phục mật khẩu
                            </Text>
                            <Input
                                placeholder="Email"
                                keyboardType="email-address"
                                {...email}
                            />
                        </View>
                        <Center>
                            <Button
                                style={{
                                    marginTop: scale(16)
                                }}
                                onPress={resetPassword}>
                                Quên mật khẩu
                            </Button>
                        </Center>
                    </View>
                </View>
                <Trial />
            </ScrollView>
        </View>
    )
}

export default ForgotPassword
