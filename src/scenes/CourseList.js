import axios from 'app/Axios'
import { useGlobalState } from 'app/Store'
import { LoadingAnimation, NoDataAnimation as NoData, Radio } from 'app/atoms'
import CourseItem from 'app/components/CourseItem'
import { scale } from 'app/helpers/responsive'
import React, { useEffect, useRef, useState } from 'react'

import { FlatList, Pressable, RefreshControl } from 'react-native'
import { Filter, Search } from 'react-native-feather'
import Modal from 'react-native-modal'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Input, ScrollView, Text, View } from 'native-base'

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
        <Modal
            style={{ margin: 0, justifyContent: 'flex-end' }}
            isVisible={visibleFilter}
            onBackButtonPress={() => setVisibleFilter(false)}
            onBackdropPress={() => setVisibleFilter(false)}>
            <View style={{ backgroundColor: '#fff', flex: 1 }}>
                <SafeAreaView>
                    <View style={{ paddingLeft: scale(16) }}>
                        <Text
                            style={{
                                fontSize: scale(16),
                                color: '#0E564D'
                            }}>
                            Danh mục
                        </Text>
                        {homeInfo?.course_groups?.map((item, index) => (
                            <Radio
                                key={index}
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
                    </View>
                    <View
                        style={{
                            paddingLeft: scale(16),
                            marginTop: scale(24)
                        }}>
                        <Text
                            style={{
                                fontSize: scale(16),
                                color: '#0E564D'
                            }}>
                            Sắp xếp
                        </Text>
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
                    </View>

                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: scale(24)
                        }}>
                        <Pressable
                            style={{
                                width: '50%',
                                height: scale(47),
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                            onPress={() => {
                                setVisibleFilter(false)
                            }}>
                            <Text
                                bold
                                style={{
                                    fontSize: scale(16),
                                    color: '#555'
                                }}>
                                Đóng
                            </Text>
                        </Pressable>
                        <Pressable
                            style={{
                                width: '50%',
                                height: scale(45),
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderWidth: 1,
                                borderColor: '#52B553',
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
                    </View>
                </SafeAreaView>
            </View>
        </Modal>
    )

    return (
        <SafeAreaView
            edges={['top']}
            style={{ backgroundColor: '#fff', flex: 1 }}>
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
                            paddingLeft: 16,
                            paddingRight: 16,
                            paddingBottom: scale(50)
                        }}
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
            </ScrollView>
            {filterModal}
        </SafeAreaView>
    )
}

export default CourseList
