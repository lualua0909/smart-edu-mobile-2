import React, { useEffect, useState } from 'react'
import { View, StatusBar, FlatList, Text } from 'react-native'
import { scale } from 'app/helpers/responsive'
import CartItem from 'app/components/CartItem'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable'
import { NoData } from 'app/atoms'
import { getData } from 'app/helpers/utils'
import { useGlobalState } from 'app/Store'

const Carts = ({ navigation }) => {
    const [carts, setCarts] = useGlobalState('carts')

    useEffect(() => {
        const getCarts = async () => {
            const carts = await getData('@cart')
            setCarts(carts || [])
        }

        getCarts()
    }, [])

    return (
        <>
            {carts?.length < 1 ? (
                <View
                    style={{
                        flex: 1,
                        backgroundColor: '#E5E5E5',
                        alignContent: 'center',
                        flexDirection: 'row',
                        justifyContent: 'center',
                    }}
                >
                    <View
                        style={{
                            width: '60%',
                        }}
                    >
                        <NoData />
                        <Text
                            style={{
                                textAlign: 'center',
                                fontFamily: FONTS.Mulish,
                                fontSize: scale(16),
                                color: '#000000',
                            }}
                        >
                            Bạn chưa có{' '}
                            <Text style={{ color: COLORS.green }}>
                                khóa học nào{' '}
                            </Text>{' '}
                            khóa học nào trong giỏ hàng
                        </Text>
                        <Pressable
                            style={{
                                backgroundColor: '#52B553',
                                padding: 10,
                                alignContent: 'center',
                                alignSelf: 'center',
                                borderRadius: 5,
                                marginTop: scale(10),
                                paddingLeft: scale(30),
                                paddingRight: scale(30),
                            }}
                            onPress={() => navigation.navigate('CourseList')}
                        >
                            <Text
                                style={{
                                    color: '#FFFFFF',
                                    fontSize: scale(16),
                                }}
                            >
                                Xem khóa học
                            </Text>
                        </Pressable>
                    </View>
                </View>
            ) : (
                <View style={{ flex: 1, backgroundColor: '#E5E5E5' }}>
                    <StatusBar barStyle="light-content" />
                    <FlatList
                        data={carts}
                        renderItem={({ item, index }) => {
                            return (
                                <CartItem
                                    course={item}
                                    index={index}
                                    key={index}
                                />
                            )
                        }}
                        keyExtractor={(item) => item.id}
                        style={{
                            zIndex: 1,
                            paddingTop: scale(10),
                        }}
                    />
                </View>
            )}
        </>
    )
}

export default Carts
