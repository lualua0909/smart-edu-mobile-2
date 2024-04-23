import axios from 'app/Axios'
import { getGlobalState } from 'app/Store'
import { ListSkeleton, NoDataAnimation } from 'app/atoms'
import FriendItem from 'app/components/FriendItem'
import React, { useEffect, useState } from 'react'

import { ScrollView, View } from 'react-native'

const Friends = ({ route }) => {
    const { userId } = route.params
    const [data, setData] = useState()
    const [loading, setLoading] = useState(true)
    const userInfo = getGlobalState('userInfo')

    useEffect(() => {
        setLoading(true)
        axios
            .get(`friends/friend_list/${userId || userInfo?.id}`)
            .then(res => {
                console.log('res = ', res.data)
                if (res.status === 200) {
                    setData(res.data.data)
                }
            })
            .finally(() => setLoading(false))
    }, [userId])

    if (loading) {
        return <ListSkeleton />
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#fff', marginBottom: 20 }}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                stickyHeaderIndices={[1]}>
                {data?.length ? (
                    <FriendItem data={data} />
                ) : (
                    <NoDataAnimation />
                )}
            </ScrollView>
        </View>
    )
}

export default Friends
