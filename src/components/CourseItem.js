import { Rate, Text } from 'app/atoms'
import { COLORS, COURSE_IMG_PATH, ROUTES, STYLES } from 'app/constants'
import { scale } from 'app/helpers/responsive'
import { isIOS, toCurrency } from 'app/helpers/utils'
import { svgTriangle } from 'assets/svg'
import React from 'react'

import { useNavigation } from '@react-navigation/native'
import { View } from 'react-native'
import { SvgXml } from 'react-native-svg'

import { Image, Pressable, Progress } from 'native-base'

const CourseItem = ({
    item,
    index,
    isHorizontal,
    isMine,
    fullWidth = false
}) => {
    const navigation = useNavigation()
    const renderPrice = () => {
        if (item?.old_price > 0 && item?.new_price > 0) {
            return (
                <>
                    <Text
                        style={{
                            fontSize: scale(16),
                            color: '#1D1D1D',
                            textDecorationLine: 'line-through'
                        }}>
                        {toCurrency(item?.old_price)} đ
                    </Text>
                    <Text
                        bold
                        style={{
                            fontSize: scale(18),
                            color: '#1DA736'
                        }}>
                        {toCurrency(item?.new_price)} đ
                    </Text>
                </>
            )
        }

        if (item?.old_price > 0 && !item?.new_price) {
            return (
                <>
                    <Text />
                    <Text
                        bold
                        style={{
                            fontSize: scale(18),
                            color: '#1DA736'
                        }}>
                        {toCurrency(item?.old_price)} đ
                    </Text>
                </>
            )
        }

        return null
    }

    const renderPriceIOS = () => {
        return (
            <>
                <Text />
                <Text
                    bold
                    style={{
                        fontSize: scale(18),
                        color: '#1DA736'
                    }}>
                    {toCurrency(item?.ios_price)} đ
                </Text>
            </>
        )
    }

    return (
        <Pressable
            key={index}
            onPress={() =>
                navigation.navigate(ROUTES.CourseInfo, { id: item?.id })
            }
            style={[
                isHorizontal
                    ? {
                          width: fullWidth ? '100%' : scale(286),
                          marginRight: scale(12),
                          borderRadius: scale(10),
                          borderBottomWidth: scale(6),
                          borderBottomColor: COLORS.green,
                          marginBottom: 10
                      }
                    : {
                          borderRadius: scale(10),
                          marginBottom: scale(12)
                      },
                STYLES.boxShadow
            ]}>
            {item?.is_offline ? (
                <View
                    style={{
                        position: 'absolute',
                        right: -scale(6),
                        top: scale(8),
                        backgroundColor: '#E90F0F',
                        zIndex: 1,
                        paddingVertical: scale(2),
                        paddingHorizontal: scale(8)
                    }}>
                    <Text
                        style={{
                            fontSize: scale(12),
                            color: '#fff'
                        }}>
                        Có lớp offline
                    </Text>
                    <SvgXml
                        xml={svgTriangle}
                        width={scale(6)}
                        height={scale(4)}
                        style={{
                            position: 'absolute',
                            right: 0,
                            bottom: -scale(4)
                        }}
                    />
                </View>
            ) : null}
            <Image
                resizeMode="contain"
                source={{
                    uri: `${COURSE_IMG_PATH}${item?.id}.webp`
                }}
                style={{
                    width: '100%',
                    height: scale(150),
                    borderTopLeftRadius: scale(10),
                    borderTopRightRadius: scale(10)
                }}
                fallbackSource={require('assets/images/fallback.jpg')}
                alt="image"
            />
            <View
                style={{
                    paddingHorizontal: scale(15),
                    paddingVertical: scale(24)
                }}>
                <Text
                    bold
                    numberOfLines={3}
                    style={{
                        paddingTop: scale(5)
                    }}>
                    {item?.title}
                </Text>
                {/* <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: scale(8),
                    }}
                >
                    <Avatar size={scale(48)} />
                    <View style={{ marginLeft: scale(8) }}>
                        <Text
                            style={{
                                
                                fontSize: scale(14),
                                color: '#6C746E',
                            }}
                        >
                            Giảng viên
                        </Text>
                        <Text
                            style={{
                                
                                fontSize: scale(16),
                                color: '#333',
                            }}
                        >
                            Lê Duy Quang
                        </Text>
                    </View>
                </View> */}
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: scale(10)
                    }}>
                    <Rate rate={item?.rating || 5} />
                    {/* <Pressable
                            style={{
                                paddingVertical: scale(4),
                                paddingHorizontal: scale(8),
                                borderRadius: scale(5),
                                backgroundColor: '#078723',
                            }}
                        >
                            <Text
                                style={{
                                    
                                    fontSize: scale(12),
                                    color: '#E8E8E8',
                                }}
                            >
                                Có lớp offline
                            </Text>
                        </Pressable> */}
                </View>
                {isMine ? (
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: scale(10)
                        }}>
                        <Progress
                            colorScheme="emerald"
                            value={item?.process}
                            style={{ width: '80%', marginTop: scale(5) }}
                        />
                        <Text
                            style={{
                                fontSize: scale(12),
                                color: '#777'
                            }}>
                            {item?.process}%
                        </Text>
                    </View>
                ) : (
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginTop: scale(10)
                        }}>
                        {isIOS ? renderPriceIOS() : renderPrice()}
                    </View>
                )}
            </View>
        </Pressable>
    )
}

export default CourseItem
