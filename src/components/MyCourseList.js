import axios from 'app/Axios'
import { useGlobalState } from 'app/Store'
import { LoadingAnimation, NoDataAnimation } from 'app/atoms'
import CourseItem from 'app/components/CourseItem'
import { DATA_FAKE_12_SKILL } from 'app/constants'
import { scale } from 'app/helpers/responsive'
import React, { useEffect, useState } from 'react'

import { FlatList } from 'react-native'

const MyCourseList = ({ userId }) => {
    const [data, setData] = useState([])
    console.log('🚀 ~ MyCourseList ~ data:', data)
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(0)
    const [refreshing, setRefreshing] = useState(false)
    const [userInfo, setUserState] = useGlobalState('userInfo')

    const getData = (refresh = false) => {
        setLoading(true)
        axios
            .get(
                `courses/my-courses/paging/${page * 8}/${
                    userId || userInfo?.id
                }`
            )
            .then(res => {
                if (res.data.status === 200) return res.data
            })
            .then(resData => {
                const list = resData?.data

                console.log('courses/my-courses/paging', list)
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

    useEffect(() => {
        getData(false)
    }, [page])

    const handleLoadMore = () => {
        setPage(page + 1)
    }

    return (
        <>
            {data?.length ? (
                <FlatList
                    data={[...DATA_FAKE_12_SKILL, ...data] || []}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <CourseItem
                            isHorizontal
                            fullWidth
                            item={item}
                            index={index}
                        />
                    )}
                    contentContainerStyle={{
                        paddingLeft: 16,
                        paddingRight: 16,
                        paddingBottom: scale(50)
                    }}
                    style={{ margin: 16 }}
                    onEndReached={handleLoadMore}
                    onEndReachedThreshold={0.5}
                    initialNumToRender={10}
                    showsVerticalScrollIndicator={false}
                />
            ) : !loading ? (
                <NoDataAnimation />
            ) : null}
            {loading && <LoadingAnimation />}
        </>
    )
}

export default MyCourseList
