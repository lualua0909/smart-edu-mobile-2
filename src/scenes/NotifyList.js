import { LoadingAnimation } from 'app/atoms'
import axios from 'app/axios'
import NotiItem from 'app/components/NotifyItem'
import { scale } from 'app/helpers/responsive'
import React, { useEffect, useState } from 'react'

import { FlatList, RefreshControl, ScrollView, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

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

        axios
            .get('notifies/remove/' + id)
            .then(res => {
                if (res.data.status === 200) {
                    console.log('Đã xóa thông báo')
                }
            })
            .catch(err => console.log('err', err))
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <SafeAreaView
                edges={['top']}
                style={{ flex: 1, backgroundColor: 'white' }}>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={refetch}
                        />
                    }>
                    <FlatList
                        data={data || []}
                        keyExtractor={(_, index) => index.toString()}
                        renderItem={({ item, index }) => (
                            <NotiItem
                                index={index}
                                data={item}
                                removeNotify={removeNotify}
                            />
                        )}
                        contentContainerStyle={{
                            paddingTop: scale(16),
                            paddingBottom: scale(50)
                        }}
                        // ListHeaderComponent={
                        //     <Text
                        //         style={{
                        //             marginLeft: scale(16),
                        //             marginBottom: scale(16),

                        //             fontSize: scale(20),
                        //             color: '#1F1F1F'
                        //         }}>
                        //         Danh sách thông báo
                        //     </Text>
                        // }
                        onEndReached={handleLoadMore}
                        onEndReachedThreshold={0.5}
                        showsVerticalScrollIndicator={false}
                    />
                    {loading && <LoadingAnimation />}
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}

export default Notification
