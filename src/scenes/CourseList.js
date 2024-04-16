import axios from 'app/Axios'
import { useGlobalState } from 'app/Store'
import {
    Input,
    LoadingAnimation,
    Modal,
    NoDataAnimation as NoData,
    Radio,
    Text,
    VStack
} from 'app/atoms'
import CourseItem from 'app/components/CourseItem'
import { scale } from 'app/helpers/responsive'
import React, { useEffect, useState } from 'react'

import {
    FlatList,
    Pressable,
    RefreshControl,
    SafeAreaView,
    ScrollView,
    View
} from 'react-native'
import { Filter, Search } from 'react-native-feather'

const CourseList = ({ route }) => {
    const [visibleFilter, setVisibleFilter] = useState(false)
    const [orderBy, setOrderBy] = useState('asc')
    const [data, setData] = useState()
    const [cgSelected, setCGSelected] = useState([])
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(0)
    const [homeInfo, _] = useGlobalState('homeInfo')
    const [refreshing, setRefreshing] = useState(false)

    useEffect(() => {
        if (route?.params?.courseGroupSelected) {
            setCGSelected([route?.params?.courseGroupSelected])
            setData([])
            setPage(0)
            getData()
        }
    }, [route?.params])

    const getData = () => {
        setLoading(true)
        axios
            .post(`public-courses/list-on-mobile/${page * 9}`, {
                course_groups: cgSelected,
                positions: [],
                order_by: orderBy,
                search
            })
            .then(res => {
                if (res.data.status === 200) {
                    const list = res.data?.data
                    setData(Array.isArray(data) ? [...data, ...list] : list)
                }
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const refetch = () => {
        setData([])
        setPage(0)
        setRefreshing(false)
    }

    useEffect(() => {
        getData()
    }, [page])

    useEffect(() => {
        setData([])
        setPage(0)
    }, [orderBy, search])

    const handleLoadMore = () => {
        setPage(page + 1)
    }

    const filterModal = (
        <Modal visible={visibleFilter} onClose={() => setVisibleFilter(false)}>
            <ScrollView>
                <View style={{ paddingHorizontal: scale(16) }}>
                    <VStack space={10}>
                        {homeInfo?.course_groups?.map((item, index) => (
                            <Radio
                                key={item?.id}
                                text={item?.name}
                                isChecked={cgSelected?.includes(item?.id)}
                                onPress={() => {
                                    if (cgSelected?.includes(item?.id))
                                        setCGSelected(
                                            cgSelected.filter(
                                                i => i !== item?.id
                                            )
                                        )
                                    else
                                        setCGSelected([...cgSelected, item?.id])
                                }}
                            />
                        ))}
                    </VStack>
                </View>
                <View
                    style={{
                        paddingHorizontal: scale(16),
                        marginTop: scale(24)
                    }}>
                    <Text
                        style={{
                            fontSize: scale(16),
                            color: '#0E564D'
                        }}>
                        Sắp xếp
                    </Text>
                    <VStack space={10}>
                        <Radio
                            text="Từ A - Z"
                            isChecked={orderBy === 'asc'}
                            onPress={() => setOrderBy('asc')}
                        />
                        <Radio
                            text="Từ Z - A"
                            isChecked={orderBy === 'desc'}
                            onPress={() => setOrderBy('desc')}
                        />
                    </VStack>
                </View>

                <Pressable
                    style={{
                        marginTop: 15,
                        width: '100%',
                        height: scale(45),
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#52B553'
                    }}
                    onPress={() => {
                        setData([])
                        setPage(0)
                        getData()
                        setVisibleFilter(false)
                    }}>
                    <Text
                        bold
                        style={{
                            fontSize: scale(16),
                            color: '#fff'
                        }}>
                        Tìm kiếm
                    </Text>
                </Pressable>
            </ScrollView>
        </Modal>
    )

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <View
                style={{
                    padding: scale(16),
                    paddingBottom: 5
                }}>
                <Input
                    borderRadius="10"
                    width="100%"
                    fontSize="12"
                    px="2"
                    placeholder="Tìm kiếm theo tên khóa học"
                    onChangeText={setSearch}
                    onEndEditing={() => {
                        setData([])
                        setPage(0)
                        getData()
                    }}
                    clearButtonMode="while-editing"
                    InputLeftElement={
                        <Search
                            width={scale(18)}
                            stroke="#0E564D"
                            style={{ marginLeft: 12 }}
                        />
                    }
                    InputRightElement={
                        <Pressable
                            onPress={() => setVisibleFilter(true)}
                            hitSlop={15}
                            style={{ marginRight: 10 }}>
                            <Filter stroke="#0E564D" width={scale(18)} />
                        </Pressable>
                    }
                    _focus={{
                        borderColor: '#52B553'
                    }}
                />
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={refetch}
                    />
                }>

                {data?.length ? (
                    <FlatList
                        data={data || []}
                        keyExtractor={(_, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                            paddingTop: scale(16),
                            paddingHorizontal: 15,
                        }}
                        style={{ marginBottom: 10 }}
                        renderItem={({ item, index }) => (
                            <CourseItem item={item} index={index} />
                        )}
                        onEndReached={handleLoadMore}
                    />
                ) : (
                    !loading && (
                        <NoData
                            style={{
                                marginTop: 20,
                                width: 800,
                                height: 300
                            }}
                        />
                    )
                )}
                {loading && (
                    <LoadingAnimation
                        style={{
                            marginTop: 20
                        }}
                    />
                )}
                {filterModal}
            </ScrollView>
        </SafeAreaView>
    )
}

export default CourseList
