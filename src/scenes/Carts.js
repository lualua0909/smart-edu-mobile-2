import { useGlobalState } from 'app/Store'
import CartItem from 'app/components/CartItem'
import { scale } from 'app/helpers/responsive'
import { getData } from 'app/helpers/utils'
import React, { useEffect } from 'react'

import { StatusBar, View } from 'react-native'

import { Button, FlatList, Text } from 'native-base'

const Carts = ({ navigation }) => {
    const [carts, setCarts] = useGlobalState('carts')

    const getCarts = async () => {
        const carts = await getData('@cart')
        setCarts(carts || [])
    }

    useEffect(() => {
        getCarts()
    }, [])

    return (
        <>
            {carts?.length < 1 ? (
                <View
                    style={{
                        flex: 1,
                        alignContent: 'center',
                        flexDirection: 'row',
                        justifyContent: 'center'
                    }}>
                    <View style={{ marginTop: scale(20), width: '60%' }}>
                        <Text
                            style={{
                                textAlign: 'center',
                                fontSize: scale(16),
                                color: '#000000'
                            }}>
                            Bạn chưa có{' '}
                            <Text style={{ color: COLORS.green }}>
                                khóa học nào{' '}
                            </Text>{' '}
                            khóa học nào trong giỏ hàng
                        </Text>
                        <Button
                            style={{
                                marginTop: scale(10)
                            }}
                            onPress={() => navigation.navigate('CourseList')}>
                            Danh sách khóa học
                        </Button>
                    </View>
                </View>
            ) : (
                <View style={{ flex: 1 }}>
                    <StatusBar barStyle="light-content" />
                    <FlatList
                        data={carts}
                        renderItem={({ item, index }) => (
                            <CartItem course={item} index={index} key={index} />
                        )}
                        keyExtractor={item => item.id}
                        style={{
                            zIndex: 1,
                            paddingTop: scale(10)
                        }}
                    />
                </View>
            )}
        </>
    )
}

export default Carts
