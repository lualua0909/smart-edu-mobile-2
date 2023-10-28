import VoucherItem from 'app/components/VoucherItem'
import { scale } from 'app/helpers/responsive'
import React from 'react'

import { FlatList, StatusBar, TextInput } from 'react-native'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable'

import { Text, View } from 'native-base'

const Voucher = () => {
    return (
        <>
            <View style={{ paddingTop: scale(7), backgroundColor: '#E5E5E5' }}>
                <View
                    style={{
                        backgroundColor: '#FFFFFF',
                        alignContent: 'center',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingHorizontal: scale(10),
                        paddingVertical: scale(10)
                    }}>
                    <TextInput
                        style={{
                            fontSize: scale(16),
                            color: '#000',
                            borderColor: '#000',
                            width: '70%',
                            backgroundColor: '#FFFFFF',
                            borderColor: '#E5E5E5',
                            borderWidth: 1,
                            borderRadius: 5,
                            borderLeftColor: '#52B553',
                            borderLeftWidth: 2,
                            padding: scale(6)
                        }}
                    />
                    <Pressable
                        style={{
                            backgroundColor: '#52B553',
                            borderRadius: 5,
                            width: '25%',
                            justifyContent: 'center'
                        }}>
                        <Text
                            style={{
                                color: '#FFFFFF',
                                fontSize: scale(16),
                                textAlign: 'center'
                            }}>
                            Áp dụng
                        </Text>
                    </Pressable>
                </View>
            </View>
            <View style={{ flex: 1, backgroundColor: '#E5E5E5' }}>
                <StatusBar barStyle="light-content" />
                <FlatList
                    data={[0, 1, 1]}
                    renderItem={({ item, index }) => {
                        return (
                            <VoucherItem
                                value={item}
                                index={index}
                                key={index}
                            />
                        )
                    }}
                    keyExtractor={item => item.id}
                    style={{
                        zIndex: 1,
                        paddingTop: scale(7)
                    }}
                />
            </View>
        </>
    )
}

export default Voucher
