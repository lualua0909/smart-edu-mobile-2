import { useQuery } from '@apollo/client'
import axios from 'app/Axios'
import { AbsoluteSpinner, Button, showToast } from 'app/atoms'
import { COLORS, ROUTES } from 'app/constants'
import { getData } from 'app/helpers/utils'
import { COURSE_GROUP_LIST, ROADMAP_LIST } from 'app/qqlStore/queries'
import _ from 'lodash'
import React from 'react'

import {
    Alert,
    Dimensions,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native'
import * as Progress from 'react-native-progress'
import Timeline from 'react-native-timeline-flatlist'

import HeaderTitle from 'app/components/header-title'

import DragDrop from './DragDrop'
import { RenderBackgroundColor } from './renderColorRestult'

const { width, height } = Dimensions.get('screen')

const LearningPath = ({ navigation, route }) => {
    console.log(route?.params?.id)
    const {
        data: dataRoadmap,
        loading,
        refetch
    } = useQuery(ROADMAP_LIST, {
        variables: { course_id: route?.params?.id }
    })

    const { data: DataCourseList, loading: cgLoading } =
        useQuery(COURSE_GROUP_LIST)

    const [data, setData] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)
    const [isAdjust, setIsAdjust] = React.useState(false)
    const [isRefetchQuery, setIsRefetchQuery] = React.useState(true)
    const [hasAdjust, setHasAdjust] = React.useState(true)
    const [dataAdjustCourse, setDataAdjustCourse] = React.useState([])

    const formatData = () => {
        if (!DataCourseList && !dataRoadmap) return
        setIsLoading(true)

        const courseGroupList = DataCourseList?.CourseGroups.data
        const roadmapData = dataRoadmap?.Roadmaps.data
        const adjust = !!roadmapData?.[0]?.sub_course?.order_number2
        if (adjust) {
            setIsAdjust(false)
            setHasAdjust(true)
        } else {
            setIsAdjust(false)
            setHasAdjust(false)
        }
        const result = courseGroupList?.map(course => {
            const filter = roadmapData?.filter(roadmap => {
                return roadmap.sub_course.group_id === course.id
            })
            if (filter.length === 0) return undefined
            return {
                ...course,
                children: filter
            }
        })
        const removeUndefined = _.remove(result, undefined)
        const sortByOrderNumber = removeUndefined.map((item, index) => {
            const sorted = sortByOrder(item.children)
            let isOpen = true
            if (index > 0) {
                const processPreIndex =
                    removeUndefined[index - 1].children.reduce(
                        (accumulator, currentValue) =>
                            accumulator + currentValue.sub_course.process,
                        0
                    ) / removeUndefined[index - 1].children.length
                isOpen = processPreIndex === 100
            }
            return {
                ...item,
                process:
                    item.children.reduce(
                        (accumulator, currentValue) =>
                            accumulator + currentValue.sub_course.process,
                        0
                    ) / item.children.length,
                isOpen,
                children: sorted
            }
        })
        setData(sortByOrderNumber)
        setDataAdjustCourse(sortByOrderNumber)
        setTimeout(() => {
            setIsLoading(false)
        }, 500)
    }
    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            refetch()
            formatData()
        })

        return unsubscribe
    }, [navigation])
    React.useEffect(() => {
        if (dataRoadmap && DataCourseList) {
            formatData()
        }
    }, [dataRoadmap, DataCourseList, loading, cgLoading])

    const saveAdjust = () => {
        setIsLoading(true)
        const courses = []
        dataAdjustCourse.map(stages => {
            stages.children.map(children => {
                const order2 = children.sub_course.order_number2
                const order1 = children.sub_course.order_number
                courses.push({
                    id: children.sub_course.id,
                    order: order2 || order1
                })
            })
        })
        axios
            .post(`courses/roadmap/submit-order`, {
                courses: [...courses]
            })
            .then(res => {
                setIsAdjust(false)
                setHasAdjust(true)
                refetch()
                setIsRefetchQuery(true)
                setTimeout(() => {
                    showToast({
                        title: 'Cập nhật lộ trình thành công.',
                        placement: 'top'
                    })
                    setIsLoading(false)
                }, 200)
            })
            .catch(err => {
                showToast({
                    title: 'Cập nhật lộ trình thất bại.',
                    placement: 'top'
                })
            })
    }

    const alertConfirmAdjust = () =>
        Alert.alert(
            'Thông báo',
            `${'Bạn đã chắc chắn với lộ trình vừa điều chỉnh không?'}`,
            [
                {
                    text: 'Hủy',
                    style: 'cancel'
                },
                {
                    text: 'Đồng ý',
                    onPress: () => {
                        saveAdjust()
                    }
                }
            ]
        )
    const handleStartLearning = () => {
        Alert.alert(
            'Thông báo',
            `${'Bạn có chắc chắn muốn học tập theo lộ trình do chúng tôi đề xuất?'}`,
            [
                {
                    text: 'Hủy',
                    style: 'cancel'
                },
                {
                    text: 'Đồng ý',
                    onPress: () => {
                        saveAdjust()
                    }
                }
            ]
        )
    }
    const sortByOrder = courses => {
        const sorted = _.sortBy(courses, ['sub_course.order_number2'], ['ASC'])
        return sorted
    }

    const handleViewStages = (course, sectionID) => {
        if (course.isOpen) {
            const title = course.name
            navigation.navigate(ROUTES.StagesView, {
                title: title,
                data: course
            })
        } else {
            showToast({
                description: `Vui lòng hoàn thành chặng ${
                    data[sectionID - 1].name
                }`,
                placement: 'top'
            })
        }
    }

    React.useEffect(() => {
        if (!hasAdjust) {
            navigation.setOptions({
                headerTitle: () => (
                    <HeaderTitle
                        title={
                            isAdjust
                                ? 'Điều chỉnh lộ trình học tập'
                                : 'Đề xuất lộ trình học tập'
                        }
                    />
                )
            })
        } else {
            navigation.setOptions({
                headerTitle: () => <HeaderTitle title="Lộ trình học tập" />
            })
        }
    }, [isAdjust, hasAdjust])

    const openAlertAdjust = () =>
        Alert.alert(
            'Thông báo',
            `${
                !hasAdjust
                    ? 'Lưu ý: Bạn chỉ có thể điều chỉnh thứ tự khóa học trong từng chặng và chỉ được điều chỉnh duy nhất 1 lần.'
                    : 'Bạn đã điều chỉnh lộ trình của khóa học.'
            }`,
            [
                {
                    text: 'Thoát',
                    style: 'cancel'
                },
                {
                    text: 'OK',
                    onPress: () => {
                        if (hasAdjust) return
                        setIsLoading(true)
                        setIsAdjust(true)
                        setTimeout(() => {
                            setIsLoading(false)
                        }, 100)
                    }
                }
            ]
        )
    const openAlertCancelAdjust = () =>
        Alert.alert(
            'CẢNH BÁO',
            'Bạn chưa lưu điều chỉnh lộ trình học tập của bạn.Vui lòng lưu trước khi thoát.',
            [
                {
                    text: 'Thoát',
                    style: 'cancel'
                },
                {
                    text: 'OK',
                    onPress: () => {
                        setIsLoading(true)
                        setIsAdjust(false)
                        setTimeout(() => {
                            setIsLoading(false)
                        }, 100)
                    }
                }
            ]
        )

    const renderTime = (rowData, index) => {
        return <Text style={styles.name_learning_path}>Chặng {index + 1}</Text>
    }

    const renderContentTimeLine = (data, index, rowData, color) => {
        return (
            <View key={index}>
                <View
                    style={[
                        styles.view_content_children_timeline,
                        isAdjust ? styles.view_adjust : {}
                    ]}>
                    <Text
                        style={[
                            styles.color_content_timeline,
                            {
                                color: color
                            }
                        ]}>
                        {index + 1}.{''}
                    </Text>

                    <Text
                        style={[
                            styles.color_content_timeline,
                            styles.title_children_timeline,
                            {
                                color: color
                            }
                        ]}
                        numberOfLines={2}>
                        {data.sub_course.title}
                    </Text>
                </View>
            </View>
        )
    }

    const contentDetailElement = (rowData, sectionID, hasAdjust) => {
        const { color, background } = RenderBackgroundColor(
            rowData.isOpen,
            hasAdjust,
            rowData.id
        )

        return (
            <View
                style={[
                    styles.viewDescTimeLine,
                    {
                        backgroundColor: background
                    }
                ]}>
                <Text
                    style={[
                        styles.title_content_timeline,
                        styles.color_content_timeline,
                        {
                            color: color
                        }
                    ]}
                    numberOfLines={1}>
                    {rowData.name}
                </Text>
                {isAdjust ? (
                    <DragDrop
                        item={rowData.children}
                        idStages={rowData.id}
                        setItem={setDataAdjustCourse}
                        dataAll={data}
                    />
                ) : (
                    <View>
                        {rowData.children.map((item, index) =>
                            renderContentTimeLine(item, index, rowData, color)
                        )}
                    </View>
                )}
                {hasAdjust && (
                    <View style={styles.process_stages}>
                        <Text
                            style={[
                                styles.process_text,
                                {
                                    color: color
                                }
                            ]}>
                            {Math.floor(rowData.process)} %
                        </Text>
                        <Progress.Bar
                            progress={rowData.process / 100}
                            color="green"
                            width={width / 2 - 10}
                            style={{ marginLeft: 10 }}
                        />
                    </View>
                )}
            </View>
        )
    }
    const renderDetail = (rowData, sectionID, hasAdjust) => {
        return !hasAdjust ? (
            <View>{contentDetailElement(rowData, sectionID, hasAdjust)}</View>
        ) : (
            <TouchableOpacity
                onPress={() => {
                    if (!hasAdjust) return
                    handleViewStages(rowData, sectionID)
                }}>
                {contentDetailElement(rowData, sectionID, hasAdjust)}
            </TouchableOpacity>
        )
    }

    if (isLoading || (loading && cgLoading))
        return <AbsoluteSpinner title={'Đang tải dữ liệu'} />

    return (
        <SafeAreaView edges={['top', 'left', 'right']} style={styles.container}>
            {!isLoading ? (
                <Timeline
                    renderTime={renderTime}
                    data={data}
                    renderDetail={(rowData, sectionID) =>
                        renderDetail(rowData, sectionID, hasAdjust)
                    }
                    style={{
                        maxHeight: !hasAdjust ? height - 200 : height - 130
                    }}
                    lineColor="#FAF9F9"
                    circleSize={10}
                    circleColor={'#FAF9F9'}
                />
            ) : (
                <AbsoluteSpinner />
            )}
            {!hasAdjust && (
                <>
                    {isAdjust ? (
                        <View style={styles.gr_btn}>
                            <Button
                                outlined
                                onPress={openAlertCancelAdjust}
                                style={[
                                    styles.gr_btn_width,
                                    styles.text_cancel
                                ]}>
                                Trở về
                            </Button>
                            <Button onPress={alertConfirmAdjust}>Lưu</Button>
                        </View>
                    ) : (
                        <View style={styles.gr_btn}>
                            <Button outlined onPress={openAlertAdjust}>
                                Điều chỉnh lộ trình
                            </Button>
                            <Button onPress={handleStartLearning}>
                                Chấp nhận lộ trình
                            </Button>
                        </View>
                    )}
                </>
            )}
        </SafeAreaView>
    )
}

export default LearningPath

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 20
    },
    name_learning_path: {
        color: COLORS.colorBlack,
        fontSize: 15,
        fontWeight: '600'
    },
    color_content_timeline: {
        color: COLORS.colorWhite
    },
    title_content_timeline: {
        fontSize: 15,
        fontWeight: '600',
        textTransform: 'uppercase'
    },
    view_content_children_timeline: {
        flexDirection: 'row',
        paddingVertical: 5,
        alignItems: 'flex-start',
        paddingHorizontal: 10
    },
    title_children_timeline: {
        fontSize: 14,
        fontWeight: '500',
        width: '90%'
    },
    viewDescTimeLine: {
        height: 'auto',
        width: '100%',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 15
    },
    flatList_style: {
        paddingVertical: 20
    },
    view_card: {
        width: width - 60
    },
    itemName: {
        color: COLORS.colorBlack
    },
    gr_btn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 10,
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
        paddingVertical: 10,
        borderRadius: 10
    },
    text_btn_next: {
        fontSize: 18,
        color: COLORS.colorWhite
    },
    view_adjust: {
        borderWidth: 1,
        borderColor: '#FAF9F9',
        marginVertical: 5,
        borderRadius: 10,
        borderStyle: 'dotted'
    },
    process_stages: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})
