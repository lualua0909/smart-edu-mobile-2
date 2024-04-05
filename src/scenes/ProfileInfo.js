import axios from 'app/Axios'
import { getGlobalState } from 'app/Store'
import {
    AbsoluteSpinner,
    Avatar,
    Button,
    DetailSkeleton,
    HStack,
    Input,
    VStack,
    showToast
} from 'app/atoms'
import { API_URL } from 'app/constants'
import { scale } from 'app/helpers/responsive'
import { clearDataAfterLogout } from 'app/helpers/utils'
import React, { useEffect, useRef, useState } from 'react'

import { Image, Pressable, ScrollView, View } from 'react-native'
import { Camera } from 'react-native-feather'
import ImagePicker from 'react-native-image-crop-picker'

import { AlertDialog, Center, Radio } from 'native-base'

const ProfileInfo = () => {
    const userInfo = getGlobalState('userInfo')
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({})
    const [avtUploaded, setAvtUploaded] = useState()
    const [bannerUploaded, setBannerUploaded] = useState()
    const [errors, setErrors] = useState({})
    const random = getGlobalState('random')
    const [isOpen, setIsOpen] = useState(false)

    const onClose = () => {
        setIsOpen(false)
    }
    const cancelRef = useRef(null)

    useEffect(() => {
        axios
            .get(`get-user-info/${userInfo?.id}`)
            .then(res => {
                if (res.status === 200) {
                    const data = res.data.data
                    setData(data)
                }
            })
            .finally(() => setLoading(false))
    }, [])

    if (!data) {
        return <DetailSkeleton />
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

    const validate = (fieldName, value) => {
        if (!value) {
            setErrors({ ...errors, [fieldName]: 'Vui lòng không bỏ trống' })
            return false
        }

        setErrors(null)

        return true
    }

    const onSubmit = (fieldName, value) => {
        if (validate(fieldName, value)) {
            setLoading(true)
            axios
                .post(`users/update-by-field`, {
                    field: fieldName,
                    value: value
                })
                .then(res => {
                    if (res.data.status === 200) {
                        showToast({
                            description: 'Cập nhật thành công'
                        })
                    }
                })
                .catch(err => {
                    showToast({
                        description: err?.message
                    })
                })
                .finally(() => setLoading(false))
        }
    }

    const changeValue = (field, value) => {
        const newData = { ...data, [field]: value }
        setData(newData)
    }

    const uploadBanner = (image, type) => {
        setLoading(true)
        axios
            .post('users/upload-avatar', {
                image,
                type
            })
            .then(res => {
                if (type === 1) {
                    setAvtUploaded(image)
                } else {
                    setBannerUploaded(image)
                }
            })
            .finally(() => setLoading(false))
    }

    return (
        <>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <AbsoluteSpinner loading={loading} />
                <View
                    style={{
                        alignItems: 'center',
                        paddingBottom: 30
                    }}>
                    <Image
                        alt="profile info"
                        source={{
                            uri:
                                bannerUploaded ||
                                `${API_URL}public/user-avatars/${userInfo?.id}-cover.webp?rand=${random}`
                        }}
                        fallbackSource={require('assets/images/fallback.jpg')}
                        style={{
                            width: '100%',
                            position: 'absolute',
                            height: scale(210)
                        }}
                        resizeMode="cover"
                    />
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            paddingRight: scale(20),
                            position: 'absolute',
                            width: '100%',
                            marginTop: scale(170)
                        }}>
                        <Pressable
                            style={{
                                backgroundColor: '#aaa',
                                borderRadius: 50,
                                padding: 5
                            }}
                            onPress={() =>
                                ImagePicker.openPicker({
                                    width: 300,
                                    height: 300,
                                    includeBase64: true
                                }).then(image => {
                                    uploadBanner(
                                        `data:${image.mime};base64,${image.data}`,
                                        2
                                    )
                                })
                            }>
                            <Camera width={18} height={18} color="#fff" />
                        </Pressable>
                    </View>
                    <View>
                        <View
                            style={{
                                borderRadius: scale(120),
                                borderWidth: scale(2),
                                borderColor: '#fff',
                                marginTop: '40%'
                            }}>
                            {avtUploaded ? (
                                <Image
                                    size="120"
                                    borderRadius={100}
                                    source={{
                                        uri: avtUploaded
                                    }}
                                    alt="image"
                                />
                            ) : (
                                <Avatar userId={data?.id} size={120} />
                            )}
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'flex-end',
                                marginTop: scale(-40)
                            }}>
                            <Pressable
                                style={{
                                    backgroundColor: '#aaa',
                                    borderRadius: 50,
                                    padding: 5
                                }}
                                onPress={() =>
                                    ImagePicker.openPicker({
                                        width: 300,
                                        height: 300,
                                        cropping: true,
                                        includeBase64: true
                                    }).then(image => {
                                        uploadBanner(
                                            `data:${image.mime};base64,${image.data}`,
                                            1
                                        )
                                    })
                                }>
                                <Camera width={18} height={18} color="#fff" />
                            </Pressable>
                        </View>
                    </View>
                    <VStack
                        gap={15}
                        style={{
                            width: '100%',
                            paddingHorizontal: 20
                        }}>
                        <Input
                            label="Họ"
                            allowClear
                            value={data?.first_name}
                            onChangeText={value =>
                                changeValue('first_name', value)
                            }
                            onEndEditing={e =>
                                onSubmit('first_name', e.nativeEvent.text)
                            }
                            error={errors?.first_name}
                        />
                        <Input
                            label="Tên"
                            allowClear
                            value={data?.last_name}
                            onChangeText={value =>
                                changeValue('last_name', value)
                            }
                            onEndEditing={e =>
                                onSubmit('last_name', e.nativeEvent.text)
                            }
                            error={errors?.last_name}
                        />
                        <Input label="Email" value={data.email} isDisabled />
                        <Radio.Group
                            value={data?.gender}
                            onChange={selectedValue =>
                                changeValue('gender', selectedValue)
                            }>
                            <HStack space={10}>
                                <Radio
                                    value={1}
                                    size="sm"
                                    onPress={e => onSubmit('gender', 1)}>
                                    Nam
                                </Radio>
                                <Radio
                                    value={2}
                                    size="sm"
                                    onPress={e => onSubmit('gender', 2)}>
                                    Nữ
                                </Radio>
                            </HStack>
                        </Radio.Group>
                        <Input
                            label="Địa chỉ"
                            allowClear
                            value={data?.address}
                            onChangeText={value =>
                                changeValue('address', value)
                            }
                            onEndEditing={e =>
                                onSubmit('address', e.nativeEvent.text)
                            }
                            error={errors?.address}
                        />
                        <Input
                            label="Công ty"
                            allowClear
                            value={data?.partner}
                            onChangeText={value =>
                                changeValue('partner', value)
                            }
                            onEndEditing={e =>
                                onSubmit('partner', e.nativeEvent.text)
                            }
                            error={errors?.partner}
                        />
                        <Input
                            label="Chức vụ"
                            allowClear
                            value={data?.position}
                            onChangeText={value =>
                                changeValue('position', value)
                            }
                            onEndEditing={e =>
                                onSubmit('position', e.nativeEvent.text)
                            }
                            error={errors?.position}
                        />
                        <Input
                            label="Bộ phận"
                            allowClear
                            value={data?.department}
                            onChangeText={value =>
                                changeValue('department', value)
                            }
                            onEndEditing={e =>
                                onSubmit('department', e.nativeEvent.text)
                            }
                            error={errors?.department}
                        />

                        <Input
                            label="Tài khoản đăng nhập"
                            isDisabled
                            value={data?.username}
                            error={errors?.username}
                        />
                        <Center>
                            <Button onPress={() => setIsOpen(!isOpen)}>
                                Xóa tài khoản
                            </Button>
                        </Center>
                    </VStack>
                </View>
            </ScrollView>
            <DeleteUserPopup
                isOpen={isOpen}
                onClose={onClose}
                cancelRef={cancelRef}
                onConfirm={deactiveAccount}
            />
        </>
    )
}

export default ProfileInfo

const DeleteUserPopup = ({ cancelRef, onClose, isOpen, onConfirm }) => (
    <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={onClose}>
        <AlertDialog.Content>
            <AlertDialog.CloseButton />
            <AlertDialog.Header>Xóa tài khoản</AlertDialog.Header>
            <AlertDialog.Body>
                Tài khoản của bạn sẽ bị xóa tạm thời và sẽ xóa vĩnh viễn sau 30
                ngày. Bạn có chắc chắn muốn xóa tài khoản này không?
            </AlertDialog.Body>
            <AlertDialog.Footer>
                <Button.Group space={2}>
                    <Button colorScheme="danger" onPress={onConfirm}>
                        Xóa tài khoản
                    </Button>
                </Button.Group>
            </AlertDialog.Footer>
        </AlertDialog.Content>
    </AlertDialog>
)
