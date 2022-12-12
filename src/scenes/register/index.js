import React, { useState } from 'react'
import {
    View,
    Text,
    Image,
    TextInput,
    Pressable,
    ScrollView,
    Linking,
} from 'react-native'
import { scale } from 'app/helpers/responsive'
import { FONTS, STYLES, ROUTES, COLORS } from 'app/constants'
import { SvgXml } from 'react-native-svg'
import {
    svgLoginButton,
    svgLoginMail,
    svgLoginPassword,
    svgLoginUsername,
    svgTick,
} from 'assets/svg'
import Axios from 'app/Axios'
import useFormInput from 'app/helpers/useFormInput'
import { Input, Icon, Stack, Button, useToast, Center } from 'native-base'

const Register = ({ navigation, route }) => {
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
        } else if (phone.value == '') {
            toast.show({ title: 'Phone is required', status: 'error' })
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
            Axios.post('register', {
                first_name: firstName.value,
                last_name: lastName.value,
                phone: phone.value,
                email: email.value,
                username: username.value,
                password: password.value,
            })
                .then((res) => {
                    if (res.data.status === 200) {
                        toast.show({
                            title: 'Đăng ký tài khoản thành công !',
                            status: 'success',
                        })

                        navigation.navigate(ROUTES.Login)
                    } else {
                        toast.show({
                            title: res?.data?.message,
                            status: 'error',
                            placement: 'top',
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
                <View style={{ paddingHorizontal: scale(30), zIndex: 1 }}>
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
                                    fontFamily: FONTS.Mulish,
                                    fontWeight: '900',
                                    color: '#0E564D',
                                    fontSize: scale(16),
                                    textAlign: 'center',
                                }}
                            >
                                ĐĂNG KÝ TÀI KHOẢN MỚI
                            </Text>
                            <Stack
                                space={4}
                                w="100%"
                                alignItems="center"
                                style={{ marginTop: scale(16) }}
                            >
                                <Input
                                    size="md"
                                    InputLeftElement={
                                        <Icon
                                            as={
                                                <SvgXml
                                                    xml={svgLoginUsername}
                                                />
                                            }
                                            size={5}
                                            ml="4"
                                            color="muted.400"
                                        />
                                    }
                                    placeholder="Họ"
                                    {...firstName}
                                />
                                <Input
                                    size="md"
                                    InputLeftElement={
                                        <Icon
                                            as={
                                                <SvgXml
                                                    xml={svgLoginUsername}
                                                />
                                            }
                                            size={5}
                                            ml="4"
                                            color="muted.400"
                                        />
                                    }
                                    placeholder="Tên"
                                    {...lastName}
                                />
                                <Input
                                    size="md"
                                    InputLeftElement={
                                        <Icon
                                            as={
                                                <SvgXml
                                                    xml={svgLoginUsername}
                                                />
                                            }
                                            size={5}
                                            ml="4"
                                            color="muted.400"
                                        />
                                    }
                                    keyboardType="phone-pad"
                                    placeholder="Số điện thoại"
                                    {...phone}
                                />
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
                                <Input
                                    size="md"
                                    InputLeftElement={
                                        <Icon
                                            as={
                                                <SvgXml
                                                    xml={svgLoginUsername}
                                                />
                                            }
                                            size={5}
                                            ml="4"
                                            color="muted.400"
                                        />
                                    }
                                    placeholder="Tên đăng nhập"
                                    {...username}
                                />
                                <Input
                                    size="md"
                                    InputLeftElement={
                                        <Icon
                                            as={
                                                <SvgXml
                                                    xml={svgLoginPassword}
                                                />
                                            }
                                            size={5}
                                            ml="4"
                                            color="muted.400"
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
                                alignItems: 'center',
                            }}
                        >
                            <SvgXml
                                xml={svgTick}
                                width={scale(14)}
                                height={scale(14)}
                            />
                            <Text
                                style={{
                                    fontFamily: FONTS.Mulish,
                                    fontSize: scale(14),
                                    color: '#1D1D1D',
                                    textAlign: 'center',
                                    marginLeft: scale(8),
                                }}
                            >
                                Đồng ý với{' '}
                            </Text>
                            <Pressable
                                onPress={() => {
                                    Linking.openURL(
                                        'https://smarte.edu.vn/chinh-sach-dieu-khoan'
                                    )
                                }}
                            >
                                <Text
                                    style={{
                                        fontFamily: FONTS.Mulish,
                                        fontSize: scale(14),
                                        color: '#0075FF',
                                        textDecorationLine: 'underline',
                                    }}
                                >
                                    Chính sách và điều khoản
                                </Text>
                            </Pressable>
                        </Pressable>
                        <Center>
                            <Button
                                size="lg"
                                isLoading={loading}
                                isLoadingText="Đang tạo tài khoản"
                                style={{
                                    backgroundColor: '#52B553',
                                    marginTop: scale(16),
                                    width: '70%',
                                }}
                                onPress={doRegister}
                                leftIcon={
                                    <SvgXml
                                        xml={svgLoginButton}
                                        width={scale(16)}
                                        height={scale(16)}
                                    />
                                }
                            >
                                Đăng ký ngay
                            </Button>
                        </Center>
                        <Pressable
                            hitSlop={15}
                            onPress={() => navigation.navigate(ROUTES.Login)}
                            style={{
                                alignSelf: 'center',
                                marginTop: scale(16),
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
                                Bạn đã có tài khoản?{' '}
                                <Text
                                    style={{
                                        fontFamily: FONTS.Mulish,
                                        fontSize: scale(14),
                                        color: '#0075FF',
                                        textDecorationLine: 'underline',
                                    }}
                                >
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
                                fontFamily: FONTS.Inter,
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
