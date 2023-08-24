import axios from 'app/Axios'
import { Input } from 'app/atoms'
import { ROUTES, STYLES } from 'app/constants'
import { scale } from 'app/helpers/responsive'
import useFormInput from 'app/helpers/useFormInput'
import {
    svgLoginMail,
    svgLoginPassword,
    svgLoginUsername,
    svgTick
} from 'assets/svg'
import React, { useState } from 'react'

import { Image, Linking, Pressable, View } from 'react-native'
import { AtSign, Key, Phone, Shield, User } from 'react-native-feather'
import { SvgXml } from 'react-native-svg'
import { ScrollView } from 'react-native-virtualized-view'

import { Text } from 'native-base'
import { Button, Center, Icon, Stack, useToast } from 'native-base'

const Register = ({ navigation }) => {
    const toast = useToast()
    const firstName = useFormInput('')
    const lastName = useFormInput('')
    const phone = useFormInput('')
    const email = useFormInput('')
    const username = useFormInput('')
    const password = useFormInput('')
    const [loading, setLoading] = useState(false)

    const verify = () => {
        if (firstName.value == '') {
            toast.show({ title: 'First name is required', status: 'error' })
            return false
        } else if (lastName.value == '') {
            toast.show({ title: 'Last name is required', status: 'error' })
            return false
        } else if (email.value == '') {
            toast.show({ title: 'Email is required', status: 'error' })
            return false
        } else if (username.value == '') {
            toast.show({ title: 'Username is required', status: 'error' })
            return false
        } else if (password.value == '') {
            toast.show({ title: 'Password is required', status: 'error' })
            return false
        }
        return true
    }

    const doRegister = () => {
        if (verify()) {
            setLoading(true)
            axios
                .post('register', {
                    first_name: firstName.value,
                    last_name: lastName.value,
                    phone: phone.value,
                    email: email.value,
                    username: username.value,
                    password: password.value
                })
                .then(res => {
                    if (res.data.status === 200) {
                        toast.show({
                            title: 'Đăng ký tài khoản thành công !',
                            status: 'success'
                        })

                        navigation.navigate(ROUTES.Login)
                    } else {
                        toast.show({
                            title: res?.data?.message,
                            status: 'error',
                            placement: 'top'
                        })
                    }
                })
                .finally(() => {
                    setLoading(false)
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
                    resizeMode="cover"
                    alt="image"
                />
                <View style={{ paddingHorizontal: scale(30), zIndex: 1 }}>
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
                                style={{
                                    fontWeight: '900',
                                    color: '#0E564D',
                                    fontSize: scale(16),
                                    textAlign: 'center'
                                }}>
                                ĐĂNG KÝ TÀI KHOẢN MỚI
                            </Text>
                            <Stack
                                space={4}
                                w="100%"
                                alignItems="center"
                                style={{ marginTop: scale(16) }}>
                                <Input
                                    allowClear
                                    InputLeftElement={
                                        <User
                                            width={18}
                                            height={18}
                                            color="#555"
                                            style={{ marginLeft: 10 }}
                                        />
                                    }
                                    placeholder="Họ"
                                    {...firstName}
                                />
                                <Input
                                    allowClear
                                    InputLeftElement={
                                        <User
                                            width={18}
                                            height={18}
                                            color="#555"
                                            style={{ marginLeft: 10 }}
                                        />
                                    }
                                    placeholder="Tên"
                                    {...lastName}
                                />
                                <Input
                                    allowClear
                                    InputLeftElement={
                                        <Phone
                                            width={18}
                                            height={18}
                                            color="#555"
                                            style={{ marginLeft: 10 }}
                                        />
                                    }
                                    keyboardType="phone-pad"
                                    placeholder="Số điện thoại"
                                    {...phone}
                                />
                                <Input
                                    allowClear
                                    InputLeftElement={
                                        <AtSign
                                            width={18}
                                            height={18}
                                            color="#555"
                                            style={{ marginLeft: 10 }}
                                        />
                                    }
                                    placeholder="Email"
                                    keyboardType="email-address"
                                    {...email}
                                />
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
                                    placeholder="Tên đăng nhập"
                                    {...username}
                                />
                                <Input
                                    allowClear
                                    InputLeftElement={
                                        <Key
                                            width={18}
                                            height={18}
                                            color="#555"
                                            style={{ marginLeft: 10 }}
                                        />
                                    }
                                    type="password"
                                    placeholder="Mật khẩu"
                                    {...password}
                                />
                            </Stack>
                        </View>
                        <Pressable
                            style={{
                                alignSelf: 'center',
                                marginTop: scale(16),
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                            <SvgXml
                                xml={svgTick}
                                width={scale(14)}
                                height={scale(14)}
                            />
                            <Text
                                style={{
                                    fontSize: scale(14),
                                    color: '#1D1D1D',
                                    textAlign: 'center',
                                    marginLeft: scale(8)
                                }}>
                                Đồng ý với{' '}
                            </Text>
                            <Pressable
                                onPress={() => {
                                    Linking.openURL(
                                        'https://smarte.edu.vn/chinh-sach-dieu-khoan'
                                    )
                                }}>
                                <Text
                                    style={{
                                        fontSize: scale(14),
                                        color: '#0075FF',
                                        textDecorationLine: 'underline'
                                    }}>
                                    Chính sách và điều khoản
                                </Text>
                            </Pressable>
                        </Pressable>
                        <Center>
                            <Button
                                size="md"
                                isLoading={loading}
                                isLoadingText="Đang tạo tài khoản"
                                style={{
                                    marginTop: scale(16),
                                    width: '70%'
                                }}
                                onPress={doRegister}>
                                Đăng ký ngay
                            </Button>
                        </Center>
                        <Pressable
                            hitSlop={15}
                            onPress={() => navigation.navigate(ROUTES.Login)}
                            style={{
                                alignSelf: 'center',
                                marginTop: scale(16)
                            }}>
                            <Text
                                style={{
                                    fontSize: scale(14),
                                    color: '#1D1D1D',
                                    textAlign: 'center'
                                }}>
                                Bạn đã có tài khoản?{' '}
                                <Text
                                    style={{
                                        fontSize: scale(14),
                                        color: '#0075FF',
                                        textDecorationLine: 'underline'
                                    }}>
                                    Đăng nhập
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

export default Register
