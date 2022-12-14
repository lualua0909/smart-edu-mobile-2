import Swipeout from 'app/components/SwipeOut'
import { COURSE_IMG_PATH, ROUTES } from 'app/constants'
import { scale } from 'app/helpers/responsive'
import { getData, storeData, toCurrency } from 'app/helpers/utils'
import { svgRedDelete } from 'assets/svg'
import React, { useState } from 'react'

import { useNavigation } from '@react-navigation/native'
import { View } from 'react-native'
import { SvgXml } from 'react-native-svg'

import { Button, Image, Modal, Pressable, Text, useToast } from 'native-base'

const CartItem = ({ course, index }) => {
    const toast = useToast()
    const navigation = useNavigation()
    const [showModal, setShowModal] = useState(false)

    const removeFromCart = async () => {
        const carts = (await getData('@cart')) || []
        storeData(
            '@cart',
            Array.isArray(carts) ? carts?.filter(i => i.id !== course?.id) : []
        )

        toast.show({
            title: 'Đã xóa khóa học khỏi giỏ hàng',
            status: 'error',
            placement: 'top'
        })

        navigation.replace(ROUTES.Carts, null, null, Math.random().toString())
    }

    const deleteButton = (
        <Pressable
            style={{
                width: scale(70),
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#fff',
                borderLeftWidth: scale(1),
                borderColor: '#E5E5E5',
                marginRight: scale(2)
            }}
            onPress={removeFromCart}>
            <SvgXml
                xml={svgRedDelete}
                width={scale(28)}
                height={scale(28)}
                style={{
                    alignItems: 'center',
                    color: '#F13642',
                    marginTop: scale(5)
                }}
            />
            <Text
                style={{
                    alignItems: 'center',
                    color: '#F13642',
                    marginTop: scale(5)
                }}>
                Xóa
            </Text>
        </Pressable>
    )

    const renderPrice =
        !course?.old_price > 0 && course?.new_price > 0 ? (
            <>
                <Text
                    style={{
                        textDecorationLine: 'line-through',
                        fontSize: scale(16),
                        color: '#1D1D1D'
                    }}>
                    {toCurrency(course?.old_price)} đ
                </Text>
                <Text
                    style={{
                        color: '#1DA736',
                        fontSize: scale(16)
                    }}>
                    {toCurrency(course?.new_price)} đ
                </Text>
            </>
        ) : (
            <>
                <Text
                    style={{
                        color: '#1DA736',
                        fontSize: scale(16)
                    }}>
                    {toCurrency(course?.new_price)} đ
                </Text>
            </>
        )

    return (
        <Swipeout arrayButton={[deleteButton]} buttonWidth={scale(80)}>
            <Pressable
                style={{
                    backgroundColor: '#FFFFFF',
                    padding: scale(10),
                    paddingTop: scale(3)
                }}>
                <View
                    style={{
                        flexDirection: 'row',
                        borderTopWidth: index === 0 ? 0 : 1,
                        borderColor: '#E6E6E6',
                        paddingTop: 10
                    }}>
                    <View style={{ width: scale(114) }}>
                        <Image
                            resizeMode="contain"
                            source={{
                                uri: `${COURSE_IMG_PATH}${course?.id}.webp`
                            }}
                            style={{
                                width: '100%',
                                height: scale(60)
                            }}
                            defaultSource={require('assets/images/menu-banner.jpg')}
                        />
                    </View>
                    <View style={{ flex: 1, marginLeft: scale(12) }}>
                        <Text
                            numberOfLines={3}
                            style={{
                                fontSize: scale(14),
                                color: '#1F1F1F'
                            }}>
                            {course?.title}
                        </Text>
                    </View>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                    {/* {renderPrice} */}
                    <View></View>
                    <Button
                        // onPress={() => navigation.navigate(ROUTES.Payment)}
                        onPress={() => setShowModal(true)}>
                        Thanh toán
                    </Button>
                </View>
                <UpdateAlert
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}
                />
            </Pressable>
        </Swipeout>
    )
}

export default CartItem

const UpdateAlert = ({ isOpen, onClose }) => (
    <Modal isOpen={isOpen} onClose={onClose}>
        <Modal.Content maxWidth="400px">
            <Modal.CloseButton />
            <Modal.Header>Thông báo</Modal.Header>
            <Modal.Body>
                <Text>
                    Chức năng này đang được phát triển, vui lòng quay lại sau
                </Text>
            </Modal.Body>
        </Modal.Content>
    </Modal>
)
