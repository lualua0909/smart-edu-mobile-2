import axios from 'app/Axios'
import { useGlobalState } from 'app/Store'
import { showToast } from 'app/atoms'
import { scale } from 'app/helpers/responsive'
import storage from 'app/localStorage'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'

import Countdown from 'react-countdown'
import { Alert, ScrollView } from 'react-native'

import HeaderTitle from 'app/components/header-title'
import { Box, Button, Center, HStack, Text, VStack, View } from 'native-base'

import Skeleton from './ExamSkeleton'
import Type2 from './Type2'
import Type3 from './Type3'
import Type4 from './Type4'
import Type9 from './Type9'

const TYPE_2 = 2
const TYPE_3 = 3
const TYPE_4 = 4
const TYPE_9 = 9

const ExamContent = ({ navigation, route }) => {
    const { surveyId } = route.params
    const [data, setData] = useState()
    const [loading, setLoading] = useState(false)
    const [selected, setSelected] = useState([])
    const [unSavedChange, setUnSavedChange] = useState(false)
    const [homeInfo, _setHomeInfo] = useGlobalState('homeInfo')

    const changeType2 = (id, index, option) => {
        const prevSelected = [...selected]
        const findIndex = prevSelected.findIndex(i => i?.id === id)
        if (findIndex === -1) {
            prevSelected.push({ id, data: [option] })
        } else {
            const data = Array.isArray(prevSelected[findIndex]?.data)
                ? [...prevSelected[findIndex]?.data]
                : []
            data[index] = option

            prevSelected[findIndex] = { id, data }
        }

        setSelected(prevSelected)
    }

    const changeType3 = (id, option) => {
        const prevSelected = [...selected]
        const findIndex = prevSelected.findIndex(i => i?.id === id)
        if (findIndex === -1) {
            prevSelected.push({ id, data: option })
        } else {
            prevSelected[findIndex] = { id, data: option }
        }

        setSelected(prevSelected)
    }

    useEffect(
        () =>
            navigation.addListener('beforeRemove', e => {
                if (!unSavedChange) {
                    return
                }

                e.preventDefault()

                Alert.alert(
                    'Rời khỏi trang?',
                    'Bạn chưa hoàn tất bài kiểm tra. Bài kiểm tra của bạn sẽ không được lưu lại',
                    [
                        {
                            text: 'Ở lại trang',
                            style: 'cancel',
                            onPress: () => {}
                        },
                        {
                            text: 'Rời khỏi',
                            style: 'destructive',
                            onPress: () => navigation.dispatch(e.data.action)
                        }
                    ]
                )
            }),
        [navigation, unSavedChange]
    )
    useEffect(() => {
        setLoading(true)
        axios
            .get(`survey/get-info/${surveyId}`)
            .then(res => {
                return res.data
            })
            .then(data => {
                setData(data?.data)
                navigation.setOptions({
                    headerTitle: () => <HeaderTitle title={data?.data?.title} />
                })
            })
            .finally(() => setLoading(false))
    }, [])

    const pickAnswer = (id, option) => {
        const prevSelected = [...selected]
        const findIndex = prevSelected.findIndex(i => i?.id === id)
        if (findIndex === -1) {
            prevSelected.push({ id, option })
        } else {
            prevSelected[findIndex] = { id, option }
        }

        setSelected(prevSelected)
    }

    if (loading) return <Skeleton />

    const formatData = () => {
        const result = []
        selected.forEach(item => {
            const find = data?.questions?.find(i => i?.id === item?.id)
            if (find?.type === TYPE_2 || find?.type === TYPE_9) {
                const data = Array.isArray(item?.data)
                    ? item?.data?.join('//')
                    : ''

                result.push({
                    id: item?.id,
                    data
                })
            } else {
                result.push(item)
            }
        })

        return result
    }

    const submit = () => {
        const result = formatData()
        setLoading(true)
        axios
            .post('survey/upload-result', {
                survey_list_id: data?.id,
                temp_user: 'mobile',
                result
            })
            .then(res => {
                console.log('res?.data?.status = ', res?.data?.status)
                if (res?.data?.status === 200) {
                    showToast({
                        title: 'Chúc mừng bạn đã hoàn thành bài khảo sát',
                        status: 'success'
                    })

                    navigation.goBack()
                } else {
                    showToast({
                        title: 'Cập nhật bài khảo sát thất bại',
                        status: 'error'
                    })
                }
            })
            .finally(() => {
                setLoading(false)
                setStatus(true)
            })
    }

    return (
        <View mt="2" style={{ flex: 1, backgroundColor: '#fff' }}>
            <Center>
                <ScrollView style={{ marginBottom: 20 }}>
                    <Box
                        rounded="lg"
                        borderColor="coolGray.200"
                        borderWidth="1"
                        style={{ marginHorizontal: 10 }}>
                        <Text fontSize="sm" style={{ padding: 10 }}>
                            {data?.description.replace(/<[^>]*>?/gm, '')}
                        </Text>
                    </Box>
                    <VStack space={5} alignItems="center" mt="10">
                        {data?.questions?.map((item, index) => {
                            const select = selected?.find(
                                i => i?.id === item?.id
                            )
                            if (item?.type === TYPE_2) {
                                return (
                                    <Type2
                                        index={index}
                                        data={{ ...item, select }}
                                        onSelect={changeType2}
                                    />
                                )
                            } else if (item?.type === TYPE_3) {
                                return (
                                    <Type3
                                        index={index}
                                        data={{ ...item, select }}
                                        onSelect={changeType3}
                                        selected={selected}
                                    />
                                )
                            } else if (item?.type === TYPE_4) {
                                return (
                                    <Type4
                                        index={index}
                                        data={{ ...item, select }}
                                        onSelect={changeType3}
                                        selected={selected}
                                    />
                                )
                            } else if (item?.type === TYPE_9) {
                                return (
                                    <Type9
                                        index={index}
                                        data={{ ...item, select }}
                                        onSelect={changeType2}
                                        selected={selected}
                                    />
                                )
                            } else {
                                return null
                            }
                        })}
                    </VStack>
                    <Center>
                        <Button
                            size="lg"
                            onPress={submit}
                            style={{ margin: 10, width: 200 }}>
                            Gửi kết quả
                        </Button>
                    </Center>
                </ScrollView>
            </Center>
        </View>
    )
}

export default ExamContent
