import axios from 'app/Axios'
import {
    AbsoluteSpinner,
    Button,
    Center,
    HStack,
    Text,
    VStack,
    showToast
} from 'app/atoms'
import { COURSE_IMG_PATH } from 'app/constants'
import { isIOS, toCurrency } from 'app/helpers/utils'
import animationImg from 'assets/animations/success.json'
import momoLogo from 'assets/images/MoMo_Logo.png'
import React, { useEffect, useState } from 'react'

import LottieView from 'lottie-react-native'
import { Image, Linking, View } from 'react-native'

import creditCard from 'assets/images/credit-card.png'

const PackagePayment = ({ navigation, route }) => {
    const { id, title, price } = route.params
    const [loading, setLoading] = useState(false)
    const [successScreen, setSuccessScreen] = useState(false)

    useEffect(() => {
        console.log('route.params = ', route.params)
        // {"amount": "300000", "extraData": "", "message": "Giao dịch thành công.", "orderId": "24", "orderInfo": "SE24207", "orderType": "momo_wallet", "partnerCode": "MOMOXRAU20220701", "payType": "webApp", "price": "300000.00", "requestId": "SE24207", "responseTime": "1669570224300", "resultCode": "0", "signature": "b79b423db4d77eb15b44cf55c8fb8e1f087cff5c0e089a6a19053dddac730b44", "title": "Gói Standard", "transId": "2802299621"}
        if (route.params?.resultCode) {
            if (route.params?.resultCode === '0') {
                setSuccessScreen(true)
                showToast({
                    status: 'success',
                    title: route.params?.message,
                    description: 'Chúng tôi đang thiết lập khóa học của bạn'
                })
            } else {
                showToast({
                    status: 'error',
                    title: 'Thanh toán thất bại',
                    description: route.params?.message
                })
            }
        }
    }, [route.params])

    const makePayment = ({ requestType }) => {
        setLoading(true)
        const params = {
            redirect: `${
                isIOS ? 'IfaSmartTraining' : 'ifa_smart_training'
            }://PackagePayment?price=${price}&&title=${title}`,
            requestType,
            carts: [{ product_id: id, price, description: title }]
        }

        axios
            .post('payment/momo/create-order', params)
            .then(res => {
                if (res?.data?.status === 200) {
                    Linking.openURL(res?.data?.data?.payUrl)
                }
            })
            .finally(() => setLoading(false))
    }

    return successScreen ? (
        <VStack backgroundColor="white" style={{ flex: 1 }}>
            <Center>
                <LottieView
                    source={animationImg}
                    autoPlay
                    style={{ width: 300, marginTop: 20 }}
                />
                <Text
                    bold
                    color="primary.50"
                    style={{
                        fontSize: 24
                    }}>
                    Thanh toán thành công
                </Text>
                <Text
                    style={{
                        paddingHorizontal: 20,
                        paddingTop: 20,
                        fontSize: 16
                    }}>
                    Bạn vui lòng đợi xác nhận giao dịch trong ít phút nhé
                </Text>
                <Text style={{ paddingHorizontal: 20, fontSize: 16 }}>
                    Khóa học sẽ sớm tự động thêm vào và thông báo đến bạn
                </Text>
                <Button mt={5} onPress={() => navigation.navigate('Home')}>
                    Về trang chủ
                </Button>
            </Center>
        </VStack>
    ) : (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <AbsoluteSpinner loading={loading} />
            <Center>
                <Image
                    resizeMode="contain"
                    source={{
                        uri: `${COURSE_IMG_PATH}${id}.webp`
                    }}
                    style={{
                        width: '100%',
                        aspectRatio: 16 / 9
                    }}
                    fallbackSource={require('assets/images/fallback.jpg')}
                    alt="image"
                />
            </Center>
            <VStack space={10} style={{ marginHorizontal: 20, marginTop: 20 }}>
                <Text bold style={{ fontSize: 17 }}>
                    {title}
                </Text>
                <HStack>
                    <Text bold style={{ fontSize: 18 }}>
                        Tổng thanh toán:{' '}
                    </Text>
                    <Text bold style={{ fontSize: 18, color: '#52B553' }}>
                        {toCurrency(parseInt(price))}đ
                    </Text>
                </HStack>
                <Text bold style={{ fontSize: 18 }}>
                    Phương thức thanh toán
                </Text>
                <HStack>
                    <Image
                        source={momoLogo}
                        alt={'Alternate Text '}
                        style={{ height: 40, width: 40 }}
                    />
                    <Button
                        outlined
                        onPress={() =>
                            makePayment({
                                requestType: 'captureWallet'
                            })
                        }>
                        <Text style={{ fontSize: 16 }}>
                            Thanh toán bằng MOMO
                        </Text>
                    </Button>
                </HStack>
                <HStack>
                    <Image
                        style={{ height: 40, width: 40 }}
                        source={creditCard}
                        alt={'Alternate Text '}
                    />
                    <Button
                        outlined
                        onPress={() =>
                            makePayment({ requestType: 'payWithATM' })
                        }>
                        <Text style={{ fontSize: 16 }}>Thẻ ATM nội địa</Text>
                    </Button>
                </HStack>
            </VStack>
        </View>
    )
}

export default PackagePayment
