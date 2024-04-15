import { Badge, Card, Text } from 'app/atoms'
import { scale } from 'app/helpers/responsive'
import { toCurrency } from 'app/helpers/utils'
import { svgCircle, svgLineDashVertical } from 'assets/svg'
import dayjs from 'dayjs'
import React from 'react'

import { Pressable, View } from 'react-native'
import { CreditCard, DollarSign } from 'react-native-feather'
import { SvgXml } from 'react-native-svg'

const TransactionItem = ({ data }) => {
    const year =
        data?.created_at !== '' ? dayjs(data?.created_at).get('year') : ''
    const month =
        data?.created_at !== '' ? dayjs(data?.created_at).get('month') + 1 : ''
    const day =
        data?.created_at !== '' ? dayjs(data?.created_at).get('date') : ''

    return (
        <Pressable style={{ flexDirection: 'row', marginTop: 5 }}>
            <View style={{ width: scale(100), height: scale(114) }}>
                <View
                    style={{
                        alignSelf: 'flex-end',
                        zIndex: 1
                    }}>
                    <SvgXml
                        xml={svgCircle}
                        style={{
                            color: '#9FBDF6',
                            position: 'absolute',
                            marginTop: scale(-5),
                            marginLeft: scale(-6),
                            zIndex: 2
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
                        position: 'absolute'
                    }}>
                    <View>
                        {day ? (
                            <Text
                                style={{
                                    fontSize: scale(14),
                                    color: '#000000',
                                    textAlign: 'right',
                                    lineHeight: scale(20)
                                }}>
                                Ngày {day}
                            </Text>
                        ) : null}
                        {month ? (
                            <Text
                                style={{
                                    fontSize: scale(14),
                                    color: '#6C746E',
                                    textAlign: 'right',
                                    lineHeight: scale(20)
                                }}>
                                Tháng {month}
                            </Text>
                        ) : null}
                        {year ? (
                            <Text
                                style={{
                                    fontSize: scale(14),
                                    color: '#6C746E',
                                    textAlign: 'right',
                                    lineHeight: scale(20)
                                }}>
                                {year}
                            </Text>
                        ) : null}
                    </View>
                </View>
            </View>
            <View
                style={{
                    flex: 1,
                    padding: scale(10)
                }}>
                <Card
                    shadow
                    style={{
                        padding: 8
                    }}>
                    <Text
                        numberOfLines={2}
                        style={{
                            fontSize: scale(16),
                            color: '#000',
                            lineHeight: scale(20)
                        }}>
                        {data?.order_detail[0]?.title}
                    </Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 5
                        }}>
                        <CreditCard stroke="#0E564D" width={18} height={18} />
                        <Text
                            numberOfLines={2}
                            style={{
                                fontSize: scale(14),
                                color: '#6C746E',
                                marginLeft: scale(4)
                            }}>
                            {data?.tid}
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 5
                        }}>
                        <DollarSign stroke="#0E564D" width={18} height={18} />
                        <Text
                            numberOfLines={2}
                            style={{
                                fontSize: scale(14),
                                color: '#6C746E',
                                marginLeft: scale(4)
                            }}>
                            {toCurrency(data?.order_detail[0]?.price)} VNĐ
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 5
                        }}>
                        <Badge color={data?.status ? '#52B55380' : '#FF9F3380'}>
                            {data?.status ? 'Đã thanh toán' : 'Chưa thanh toán'}
                        </Badge>
                    </View>
                </Card>
            </View>
        </Pressable>
    )
}

export default TransactionItem
