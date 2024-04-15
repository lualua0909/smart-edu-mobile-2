import { useQuery } from '@apollo/client'
import axios from 'app/Axios'
import { LoadingAnimation } from 'app/atoms'
import { showToast } from 'app/atoms'
import { COLORS, DATA_FAKE_12_SKILL, ROUTES } from 'app/constants'
import { getData, storeData } from 'app/helpers/utils'
import storage from 'app/localStorage'
import {
    COURSE_GROUP_LIST,
    COURSE_LIST,
    GET_ROADMAP_PRETEST,
    ROADMAP_LIST
} from 'app/qqlStore/queries'
import { svgAdjust } from 'assets/svg'
import { svgVideo } from 'assets/svg'
import _ from 'lodash'
import React from 'react'

import {
    Alert,
    Dimensions,
    Pressable,
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
import IntroductionVideo from './IntroductionVideo'
import { RenderBackgroundColor, RenderColorStage } from './renderColorRestult'
import { SaveScreenToStore } from './saveScreenToStore'

const { width, height } = Dimensions.get('screen')

const LearningPath = ({ navigation, route }) => {
    const { data: dataRoadmap, refetch } = useQuery(ROADMAP_LIST, {
        variables: { course_id: 162 }
    })

    const { data: DataCourseList } = useQuery(COURSE_GROUP_LIST)

    const [data, setData] = React.useState([])
    const [user, setUser] = React.useState()
    const [isLoading, setIsLoading] = React.useState(false)
    const [isAdjust, setIsAdjust] = React.useState(false)
    const [isRefetchQuery, setIsRefetchQuery] = React.useState(false)
    const [hasAdjust, setHasAdjust] = React.useState(true)
    const [dataAdjustCourse, setDataAdjustCourse] = React.useState([])
    const [visibleVideoIntroduction, setVisibleIntroduction] =
        React.useState(false)

    React.useEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                return (
                    <View style={{ paddingHorizontal: 10 }}>
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate(ROUTES.VideoIntroduction, {
                                    isReview: true
                                })
                            }>
                            <SvgXml xml={svgVideo} width={24} height={24} />
                        </TouchableOpacity>
                    </View>
                )
            }
        })
    }, [])

    const formatData = () => {
        setIsLoading(true)
        if (!dataRoadmap && !DataCourseList) return
        const courseGroupList = DataCourseList?.CourseGroups.data
        const roadmapData = dataRoadmap?.Roadmaps.data

        const adjust = roadmapData[0].sub_course.order_number2 !== 0
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
        const sortByOrderNumber = removeUndefined.map(item => {
            const sorted = sortByOrder(item.children)
            return {
                ...item,
                children: sorted
            }
        })
        setData(sortByOrderNumber)
        setIsLoading(false)
    }

    React.useEffect(() => {
        if (dataRoadmap && DataCourseList) {
            formatData()
        }
    }, [dataRoadmap, DataCourseList, isRefetchQuery])

    const saveAdjust = () => {
        setIsLoading(true)
        const courses = []
        dataAdjustCourse.map(stages => {
            stages.children.map(children => {
                const order2 = children.sub_course.order_number2
                const order1 = children.sub_course.order_number
                courses.push({
                    id: children.sub_course.id,
                    order: order2 === 0 ? order1 : order2
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
                setIsRefetchQuery()
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
        if (sectionID === 0) {
            const title = course.name
            navigation.navigate(ROUTES.StagesView, {
                title: title,
                data: course
            })
        } else {
            showToast({
                title: 'Bạn chưa thể học CHẶNG này',
                placement: 'top'
            })
        }
    }

    const renderData = () => {
        // setIsLoading(true)
        const userInfoStore = getData('@userInfo')
        if (userInfoStore) {
            // storage.delete(`COURSE_12_SKILL_ID_USER_${userInfoStore?.id}`)
            // storage.delete('SCREEN')
            setUser(userInfoStore)

            // if (dataCourseFromStore) {
            //     const jsonDataCourse = JSON.parse(dataCourseFromStore)
            //     setHasAdjust(jsonDataCourse.isAdjust)
            //     dataCourse = jsonDataCourse.data
            // }
            // const dataSort = dataCourse.map(stages => {
            //     const sorted = sortByOrder(stages.children)
            //     return {
            //         ...stages,
            //         children: sorted
            //     }
            // })
            // setDataAdjustCourse(dataSort)
            // setData(dataSort)
            // const setLoadingTimeout = setTimeout(() => {
            //     setIsLoading(false)
            // }, 100)
            // return () => clearTimeout(setLoadingTimeout)
        }
    }

    React.useEffect(() => {
        renderData()
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
            `${!hasAdjust
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
    if (visibleVideoIntroduction)
        return (
            <IntroductionVideo
                setVisible={setVisibleIntroduction}
                visible={visibleVideoIntroduction}
                isReview={true}
            />
        )

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

    const contentDetailElement = (rowData, sectionID) => {
        const { color, background } = RenderBackgroundColor(
            sectionID === 0,
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
                            {rowData.process} %
                        </Text>
                        <Progress.Bar
                            progress={rowData?.process}
                            color="green"
                            style={{ width: '80%', marginLeft: 10 }}
                        />
                    </View>
                )}
            </View>
        )
    }
    const renderDetail = (rowData, sectionID, rowId) => {
        return !hasAdjust ? (
            <View>{contentDetailElement(rowData, sectionID)}</View>
        ) : (
            <TouchableOpacity
                onPress={() => {
                    if (!hasAdjust) return
                    handleViewStages(rowData, sectionID)
                }}>
                {contentDetailElement(rowData, sectionID)}
            </TouchableOpacity>
        )
    }
    return (
        <SafeAreaView edges={['top', 'left', 'right']} style={styles.container}>
            {!isLoading ? (
                <Timeline
                    renderTime={renderTime}
                    data={data}
                    renderDetail={(rowData, sectionID, rowId) =>
                        renderDetail(rowData, sectionID, rowId)
                    }
                    style={{
                        maxHeight: !hasAdjust ? height - 200 : height - 130
                    }}
                    lineColor="#FAF9F9"
                    circleSize={10}
                    circleColor={'#FAF9F9'}
                />
            ) : (
                <LoadingAnimation />
            )}
            {!hasAdjust && (
                <>
                    {isAdjust ? (
                        <View style={styles.gr_btn}>
                            <Text
                                onPress={openAlertCancelAdjust}
                                style={[
                                    styles.gr_btn_width,
                                    styles.text_cancel
                                ]}>
                                Trở về
                            </Text>
                            <Pressable
                                onPress={alertConfirmAdjust}
                                style={[styles.gr_btn_width, styles.btn_next]}>
                                <Text
                                    style={[
                                        styles.text_color,
                                        styles.text_btn_next
                                    ]}>
                                    Lưu
                                </Text>
                            </Pressable>
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
