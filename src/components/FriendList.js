import axios from 'app/Axios'
import { useGlobalState } from 'app/Store'
import { AbsoluteSpinner, NoDataAnimation } from 'app/atoms'
import FriendItem from 'app/components/FriendItem'
import React, { useEffect, useState } from 'react'

import { RefreshControl, ScrollView } from 'react-native'

const FriendList = ({}) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(0)
    const [refreshing, setRefreshing] = useState(false)
    const [search, setSearch] = useState(null)
    const [userInfo, setUserState] = useGlobalState('userInfo')

    const getData = () => {
        setLoading(true)
        axios
            .get(
                `friends/friend_list/${userInfo?.id}${
                    search ? '/' + search : ''
                }`
            )
            .then(res => {
                if (res.data.status === 200) return res.data
            })
            .then(resData => {
                const list = resData?.data

                console.log('friends/paging', list)
                if (refreshing) {
                    setIsRefetch(false)
                    setData(list)
                } else {
                    setData(Array.isArray(data) ? [...data, ...list] : list)
                }
            })
            .finally(() => {
                setLoading(false)
                setRefreshing(false)
            })
    }

    const refetch = React.useCallback(() => getData(true), [refreshing])

    useEffect(() => {
        getData(false)
    }, [page])

    return (
        <ScrollView
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={refetch} />
            }>
            {data?.length ? (
                <FriendItem index={index} data={data} />
            ) : !loading ? (
                <NoDataAnimation />
            ) : null}
            {loading && <AbsoluteSpinner />}
        </ScrollView>
    )
}

export default FriendList
