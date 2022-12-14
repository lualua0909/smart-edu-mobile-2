import Axios from 'app/Axios'
import { ROUTES, STYLES } from 'app/constants'
import { scale } from 'app/helpers/responsive'
import useFormInput from 'app/helpers/useFormInput'
import {
    svgLoginButton,
    svgLoginMail,
    svgLoginPassword,
    svgLoginUsername,
    svgTick
} from 'assets/svg'
import React, { useState } from 'react'

import { Image, Linking, Pressable, ScrollView, View } from 'react-native'
import { SvgXml } from 'react-native-svg'

import { Text } from 'native-base'
import { Button, Center, Icon, Input, Stack, useToast } from 'native-base'

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
            Axios.post('register', {
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
                            title: '????ng k?? t??i kho???n th??nh c??ng !',
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
                                ????NG K?? T??I KHO???N M???I
                            </Text>
                            <Stack
                                space={4}
                                w="100%"
                                alignItems="center"
                                style={{ marginTop: scale(16) }}>
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
                                    placeholder="H???"
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
                                    placeholder="T??n"
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
                                    placeholder="S??? ??i???n tho???i"
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
                                    placeholder="T??n ????ng nh???p"
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
                                    placeholder="M???t kh???u"
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
                                ?????ng ?? v???i{' '}
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
                                    Ch??nh s??ch v?? ??i???u kho???n
                                </Text>
                            </Pressable>
                        </Pressable>
                        <Center>
                            <Button
                                size="md"
                                isLoading={loading}
                                isLoadingText="??ang t???o t??i kho???n"
                                style={{
                                    marginTop: scale(16),
                                    width: '70%'
                                }}
                                onPress={doRegister}>
                                ????ng k?? ngay
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
                                B???n ???? c?? t??i kho???n?{' '}
                                <Text
                                    style={{
                                        fontSize: scale(14),
                                        color: '#0075FF',
                                        textDecorationLine: 'underline'
                                    }}>
                                    ????ng nh???p
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
                            Kh??m ph?? ngay
                        </Text>
                    </Pressable>
                </SafeAreaView> */}
            </ScrollView>
        </View>
    )
}

export default Register
