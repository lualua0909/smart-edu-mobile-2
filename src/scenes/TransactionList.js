import { LoadingAnimation, NoDataAnimation } from 'app/atoms'
import axios from 'app/axios'
import TransactionItem from 'app/components/TransactionItem'
import { scale } from 'app/helpers/responsive'
import React, { useEffect, useState } from 'react'

import { FlatList, View } from 'react-native'

const TransactionList = ({ navigation, route }) => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])

    useEffect(() => {
        setLoading(true)
        axios
            .get('payment/order-list')
            .then(res => {
                if (res.data.status === 200) {
                    console.log('payment/order-list', res.data.data)
                    setData(res.data.data)
                }
            })
            .finally(() => setLoading(false))
    }, [])

    if (loading) return <LoadingAnimation />

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            {data?.length ? (
                <FlatList
                    data={data}
                    renderItem={({ item, index }) => {
                        return <TransactionItem key={index} data={item} />
                    }}
                    keyExtractor={item => item.id}
                    style={{
                        paddingHorizontal: scale(16),
                        zIndex: 1,
                        paddingTop: scale(10)
                    }}
                />
            ) : (
                <NoDataAnimation />
            )}
        </View>
    )
}

export default TransactionList
