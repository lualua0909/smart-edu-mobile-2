import React, { useState } from 'react'
import { View, Text, Image, ScrollView, Pressable } from 'react-native'
import { scale } from 'app/helpers/responsive'
import { FONTS, STYLES, ROUTES } from 'app/constants'
import Axios from 'app/Axios'
import useFormInput from 'app/helpers/useFormInput'
import { Input, Icon, Button, useToast, Center } from 'native-base'
import { SvgXml } from 'react-native-svg'
import { svgLoginMail } from 'assets/svg'

const ForgotPassword = ({ navigation }) => {
    const toast = useToast()
    const email = useFormInput('')
    const [loading, setLoading] = useState(false)

    const resetPassword = () => {
        if (email.value !== '') {
            setLoading(true)
            Axios.post('reset-password/' + email.value)
                .then((res) => {
                    console.log(res)
                    if (res.data.status === 200) {
                        toast.show({
                            title: 'Đã cấp lại mật khẩu mới cho bạn, vui lòng kiểm tra email',
                            status: 'success',
                        })
                    } else {
                        toast.show({
                            title: res?.data?.message,
                            status: 'error',
                        })
                    }
                })
                .catch((err) => {
                    console.error(err)
                    toast.show({ title: err.message, status: 'error' })
                })
                .finally(() => setLoading(false))
        } else {
            toast.show({ title: 'Vui lòng nhập email', status: 'error' })
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
                            },
                        ]}
                    >
                        <View style={{ paddingHorizontal: scale(28) }}>
                            <Text
                                style={{
                                    fontFamily: FONTS.MulishBold,
                                    fontWeight: '900',
                                    color: '#0E564D',
                                    fontSize: scale(16),
                                    textAlign: 'center',
                                }}
                            >
                                QUÊN MẬT KHẨU
                            </Text>
                            <Text
                                style={{
                                    fontFamily: FONTS.Mulish,
                                    marginTop: scale(8),
                                    fontSize: scale(15),
                                    textAlign: 'center',
                                    color: '#6C746E',
                                    marginBottom: 20,
                                }}
                            >
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
                                size="lg"
                                isLoading={loading}
                                isLoadingText="Đang xử lý"
                                style={{
                                    backgroundColor: '#52B553',
                                    marginTop: scale(16),
                                    width: '70%',
                                }}
                                onPress={resetPassword}
                            >
                                Quên mật khẩu
                            </Button>
                        </Center>
                        <Pressable
                            onPress={() => navigation.navigate(ROUTES.Register)}
                            style={{
                                alignSelf: 'center',
                                marginTop: scale(39),
                            }}
                        >
                            <Text
                                style={{
                                    fontFamily: FONTS.Mulish,
                                    fontSize: scale(14),
                                    color: '#1D1D1D',
                                    textAlign: 'center',
                                }}
                            >
                                Bạn chưa có tài khoản?{' '}
                                <Text
                                    style={{
                                        fontFamily: FONTS.Mulish,
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
            </ScrollView>
        </View>
    )
}

export default ForgotPassword
