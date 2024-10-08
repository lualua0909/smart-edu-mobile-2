import axios from 'app/Axios'
import { AbsoluteSpinner, NoDataAnimation } from 'app/atoms'
import NotiItem from 'app/components/NotifyItem'
import { scale } from 'app/helpers/responsive'
import React, { useEffect, useState } from 'react'

import { FlatList, RefreshControl, ScrollView, View } from 'react-native'

const Notification = ({}) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(0)
    const [refreshing, setRefreshing] = useState(false)

    const getData = (refresh = false) => {
        setLoading(true)
        axios
            .get('notifies/paging/' + page * 8)
            .then(res => {
                if (res.data.status === 200) return res.data
            })
            .then(resData => {
                const list = resData?.data

                if (refreshing) {
                    setIsRefetch(false)
                    setData(list)
                } else {
                    setData(Array.isArray(data) ? [...data, ...list] : list)
                }
            })
            .finally(() => {
                setLoading(false)
                if (refresh) {
                    setRefreshing(false)
                }
            })
    }

    const refetch = React.useCallback(() => getData(true), [refreshing])

    useEffect(() => {
        getData(false)
    }, [page])

    const handleLoadMore = () => {
        setPage(page + 1)
    }

    const removeNotify = id => {
        const newData = [...data]
        const index = newData.findIndex(item => item.id === id)
        newData.splice(index, 1)
        setData(newData)

        axios.get('notifies/remove/' + id).then(res => {
            if (res.data.status === 200) {
                console.log('Đã xóa thông báo')
            }
        })
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={refetch}
                    />
                }>
                {data?.length ? (
                    <FlatList
                        data={data}
                        keyExtractor={(_, index) => index.toString()}
                        renderItem={({ item, index }) => (
                            <NotiItem
                                index={index}
                                data={item}
                                removeNotify={removeNotify}
                            />
                        )}
                        contentContainerStyle={{
                            paddingBottom: scale(20)
                        }}
                        onEndReached={handleLoadMore}
                        onEndReachedThreshold={0.5}
                        showsVerticalScrollIndicator={false}
                    />
                ) : (
                    <NoDataAnimation />
                )}
                {loading && <AbsoluteSpinner />}
            </ScrollView>
        </View>
    )
}

export default Notification
