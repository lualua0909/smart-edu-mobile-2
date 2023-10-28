import { COLORS, ROUTES } from 'app/constants'
import { scale } from 'app/helpers/responsive'
import { toCurrency } from 'app/helpers/utils'
import React, { useState } from 'react'

import { useNavigation } from '@react-navigation/native'
import { Image, Switch } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-virtualized-view'

import { ChevronRightIcon, Pressable, Text, View } from 'native-base'

const Payment = () => {
    const navigation = useNavigation()
    const [isEnabled, setIsEnabled] = useState(true)
    const [viewHeight, setViewHeight] = useState({
        footer: 0
    })
    return (
        <>
            <View
                style={{
                    backgroundColor: '#E5E5E5',
                    marginBottom: scale(110)
                }}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    stickyHeaderIndices={[1]}>
                    <View
                        style={{
                            backgroundColor: '#FFFFFF',
                            marginTop: scale(8)
                        }}>
                        <Image
                            source={{
                                uri: 'https://phplaravel-695396-2297336.cloudwaysapps.com/public/courses/91.webp?0.3996675997251453'
                            }}
                            style={{
                                height: scale(215),
                                margin: scale(10)
                            }}
                            alt="image"
                        />
                        <View
                            style={{
                                paddingHorizontal: scale(15),
                                paddingVertical: scale(10)
                            }}>
                            <Text
                                numberOfLines={3}
                                style={{
                                    fontSize: scale(18),
                                    color: '#333'
                                }}>
                                Kế hoạch và thực thi công việc hiệu quả
                            </Text>
                        </View>
                    </View>
                    <View></View>
                    <View
                        style={{
                            paddingHorizontal: scale(16),
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            backgroundColor: '#FFFFFF',
                            marginTop: scale(8),
                            height: scale(60)
                        }}>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                            <Text
                                style={{
                                    fontSize: scale(16),
                                    color: '#0E564D',
                                    marginLeft: scale(8),
                                    textTransform: 'uppercase'
                                }}>
                                SE Voucher
                            </Text>
                        </View>
                        <Pressable
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}
                            onPress={() => navigation.navigate(ROUTES.Voucher)}>
                            <Text
                                style={{
                                    fontSize: scale(16),
                                    color: '#A3A3A3'
                                }}>
                                Chọn hoặc nhập mã
                            </Text>
                            <ChevronRightIcon
                                color="#A3A3A3"
                                style={{
                                    marginRight: scale(-20),

                                    fontSize: scale(16)
                                }}
                            />
                        </Pressable>
                    </View>
                    <View
                        style={{
                            paddingHorizontal: scale(16),
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            backgroundColor: '#FFFFFF',
                            marginTop: scale(8),
                            height: scale(60)
                        }}>
                        {/* <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                            <Text
                                style={{
                                    fontSize: scale(16),
                                    color: '#0E564D',
                                    marginLeft: scale(8),
                                    textTransform: 'uppercase'
                                }}>
                                Dùng 30.000 SE xu
                            </Text>
                        </View> */}
                        <Pressable
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                            <Text
                                style={{
                                    fontSize: scale(16),
                                    color: '#52B553',
                                    marginRight: scale(10)
                                }}>
                                {toCurrency(-30000)}
                            </Text>
                            <Switch
                                trackColor={{
                                    false: '#767577',
                                    true: '#4DD865'
                                }}
                                thumbColor={isEnabled ? '#FFFFFF' : '#f4f3f4'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={() => setIsEnabled(!isEnabled)}
                                value={isEnabled}
                            />
                        </Pressable>
                    </View>
                    <View
                        style={{
                            paddingHorizontal: scale(16),
                            paddingVertical: scale(10),
                            backgroundColor: '#FFFFFF',
                            marginTop: scale(8)
                        }}>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                backgroundColor: '#FFFFFF',
                                marginTop: scale(8)
                            }}>
                            {/* <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}>
                                <Text
                                    style={{
                                        fontSize: scale(16),
                                        color: '#0E564D',
                                        marginLeft: scale(8),
                                        textTransform: 'uppercase'
                                    }}>
                                    Phương thức thanh toán
                                </Text>
                            </View> */}
                            <Pressable
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}>
                                <Text
                                    style={{
                                        fontSize: scale(16),
                                        color: '#A3A3A3'
                                    }}>
                                    Chọn
                                </Text>
                                <ChevronRightIcon
                                    color="#A3A3A3"
                                    style={{
                                        marginRight: scale(-20),

                                        fontSize: scale(16)
                                    }}
                                />
                            </Pressable>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                backgroundColor: '#FFFFFF',
                                marginTop: scale(8)
                            }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}>
                                <Text
                                    style={{
                                        fontSize: scale(16),
                                        color: '#000000',
                                        marginLeft: scale(8)
                                    }}>
                                    Tổng tiền
                                </Text>
                            </View>
                            <Pressable
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}>
                                <Text
                                    style={{
                                        fontSize: scale(16),
                                        color: '#000000'
                                    }}>
                                    {toCurrency(840000)}đ
                                </Text>
                            </Pressable>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                backgroundColor: '#FFFFFF',
                                marginTop: scale(8)
                            }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}>
                                <Text
                                    style={{
                                        fontSize: scale(16),
                                        color: '#000000',
                                        marginLeft: scale(8)
                                    }}>
                                    Voucher
                                </Text>
                            </View>
                            <Pressable
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}>
                                <Text
                                    style={{
                                        fontSize: scale(16),
                                        color: '#000000'
                                    }}>
                                    {toCurrency(-100000)}đ
                                </Text>
                            </Pressable>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                backgroundColor: '#FFFFFF',
                                marginTop: scale(8)
                            }}>
                            {/* <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}>
                                <Text
                                    style={{
                                        fontSize: scale(16),
                                        color: '#000000',
                                        marginLeft: scale(8)
                                    }}>
                                    SE xu
                                </Text>
                            </View> */}
                            <Pressable
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}>
                                <Text
                                    style={{
                                        fontSize: scale(16),
                                        color: '#000000'
                                    }}>
                                    {toCurrency(-30000)}đ
                                </Text>
                            </Pressable>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                backgroundColor: '#FFFFFF',
                                marginTop: scale(8)
                            }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}>
                                <Text
                                    style={{
                                        fontSize: scale(16),
                                        color: '#000000',
                                        marginLeft: scale(8)
                                    }}>
                                    Thanh toán
                                </Text>
                            </View>
                            <Pressable
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}>
                                <Text
                                    style={{
                                        fontSize: scale(16),
                                        color: '#000000'
                                    }}>
                                    {toCurrency(710000)}đ
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                    <View
                        style={{
                            paddingHorizontal: scale(16),
                            alignItems: 'center',
                            backgroundColor: '#FFFFFF',
                            marginTop: scale(8),
                            paddingVertical: scale(15)
                        }}>
                        <Text
                            style={{
                                fontSize: scale(16),
                                color: '#000000'
                            }}>
                            Nhấn “Đặt hàng” đồng nghĩa với việc bạn đồng ý tuân
                            theo điều khoản SmartEdu
                        </Text>
                    </View>
                </ScrollView>
            </View>
            <SafeAreaView
                onLayout={e =>
                    setViewHeight({
                        ...viewHeight,
                        footer: e.nativeEvent.layout.height
                    })
                }
                edges={['bottom']}
                style={[
                    {
                        position: 'absolute',
                        bottom: 0,
                        width: '100%',
                        paddingBottom: scale(3),
                        paddingHorizontal: scale(20)
                    }
                ]}>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: scale(5),
                        justifyContent: 'space-between'
                    }}>
                    <View
                        style={{
                            paddingVertical: scale(12)
                        }}>
                        <Text
                            style={{
                                fontSize: scale(14),
                                color: '#4E555C'
                            }}>
                            Tổng tiền
                        </Text>
                        <Text
                            style={{
                                fontSize: scale(16),
                                color: '#363E57'
                            }}>
                            {toCurrency(710000)}đ
                        </Text>
                    </View>
                    <Pressable
                        style={{
                            width: '60%',
                            borderWidth: 1,
                            borderColor: COLORS.green,
                            paddingVertical: scale(12),
                            borderRadius: scale(10),
                            alignItems: 'center',
                            backgroundColor: COLORS.green
                        }}>
                        <Text
                            style={{
                                fontSize: scale(18),
                                color: '#fff'
                            }}>
                            Thanh toán
                        </Text>
                    </Pressable>
                </View>
            </SafeAreaView>
        </>
    )
}

export default Payment
