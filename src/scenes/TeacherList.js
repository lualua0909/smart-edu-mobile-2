import axios from 'app/Axios'
import {
    Center,
    LoadingAnimation,
    NoDataAnimation,
    Radio,
    Text
} from 'app/atoms'
import TeacherItem from 'app/components/TeacherItem'
import { scale } from 'app/helpers/responsive'
import { svgGreenTeacher } from 'assets/svg'
import React, { useEffect, useState } from 'react'

import LottieView from 'lottie-react-native'
import {
    FlatList,
    Pressable,
    RefreshControl,
    SafeAreaView,
    ScrollView,
    View
} from 'react-native'
import Modal from 'react-native-modal'
import { SvgXml } from 'react-native-svg'

import animationBanner from 'assets/animations/online-learning.json'

const Teacher = () => {
    const [visibleFilter, setVisibleFilter] = useState(false)
    const [orderBy, setOrderBy] = useState('asc')
    const [data, setData] = useState()
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState('')
    const [refreshing] = useState(false)
    const [page, setPage] = useState(0)

    const getData = () => {
        setLoading(true)
        axios
            .post(`mentors/paging-by-filter/0`, {
                order_by: orderBy,
                search
            })
            .then(res => {
                if (res.data.status === 200) {
                    const list = res?.data?.data
                    if (Array.isArray(list)) {
                        setData(Array.isArray(data) ? [...data, ...list] : list)
                    }
                }
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const refetch = () => {
        setPage(0)
    }

    useEffect(() => {
        getData()
    }, [page])

    useEffect(() => {
        setData([])
    }, [orderBy, search])

    const filterModal = (
        <Modal
            style={{ margin: 0, justifyContent: 'flex-end' }}
            isVisible={visibleFilter}
            onBackdropPress={() => setVisibleFilter(false)}
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
                            Sắp xếp
                        </Text>
                        <Radio
                            text="Theo tên từ A - Z"
                            isChecked={orderBy === 'asc'}
                            onPress={() => {
                                setOrderBy('asc')
                            }}
                        />
                        <Radio
                            text="Theo tên từ Z - A"
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
                                width: '50%'
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
                    {/* <View
                        style={{
                            padding: scale(16),
                            paddingBottom: 5
                        }}>
                        <Input
                            borderRadius="10"
                            width="100%"
                            fontSize="12"
                            px="2"
                            placeholder="Tìm kiếm giảng viên"
                            clearButtonMode="while-editing"
                            onChangeText={setSearch}
                            onEndEditing={() => {
                                setData([])
                                setPage(0)
                                getData()
                            }}
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
                                    <Filter
                                        stroke="#0E564D"
                                        width={scale(18)}
                                    />
                                </Pressable>
                            }
                            _focus={{
                                borderColor: '#52B553'
                            }}
                        />
                    </View> */}
                    <Center>
                        <LottieView
                            source={animationBanner}
                            autoPlay
                            loop
                            style={{
                                height: 150
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
                                GIẢNG VIÊN NỔI BẬT
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
                                                Việt Nam
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
                                            Trần Nguyễn Ngân Duyên
                                        </Text>
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
                                bold
                                style={{
                                    marginLeft: scale(8),
                                    fontSize: scale(16),
                                    color: '#0E564D',
                                    paddingTop: scale(5)
                                }}>
                                TẤT CẢ GIẢNG VIÊN
                            </Text>
                        </View>
                        <View
                            style={{
                                marginTop: scale(16)
                            }}>
                            {loading && <LoadingAnimation />}
                            {data?.length > 0 ? (
                                <FlatList
                                    data={data}
                                    keyExtractor={(_, index) =>
                                        index.toString()
                                    }
                                    showsVerticalScrollIndicator={false}
                                    contentContainerStyle={{
                                        paddingTop: scale(16),
                                        paddingLeft: 16,
                                        paddingRight: 16,
                                        paddingBottom: scale(20)
                                    }}
                                    renderItem={({ item }) => {
                                        return <TeacherItem item={item} />
                                    }}
                                    // onEndReached={handleLoadMore}
                                />
                            ) : (
                                <NoDataAnimation
                                    style={{
                                        marginTop: 20,
                                        height: 200
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
