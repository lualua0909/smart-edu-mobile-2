import Axios from 'app/Axios'
import { Radio } from 'app/atoms'
import { LoadingAnimation, NoDataAnimation } from 'app/atoms'
import TeacherItem from 'app/components/TeacherItem'
import { scale } from 'app/helpers/responsive'
import { svgGreenTeacher } from 'assets/svg'
import React, { useEffect, useState } from 'react'

import LottieView from 'lottie-react-native'
import {
    FlatList,
    Pressable,
    RefreshControl,
    ScrollView,
    View
} from 'react-native'
import { Filter, Search } from 'react-native-feather'
import Modal from 'react-native-modal'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SvgXml } from 'react-native-svg'

import animationBanner from 'assets/animations/online-learning.json'
import { Text } from 'native-base'
import { Center, Input } from 'native-base'

const Teacher = ({ navigation, route }) => {
    const [visibleFilter, setVisibleFilter] = useState(false)
    const [orderBy, setOrderBy] = useState('asc')
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState('')
    const [refreshing, setRefreshing] = useState(false)
    const [page, setPage] = useState(0)

    const getData = () => {
        setLoading(true)
        Axios.post(`mentors/paging-by-filter/0`, {
            order_by: orderBy,
            search
        })
            .then(res => {
                if (res.data.status === 200) {
                    const list = res?.data?.data
                    setData(Array.isArray(data) ? [...data, ...list] : list)
                }
                console.log('res', res)
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const refetch = () => {
        setData([])
        setPage(0)
    }

    useEffect(() => {
        getData()
    }, [page])

    useEffect(() => {
        setData([])
    }, [orderBy, search])

    // const handleLoadMore = () => {
    //     setPage(page + 1)
    // }

    const filterModal = (
        <Modal
            style={{ margin: 0, justifyContent: 'flex-end' }}
            isVisible={visibleFilter}
            onBackButtonPress={() => setVisibleFilter(false)}>
            <View style={{ backgroundColor: '#fff', paddingTop: scale(24) }}>
                <SafeAreaView>
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
                            S???p x???p
                        </Text>
                        <Radio
                            text="Theo t??n t??? A - Z"
                            isChecked={orderBy === 'asc'}
                            onPress={() => {
                                setOrderBy('asc')
                            }}
                        />
                        <Radio
                            text="Theo t??n t??? Z - A"
                            isChecked={orderBy === 'desc'}
                            onPress={() => {
                                setOrderBy('desc')
                            }}
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
                            }}></Pressable>
                        <Pressable
                            style={{
                                width: '50%',
                                height: scale(47),
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
                                style={{
                                    fontSize: scale(18),
                                    color: '#fff'
                                }}>
                                T??m ki???m
                            </Text>
                        </Pressable>
                    </View>
                </SafeAreaView>
            </View>
        </Modal>
    )

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <SafeAreaView edges={['top']}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: scale(30) }}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={refetch}
                        />
                    }>
                    <View
                        style={{
                            padding: scale(16),
                            paddingBottom: 5
                        }}>
                        <Input
                            borderRadius="10"
                            width="100%"
                            fontSize="16"
                            px="2"
                            placeholder="T??m ki???m gi???ng vi??n..."
                            clearButtonMode="while-editing"
                            onChangeText={setSearch}
                            onEndEditing={() => {
                                setData([])
                                setPage(0)
                                getData()
                            }}
                            InputLeftElement={
                                <Search
                                    stroke="#52B553"
                                    style={{ marginLeft: 12 }}
                                />
                            }
                            InputRightElement={
                                <Pressable
                                    onPress={() => setVisibleFilter(true)}
                                    hitSlop={15}
                                    style={{ marginRight: 10 }}>
                                    <Filter stroke="#52B553" />
                                </Pressable>
                            }
                            _focus={{
                                borderColor: '#52B553'
                            }}
                        />
                    </View>
                    <Center>
                        <LottieView
                            source={animationBanner}
                            autoPlay
                            loop
                            style={{
                                width: 500,
                                height: 200
                            }}
                        />
                    </Center>
                    {/* <View
                        style={{
                            paddingVertical: scale(16),
                            backgroundColor: '#fff',
                        }}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                paddingHorizontal: scale(16),
                            }}
                        >
                            <SvgXml xml={svgGreenStar} width={scale(20)} />
                            <Text
                                style={{
                                    marginLeft: scale(8),
                                    
                                    fontSize: scale(16),
                                    color: '#0E564D',
                                }}
                            >
                                GI???NG VI??N N???I B???T
                            </Text>
                        </View>
                        <FlatList
                            data={[1, 2, 3, 4, 5]}
                            keyExtractor={(_, index) => index.toString()}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{
                                paddingLeft: scale(16),
                                marginTop: scale(16),
                            }}
                            renderItem={({ item, index }) => (
                                <Pressable
                                    onPress={() =>
                                        navigation.navigate(
                                            ROUTES.TeacherInfo,
                                            { id: item?.id }
                                        )
                                    }
                                    style={{
                                        width: scale(124),
                                        borderWidth: 1,
                                        borderColor: '#d9d9d9',
                                        marginRight: scale(16),
                                        borderRadius: scale(5),
                                        borderBottomWidth: scale(6),
                                        borderBottomColor: COLORS.green,
                                    }}
                                >
                                    <View>
                                        <Avatar size={scale(124)} isSquare />
                                        <View
                                            style={{
                                                paddingHorizontal: scale(11),
                                                paddingVertical: scale(5),
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                width: '100%',
                                                position: 'absolute',
                                                bottom: 0,
                                                left: 0,
                                                backgroundColor: '#eee',
                                                opacity: 0.7,
                                            }}
                                        >
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <SvgXml
                                                    xml={svgOrangeStar}
                                                    width={scale(16)}
                                                    height={scale(16)}
                                                />
                                                <Text
                                                    style={{
                                                        fontSize: scale(12),
                                                        color: '#000',
                                                        marginLeft: scale(4),
                                                    }}
                                                >
                                                    5.0
                                                </Text>
                                            </View>
                                            <Text
                                                style={{
                                                    fontSize: scale(12),
                                                    color: '#000',
                                                    marginLeft: scale(4),
                                                }}
                                            >
                                                Vi???t Nam
                                            </Text>
                                        </View>
                                    </View>
                                    <View
                                        style={{
                                            paddingVertical: scale(7),
                                            paddingHorizontal: scale(11),
                                        }}
                                    >
                                        <Text
                                            style={{
                                                
                                                fontSize: scale(16),
                                                color: '#333',
                                            }}
                                        >
                                            Tr???n Nguy???n Ng??n Duy??n
                                        </Text>
                                        <Pressable
                                            style={{
                                                paddingVertical: scale(4),
                                                marginTop: scale(4),
                                                alignSelf: 'flex-start',
                                            }}
                                        >
                                            <Badge
                                                colorScheme="success"
                                                variant="outline"
                                            >
                                                Tagname
                                            </Badge>
                                        </Pressable>
                                    </View>
                                </Pressable>
                            )}
                        />
                    </View> */}

                    {/* <HotMentors /> */}

                    <View
                        style={{
                            paddingVertical: scale(16)
                        }}>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                paddingHorizontal: scale(16)
                            }}>
                            <SvgXml xml={svgGreenTeacher} width={scale(24)} />
                            <Text
                                style={{
                                    marginLeft: scale(8),

                                    fontSize: scale(16),
                                    color: '#0E564D'
                                }}>
                                T???T C??? GI???NG VI??N
                            </Text>
                        </View>
                        <View
                            style={{
                                marginTop: scale(16)
                            }}>
                            {loading ? (
                                <LoadingAnimation />
                            ) : data?.length ? (
                                <FlatList
                                    data={data || []}
                                    keyExtractor={(_, index) =>
                                        index.toString()
                                    }
                                    showsVerticalScrollIndicator={false}
                                    contentContainerStyle={{
                                        paddingTop: scale(16),
                                        paddingLeft: 16,
                                        paddingRight: 16,
                                        paddingBottom: scale(50)
                                    }}
                                    renderItem={({ item, index }) => (
                                        <TeacherItem
                                            index={index}
                                            item={item}
                                        />
                                    )}
                                    // onEndReached={handleLoadMore}
                                />
                            ) : (
                                <NoDataAnimation
                                    style={{
                                        marginTop: 20,
                                        width: 800,
                                        height: 300
                                    }}
                                />
                            )}
                        </View>
                    </View>
                </ScrollView>
                {filterModal}
            </SafeAreaView>
        </View>
    )
}

export default Teacher
