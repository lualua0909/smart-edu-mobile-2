import axios from 'app/Axios'
import Trial from 'app/components/Trial'
import { STYLES } from 'app/constants'
import { scale } from 'app/helpers/responsive'
import useFormInput from 'app/helpers/useFormInput'
import { svgLoginMail } from 'assets/svg'
import React, { useState } from 'react'

import { Image, ScrollView } from 'react-native'
import { SvgXml } from 'react-native-svg'

import HeaderBack from '../components/header-back'
import { Button, Center, Icon, Input, Text, View } from 'native-base'

const ForgotPassword = () => {
    const email = useFormInput('')
    const [loading, setLoading] = useState(false)

    const resetPassword = () => {
        if (email.value !== '') {
            setLoading(true)
            axios
                .post('reset-password/' + email.value)
                .then(res => {
                    console.log(res)
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
                    console.error(err)
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
                    source={require('assets/images/login-bg.png')}
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
                                    fontSize: scale(16),
                                    textAlign: 'center'
                                }}>
                                QUÊN MẬT KHẨU
                            </Text>
                            <Text
                                style={{
                                    marginTop: scale(8),
                                    fontSize: scale(15),
                                    textAlign: 'center',
                                    color: '#6C746E',
                                    marginBottom: 20
                                }}>
                                Nhập email để tiến hành khôi phục mật khẩu.
                            </Text>
                            <Input
                                size="md"
                                InputLeftElement={
                                    <Icon
                                        as={<SvgXml xml={svgLoginMail} />}
                                        size={5}
                                        ml="4"
                                        color="muted.400"
                                    />
                                }
                                placeholder="Email"
                                keyboardType="email-address"
                                {...email}
                            />
                        </View>
                        <Center>
                            <Button
                                size="md"
                                isLoading={loading}
                                isLoadingText="Đang xử lý"
                                style={{
                                    marginTop: scale(16),
                                    width: '70%'
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
