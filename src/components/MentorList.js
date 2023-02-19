import axios from 'app/Axios'
import { LoadingAnimation, NoDataAnimation } from 'app/atoms'
import TeacherItem from 'app/components/TeacherItem'
import { scale } from 'app/helpers/responsive'
import React, { useEffect, useState } from 'react'

import { FlatList, RefreshControl, ScrollView } from 'react-native'

const MentorList = ({}) => {
    const [data, setData] = useState()
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(0)
    const [refreshing, setRefreshing] = useState(false)

    const getData = (refresh = false) => {
        setLoading(true)
        axios
            .get('get-mentors/paging/' + page * 6)
            .then(res => {
                if (res.data.status === 200) return res.data
            })
            .then(resData => {
                const list = resData?.data
                if (refreshing) {
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

    return (
        <ScrollView
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={refetch} />
            }>
            {data?.length ? (
                <FlatList
                    data={data || []}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <TeacherItem index={index} item={item} />
                    )}
                    contentContainerStyle={{
                        paddingLeft: 16,
                        paddingRight: 16,
                        paddingBottom: scale(50)
                    }}
                    onEndReached={handleLoadMore}
                    onEndReachedThreshold={1}
                    showsVerticalScrollIndicator={false}
                />
            ) : !loading ? (
                <NoDataAnimation />
            ) : null}
            {loading && <LoadingAnimation />}
        </ScrollView>
    )
}

export default MentorList
