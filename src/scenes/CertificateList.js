import Axios from 'app/Axios'
import { useGlobalState } from 'app/Store'
import { LoadingAnimation } from 'app/atoms'
import CertificateItem from 'app/components/CertificateItem'
import { scale } from 'app/helpers/responsive'
import React, { useEffect, useState } from 'react'

import { FlatList, RefreshControl, ScrollView, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Center, Text } from 'native-base'

const CertificateList = ({ navigation, route }) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(0)
    const [refreshing, setRefreshing] = useState(false)
    const [userInfo, setUserState] = useGlobalState('userInfo')

    const getData = (refresh = false) => {
        setLoading(true)
        Axios.get(
            `certificate/paging/${route?.params?.userId || userInfo?.id}/${
                page * 8
            }`
        )
            .then(res => {
                if (res.data.status === 200) return res.data
            })
            .then(resData => {
                const list = [...resData?.data, ...resData?.ex_certificates]

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

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <FlatList
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={refetch}
                    />
                }
                data={data || []}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <CertificateItem index={index} data={item} />
                )}
                contentContainerStyle={{
                    marginTop: scale(20),
                    paddingHorizontal: scale(10),
                    paddingBottom: scale(20)
                }}
                ListHeaderComponent={
                    <Text
                        style={{
                            marginLeft: scale(16),
                            marginBottom: scale(16),
                            fontSize: scale(20),
                            color: '#1F1F1F'
                        }}>
                        Danh s??ch ch???ng ch???
                    </Text>
                }
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
                showsVerticalScrollIndicator={false}
            />
            {loading && <LoadingAnimation />}
        </View>
    )
}

export default CertificateList
