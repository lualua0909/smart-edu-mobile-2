import Axios from 'app/Axios'
import { useGlobalState } from 'app/Store'
import { AbsoluteSpinner, Input, showToast } from 'app/atoms'
import { COLORS, COURSE_IMG_PATH, ROUTES } from 'app/constants'
import { toCurrency } from 'app/helpers/utils'
import animationImg from 'assets/animations/success.json'
import momoLogo from 'assets/images/MoMo_Logo.png'
import React, { useEffect, useState } from 'react'

import LottieView from 'lottie-react-native'
import { Linking, Pressable, View } from 'react-native'

import creditCard from 'assets/images/credit-card.png'
import {
    Box,
    Button,
    Center,
    HStack,
    Heading,
    Image,
    Text,
    VStack
} from 'native-base'

// import AddVoucher from './AddVoucher'

const PackagePayment = ({ navigation, route }) => {
    const { id, title, price } = route.params
    const [loading, setLoading] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    // const [selected, setSelected] = useGlobalState('voucherSelected')
    const [successScreen, setSuccessScreen] = useState(false)

    useEffect(() => {
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
            redirect: `ifa_smart_training://PackagePayment?price=${price}&&title=${title}`,
            requestType,
            carts: [{ product_id: id, price, description: title }]
        }

        Axios.post('payment/momo/create-order', params)
            .then(res => {
                if (res?.data?.status === 200) {
                    Linking.openURL(res?.data?.data?.payUrl)
                }
            })
            .catch(err => {
                console.log(err)
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
                <Heading
                    color="primary.50"
                    style={{
                        fontWeight: 'bold',
                        fontSize: 24
                    }}>
                    Thanh toán thành công
                </Heading>
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
            <Box w="100%" px={5} justifyContent="space-between" gói>
                <VStack space={3} w="100%">
                    <Image
                        resizeMode="contain"
                        source={{
                            uri: `${COURSE_IMG_PATH}${id}.webp`
                        }}
                        style={{
                            height: 150,
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10
                        }}
                        fallbackSource={require('assets/images/fallback.jpg')}
                        alt="image"
                    />
                    <Text fontWeight="medium">{title}</Text>
                    <HStack alignItems="center" justifyContent="space-between">
                        <Text fontWeight="medium">Giá tiền</Text>
                        <Text color="blueGray.400">
                            {toCurrency(parseInt(price))} VNĐ
                        </Text>
                    </HStack>
                    {/* {selected && (
                        <HStack
                            alignItems="center"
                            justifyContent="space-between">
                            <Text fontWeight="medium">Giảm giá</Text>
                            <Text color="blueGray.400">
                                {toCurrency(1000000)}
                            </Text>
                        </HStack>
                    )} */}
                    <HStack alignItems="center" justifyContent="space-between">
                        <Text fontWeight="medium">Tổng thanh toán</Text>
                        <Text color="green.500">
                            {toCurrency(parseInt(price))} VNĐ
                        </Text>
                    </HStack>
                    {/* <Input
                        value={selected || 'Chưa chọn voucher'}
                        InputRightElement={
                            <Button
                                variant="link"
                                size="sm"
                                onPress={() => setModalVisible(true)}>
                                Chọn voucher
                            </Button>
                        }
                    /> */}
                    <VStack space={2} mt="2">
                        <Text bold>Phương thức thanh toán</Text>
                        <Button.Group isAttached variant="unstyled">
                            <Button>
                                <Image
                                    size={'xs'}
                                    resizeMode="cover"
                                    source={momoLogo}
                                    alt={'Alternate Text '}
                                />
                            </Button>
                            <Button
                                variant="ghost"
                                colorScheme="gray"
                                onPress={() =>
                                    makePayment({
                                        requestType: 'captureWallet'
                                    })
                                }>
                                Thanh toán bằng MOMO
                            </Button>
                        </Button.Group>
                        <Button.Group isAttached variant="unstyled">
                            <Button>
                                <Image
                                    size={'xs'}
                                    resizeMode="cover"
                                    source={creditCard}
                                    alt={'Alternate Text '}
                                />
                            </Button>
                            <Button
                                variant="ghost"
                                colorScheme="gray"
                                onPress={() =>
                                    makePayment({ requestType: 'payWithATM' })
                                }>
                                Thẻ ATM nội địa
                            </Button>
                        </Button.Group>
                    </VStack>
                </VStack>
            </Box>
            {/* <AddVoucher
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
            /> */}
        </View>
    )
}

export default PackagePayment
