import React from 'react'
import { View, Pressable } from 'react-native'
import { scale } from 'app/helpers/responsive'
import { SvgXml } from 'react-native-svg'
import { svgCircle, svgLineDashVertical } from 'assets/svg'
import { useNavigation } from '@react-navigation/native'
import { Badge, Box } from 'native-base'
import dayjs from 'dayjs'
import { DollarSign, CreditCard } from 'react-native-feather'
import { toCurrency } from 'app/helpers/utils'
import { Text } from 'native-base'

const TransactionItem = ({ data }) => {
    const navigation = useNavigation()

    const year =
        data?.created_at !== '' ? dayjs(data?.created_at).get('year') : ''
    const month =
        data?.created_at !== '' ? dayjs(data?.created_at).get('month') + 1 : ''
    const day =
        data?.created_at !== '' ? dayjs(data?.created_at).get('date') : ''

    return (
        <Pressable
            // onPress={() =>
            //     navigation.navigate(ROUTES.CourseInfo, { id: data?.id })
            // }
            style={{ flexDirection: 'row', marginTop: 5 }}
        >
            <View style={{ width: scale(100), height: scale(114) }}>
                <View
                    style={{
                        alignSelf: 'flex-end',
                        zIndex: 1,
                    }}
                >
                    <SvgXml
                        xml={svgCircle}
                        style={{
                            color: '#9FBDF6',
                            position: 'absolute',
                            marginTop: scale(-5),
                            marginLeft: scale(-6),
                            zIndex: 2,
                        }}
                    />
                    <SvgXml
                        xml={svgLineDashVertical}
                        height="100%"
                        style={{ color: '#9FBDF6' }}
                    />
                </View>
                <View
                    style={{
                        paddingHorizontal: scale(11),
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        width: '100%',
                        position: 'absolute',
                    }}
                >
                    <View>
                        {day ? (
                            <Text
                                style={{
                                    fontSize: scale(16),
                                    color: '#000000',
                                    textAlign: 'right',
                                }}
                            >
                                Ngày {day}
                            </Text>
                        ) : null}
                        {month ? (
                            <Text
                                style={{
                                    fontSize: scale(16),
                                    color: '#6C746E',
                                    textAlign: 'right',
                                }}
                            >
                                Tháng {month}
                            </Text>
                        ) : null}
                        {year ? (
                            <Text
                                style={{
                                    fontSize: scale(16),
                                    color: '#6C746E',
                                    textAlign: 'right',
                                }}
                            >
                                {year}
                            </Text>
                        ) : null}
                    </View>
                </View>
            </View>
            <View
                style={{
                    flex: 1,
                    padding: scale(10),
                }}
            >
                <Box
                    style={{
                        backgroundColor: '#FFFFFF',
                    }}
                    rounded="lg"
                    p={3}
                    shadow={5}
                >
                    <Text
                        numberOfLines={2}
                        style={{
                            fontSize: scale(16),
                            color: '#000',
                        }}
                    >
                        {data?.order_detail[0]?.title}
                    </Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 5,
                        }}
                    >
                        <CreditCard stroke="#0E564D" width={18} height={18} />
                        <Text
                            numberOfLines={2}
                            style={{
                                fontSize: scale(14),
                                color: '#6C746E',
                                marginLeft: scale(4),
                            }}
                        >
                            {data?.tid}
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 5,
                        }}
                    >
                        <DollarSign stroke="#0E564D" width={18} height={18} />
                        <Text
                            numberOfLines={2}
                            style={{
                                fontSize: scale(14),
                                color: '#6C746E',
                                marginLeft: scale(4),
                            }}
                        >
                            {toCurrency(data?.order_detail[0]?.price)} VNĐ
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 5,
                        }}
                    >
                        <Badge
                            colorScheme={data?.status ? 'success' : 'warning'}
                            alignSelf="center"
                            variant="subtle"
                        >
                            {data?.status ? 'Đã thanh toán' : 'Chưa thanh toán'}
                        </Badge>
                    </View>
                </Box>
            </View>
        </Pressable>
    )
}

export default TransactionItem
