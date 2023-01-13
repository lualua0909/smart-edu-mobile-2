import { useGlobalState } from 'app/Store'
import { Avatar, DetailSkeleton, Input, showToast } from 'app/atoms'
import axios from 'app/axios'
import { API_URL } from 'app/constants'
import { scale } from 'app/helpers/responsive'
import { clearDataAfterLogout } from 'app/helpers/utils'
import React, { useEffect, useState } from 'react'

import { ScrollView, View } from 'react-native'

import { Button, Center, Image, Radio, VStack } from 'native-base'

const ProfileInfo = ({ route }) => {
    const [userInfo, _] = useGlobalState('userInfo')
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({})

    const [errors, setErrors] = useState(null)
    const [random, setRandom] = useGlobalState('random')

    const name = `${data?.first_name} ${data?.last_name}`

    useEffect(() => {
        axios
            .get(`get-user-info/${userInfo?.id}`)
            .then(res => {
                if (res.data.status === 200) {
                    const data = res.data.data
                    setData(data)
                }
            })
            .finally(() => setLoading(false))
    }, [])

    if (loading || !data) {
        return <DetailSkeleton />
    }

    const validate = () => {
        if (data.name === undefined) {
            setErrors({ ...errors, name: 'Name is required' })
            return false
        } else if (data.name.length < 4) {
            setErrors({ ...errors, name: 'Name is too short' })
            return false
        }

        return true
    }

    const deactiveAccount = () => {
        setLoading(true)
        axios
            .get(`deactive-user`)
            .then(res => {
                if (res.data.status === 200) {
                    showToast({
                        title: 'Thông báo',
                        description: res?.data?.message,
                        status: 'success'
                    })

                    clearDataAfterLogout()
                }
            })
            .catch(err => {
                showToast({
                    title: 'Thông báo',
                    description: err?.message,
                    status: 'error'
                })
            })
            .finally(() => setLoading(false))
    }

    const onSubmit = () => {
        if (validate()) {
            setErrors(null)
        }
    }

    const changeValue = (field, value) => {
        const newData = { ...data, [field]: value }
        setData(newData)
    }

    return (
        <>
            <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
                <View
                    style={{
                        alignItems: 'center',
                        paddingBottom: 30
                    }}>
                    <Image
                        alt="menu-banner.jpg'"
                        source={{
                            uri: `${API_URL}public/user-avatars/${userInfo?.id}-cover.webp?rand=${random}`
                        }}
                        fallbackSource={require('assets/images/fallback.jpg')}
                        style={{
                            width: '100%',
                            position: 'absolute',
                            height: scale(210)
                        }}
                        resizeMode="cover"
                    />
                    {/* <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            paddingRight: scale(20),
                            position: 'absolute',
                            width: '100%',
                            marginTop: scale(170),
                        }}
                    >
                        <Pressable
                            style={{
                                backgroundColor: '#aaa',
                                borderRadius: 50,
                                padding: 5,
                            }}
                        >
                            <Ionicons
                                name="cloud-upload"
                                color="white"
                                size={16}
                            />
                        </Pressable>
                    </View> */}
                    <View>
                        <View
                            style={{
                                borderRadius: scale(120),
                                borderWidth: scale(2),
                                borderColor: '#fff',
                                marginTop: '40%'
                            }}>
                            <Avatar userId={data?.id} size="120" name={name} />
                        </View>
                        {/* <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'flex-end',
                                marginTop: scale(-40),
                            }}
                        >
                            <Pressable
                                style={{
                                    backgroundColor: '#aaa',
                                    borderRadius: 50,
                                    padding: 5,
                                }}
                            >
                                <Ionicons
                                    name="md-camera"
                                    color="white"
                                    size={16}
                                />
                            </Pressable>
                        </View> */}
                    </View>
                    <Center style={{ marginTop: 20 }}>
                        <VStack width="90%" mx="3" maxW="300px" space="3">
                            <Button
                                colorScheme="red"
                                onPress={deactiveAccount}
                                variant="outline">
                                Xóa tài khoản
                            </Button>
                            <Input
                                label="Họ"
                                w={'100%'}
                                value={data?.first_name}
                                onChangeText={value =>
                                    changeValue('first_name', value)
                                }
                                error={errors?.name}
                            />
                            <Input
                                label="Tên"
                                w={'100%'}
                                value={data?.last_name}
                                error={errors?.name}
                            />
                            {/* <Input
                                label="Số điện thoại"
                                isDisabled
                                w={'100%'}
                                value={data?.phone}
                                error={errors?.phone}
                            /> */}
                            <Input
                                label="Email"
                                isDisabled
                                w={'100%'}
                                value={data?.email}
                                error={errors?.email}
                            />
                            {/* <DateTimePicker
                                isDisabled
                                date={new Date(data?.birthday)}
                                inputProps={{
                                    error: errors?.birthday,
                                    label: 'Ngày sinh',
                                }}
                                onChange={(event, selectedDate) => {
                                    const old = dayjs(new Date()).diff(
                                        selectedDate,
                                        'year'
                                    )
                                    if (old > 10) {
                                        changeValue('birthday', selectedDate)
                                        setErrors({ ...errors, birthday: null })
                                    } else {
                                        setErrors({
                                            ...errors,
                                            birthday:
                                                'Người dùng phải lớn hơn 10 tuổi',
                                        })
                                    }
                                }}
                            /> */}
                            <Radio.Group
                                name="myRadioGroup"
                                accessibilityLabel="favorite number"
                                value={data?.gender}
                                onChange={selectedValue =>
                                    changeValue('gender', selectedValue)
                                }>
                                <Radio value={1} my={1} size="sm" isDisabled>
                                    Nam
                                </Radio>
                                <Radio value={2} size="sm" isDisabled>
                                    Nữ
                                </Radio>
                            </Radio.Group>
                            <Input
                                label="Địa chỉ"
                                isDisabled
                                w={'100%'}
                                value={data?.address}
                                error={errors?.address}
                            />
                            <Input
                                label="Công ty"
                                isDisabled
                                w={'100%'}
                                value={data?.partner}
                                error={errors?.partner}
                            />
                            <Input
                                label="Chức vụ"
                                isDisabled
                                w={'100%'}
                                value={data?.position}
                                error={errors?.position}
                            />
                            <Input
                                label="Bộ phận"
                                isDisabled
                                w={'100%'}
                                value={data?.department}
                                error={errors?.department}
                            />

                            <Input
                                label="Tài khoản đăng nhập"
                                isDisabled
                                w={'100%'}
                                value={data?.username}
                                error={errors?.username}
                            />

                            {/* <Button onPress={onSubmit} mt="5">
                                Thay đổi thông tin
                            </Button> */}
                        </VStack>
                    </Center>
                </View>
            </ScrollView>
        </>
    )
}

export default ProfileInfo
