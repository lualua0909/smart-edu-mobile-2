import { useQuery } from '@apollo/client'
import axios from 'app/Axios'
import { AbsoluteSpinner, Button } from 'app/atoms'
import { COLORS, ROUTES, STYLES } from 'app/constants'
import { COURSE_GROUP_LIST, COURSE_LIST } from 'app/qqlStore/queries'
import { svgIconList } from 'assets/svg'
import _ from 'lodash'
import React from 'react'

import {
    Dimensions,
    FlatList,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native'
import * as Progress from 'react-native-progress'
import { SvgXml } from 'react-native-svg'

import HeaderTitle from 'app/components/header-title'

import { RenderColor } from './renderColorRestult'

const { width, height } = Dimensions.get('screen')

const TestResult = ({
    navigation,
    route,
    titleHeader = 'Kết quả kiểm tra đầu vào'
}) => {
    const { title, idPretest } = route.params
    const { loading, data: dataTest } = useQuery(COURSE_GROUP_LIST)
    // const { data: dataTest2 } = useQuery(COURSE_LIST)

    const [data, setData] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)
    const handleToLearningPath = () => {
        navigation.navigate(ROUTES.LearningPath)
    }
    const handleToRadarChart = () => {
        navigation.navigate(ROUTES.ChartTestResult, { data: data })
    }

    React.useEffect(() => {
        navigation.setOptions({
            headerTitle: () => <HeaderTitle title={title} />
        })
        navigation.addListener('beforeRemove', e => {
            e.preventDefault()
            navigation.navigate('Dashboard')
            return
        })
    }, [navigation])

    const getAllData = () => {
        setIsLoading(true)
        axios
            .get(`courses/roadmap/test-history/${idPretest}`)
            .then(res => {
                if (res.data) {
                    const result = dataTest?.CourseGroups?.data.map(item => {
                        const findById = _.filter(res.data, function (e) {
                            return e.question.group_id === item.id
                        })
                        // console.log('🚀 ~ findById ~ findById:', findById)
                        if (findById.length > 0) {
                            const sumScore = findById.reduce(
                                (accumulator, currentValue) =>
                                    accumulator + currentValue.answer,
                                0
                            )
                            return {
                                name_stage: item.description,
                                process: (sumScore / 25) * 100,
                                id: item.id
                            }
                        }
                    })
                    const removeUndefined = _.remove(result, undefined)
                    setData(removeUndefined)
                    // res.data.map(item => console.log(item))
                }
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    React.useEffect(() => {
        getAllData()
    }, [dataTest])

    if (loading || isLoading)
        return <AbsoluteSpinner title={'Đang tải kết quả'} />

    const renderProcess = (text, process) => {
        return (
            <>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: width - 60,
                        marginVertical: 10
                    }}>
                    <View style={{ flexDirection: 'row' }}>
                        <SvgXml xml={svgIconList} width={20} height={20} />
                        <Text style={[styles.result_text, { marginLeft: 5 }]}>
                            {text}
                        </Text>
                    </View>
                    <Text
                        style={[
                            styles.result_process,
                            {
                                color: RenderColor(process)
                            }
                        ]}>
                        {process} %
                    </Text>
                </View>
                <Progress.Bar
                    progress={process / 100}
                    width={width - 60}
                    style={{
                        borderColor: COLORS.borderGrey,
                        borderWidth: 1,
                        flex: 1
                    }}
                    color={RenderColor(process)}
                />
            </>
        )
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                {Array.isArray(data) && (
                    <FlatList
                        data={data || []}
                        keyExtractor={(_, index) => index.toString()}
                        style={styles.flatList_style}
                        renderItem={({ item, index }) => {
                            return (
                                <View
                                    key={index}
                                    style={[styles.viewItem, STYLES.boxShadow]}>
                                    <Text
                                        style={styles.result_title}
                                        numberOfLines={2}>
                                        {index + 1}. {item.name_stage}
                                    </Text>
                                    {renderProcess(
                                        'Kết quả (đầu vào)',
                                        Math.floor(item.process)
                                    )}
                                </View>
                            )
                        }}
                        onEndReachedThreshold={0.5}
                        initialNumToRender={10}
                        showsVerticalScrollIndicator={false}
                    />
                )}
            </ScrollView>
            <View style={styles.gr_btn}>
                <Button outlined onPress={handleToRadarChart}>
                    Xem biểu đồ
                </Button>
                <Button onPress={handleToLearningPath}>Tiếp tục</Button>
            </View>
        </View>
    )
}

export default TestResult

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    viewItem: {
        backgroundColor: COLORS.colorWhite,
        paddingHorizontal: 10,
        paddingVertical: 15,
        marginVertical: 10,
        marginHorizontal: 20,
        borderColor: 'rgba(28, 29, 34, 0.1)',
        borderWidth: 1,
        borderRadius: 10
    },
    result_title: {
        fontSize: 16,
        fontWeight: '500',
        color: COLORS.colorBlack
    },
    result_text: {
        fontSize: 15,
        fontWeight: '400',
        color: COLORS.colorBlack
    },
    result_process: {
        fontSize: 15,
        fontWeight: '400'
    },
    gr_btn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        bottom: 20,
        width: width,
        paddingHorizontal: 20
    },
    gr_btn_width: {
        width: width / 2 - 20
    },
    text_color: {
        color: COLORS.colorBlack
    },
    text_cancel: {
        color: COLORS.colorButton,
        textDecorationLine: 'underline',
        fontSize: 18,
        textAlign: 'center'
    },
    btn_next: {
        backgroundColor: COLORS.colorButton,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    text_btn_next: {
        fontSize: 18,
        color: COLORS.colorWhite
    }
})
