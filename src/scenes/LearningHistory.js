import { LoadingAnimation, NoDataAnimation } from 'app/atoms'
import axios from 'app/axios'
import HistoryItem from 'app/components/HistoryItem'
import { scale } from 'app/helpers/responsive'
import React, { useEffect, useState } from 'react'

import { FlatList, View } from 'react-native'

const LearningHistory = ({ navigation, route }) => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])

    useEffect(() => {
        setLoading(true)
        axios
            .get('courses/get-my-learning-process')
            .then(res => {
                if (res.data.status === 200) {
                    console.log('get-my-learning-process', res.data.data)
                    setData(res.data.data)
                }
            })
            .finally(() => setLoading(false))
    }, [])

    if (loading) return <LoadingAnimation />

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <FlatList
                data={data}
                renderItem={({ item, index }) => {
                    return <HistoryItem key={index} data={item} />
                }}
                keyExtractor={item => item.id}
                style={{
                    paddingHorizontal: scale(16),
                    zIndex: 1,
                    paddingTop: scale(10)
                }}
            />
        </View>
    )
}

export default LearningHistory
