import React, { useState, useEffect } from 'react'
import { View, ScrollView } from 'react-native'
import FriendItem from 'app/components/Friendtem'
import { ListSkeleton, NotFoundAnimation } from 'app/atoms'
import Axios from 'app/Axios'
import { useGlobalState } from 'app/Store'

const Friends = ({ route }) => {
    const { userId } = route.params
    const [data, setData] = useState()
    const [loading, setLoading] = useState(true)
    const [userInfo, setUserState] = useGlobalState('userInfo')

    useEffect(() => {
        setLoading(true)
        Axios.get(`friends/friend_list/${userId || userInfo?.id}`)
            .then((res) => {
                if (res.data.status === 200) {
                    setData(res.data.data)
                    console.log(res.data.data)
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
                stickyHeaderIndices={[1]}
            >
                {data?.length ? (
                    <FriendItem data={data} />
                ) : (
                    <NotFoundAnimation />
                )}
            </ScrollView>
        </View>
    )
}

export default Friends
