import React from 'react'
import { View, Text, Pressable, Image } from 'react-native'
import { scale } from 'app/helpers/responsive'
import { useNavigation } from '@react-navigation/native'
import { FONTS, ROUTES, COURSE_IMG_PATH } from 'app/constants'
import { toCurrency, storeData, getData } from 'app/helpers/utils'
import { SvgXml } from 'react-native-svg'
import Swipeout from 'app/components/SwipeOut'
import { svgRedDelete } from 'assets/svg'
import { useToast } from 'native-base'

const CartItem = ({ course, index }) => {
    const toast = useToast()
    const navigation = useNavigation()

    const removeFromCart = async () => {
        const carts = (await getData('@cart')) || []
        storeData(
            '@cart',
            Array.isArray(carts)
                ? carts?.filter((i) => i.id !== course?.id)
                : []
        )

        toast.show({
            title: 'Đã xóa khóa học khỏi giỏ hàng',
            status: 'error',
            placement: 'top',
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
                marginRight: scale(2),
            }}
            onPress={removeFromCart}
        >
            <SvgXml
                xml={svgRedDelete}
                width={scale(28)}
                height={scale(28)}
                style={{
                    alignItems: 'center',
                    color: '#F13642',
                    marginTop: scale(5),
                    fontFamily: FONTS.MulishBold,
                }}
            />
            <Text
                style={{
                    alignItems: 'center',
                    color: '#F13642',
                    marginTop: scale(5),
                    fontFamily: FONTS.MulishBold,
                }}
            >
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
                        color: '#1D1D1D',
                        fontFamily: FONTS.Mulish,
                    }}
                >
                    {toCurrency(course?.old_price)} đ
                </Text>
                <Text
                    style={{
                        color: '#1DA736',
                        fontSize: scale(16),
                        fontFamily: FONTS.MulishBold,
                    }}
                >
                    {toCurrency(course?.new_price)} đ
                </Text>
            </>
        ) : (
            <>
                <Text
                    style={{
                        color: '#1DA736',
                        fontSize: scale(16),
                        fontFamily: FONTS.MulishBold,
                    }}
                >
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
                    paddingTop: scale(3),
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        borderTopWidth: index === 0 ? 0 : 1,
                        borderColor: '#E6E6E6',
                        paddingTop: 10,
                    }}
                >
                    <View style={{ width: scale(114) }}>
                        <Image
                            resizeMode="contain"
                            source={{
                                uri: `${COURSE_IMG_PATH}${course?.id}.webp`,
                            }}
                            style={{
                                width: '100%',
                                height: scale(60),
                            }}
                            defaultSource={require('assets/images/menu-banner.jpg')}
                        />
                    </View>
                    <View style={{ flex: 1, marginLeft: scale(12) }}>
                        <Text
                            numberOfLines={3}
                            style={{
                                fontFamily: FONTS.MulishBold,
                                fontSize: scale(14),
                                color: '#1F1F1F',
                            }}
                        >
                            {course?.title}
                        </Text>
                    </View>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    {renderPrice}
                    <Pressable
                        style={{
                            backgroundColor: '#52B553',
                            padding: 10,
                            alignContent: 'center',
                            alignSelf: 'center',
                            borderRadius: 5,
                        }}
                        onPress={() => navigation.navigate(ROUTES.Payment)}
                    >
                        <Text style={{ color: '#FFFFFF', fontSize: scale(16) }}>
                            Thanh toán
                        </Text>
                    </Pressable>
                </View>
            </Pressable>
        </Swipeout>
    )
}

export default CartItem
