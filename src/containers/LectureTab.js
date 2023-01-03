import Axios from 'app/Axios'
import { useGlobalState } from 'app/Store'
import { NoData } from 'app/atoms'
import Curriculum from 'app/components/Curriculum'
import { scale } from 'app/helpers/responsive'
import { svgCircleBook } from 'assets/svg'
import React, { useEffect, useState } from 'react'

import { useNavigation } from '@react-navigation/native'
import { Text, View } from 'react-native'
import { SvgXml } from 'react-native-svg'

const LectureTab = ({ courseId, setChapters, navigateToLesson }) => {
    const [data, setData] = useState()
    const [totalLectures, setTotalLectures] = useState(0)
    const [finishedLectures, setFinishedLectures] =
        useGlobalState('finishedLectures')

    console.log('finishedLectures', finishedLectures)
    useEffect(() => {
        if (courseId) {
            Axios.get(`courses/chapter-list/paging/${courseId}`)
                .then(res => {
                    return res.data
                })
                .then(data => {
                    const chapters = data?.data
                    setFinishedLectures(data?.finished_lectures)

                    setData(chapters)
                    if (setChapters) {
                        const c = chapters.map(i => {
                            return i.lectures
                        })
                        setChapters(c.flat())
                    }
                    const sum = chapters.map(i => {
                        const sumWithInitial = i?.lectures.reduce(
                            (previousValue, _) => previousValue + 1,
                            0
                        )

                        return sumWithInitial
                    })

                    const sumWithInitial = sum.reduce(
                        (previousValue, currentValue) =>
                            previousValue + currentValue,
                        0
                    )
                    setTotalLectures(sumWithInitial)
                })
        }
    }, [courseId])

    if (!data) {
        return <NoData />
    }

    return (
        <>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: scale(16),
                    marginTop: scale(16)
                }}>
                <SvgXml
                    xml={svgCircleBook}
                    width={scale(40)}
                    height={scale(40)}
                />
                <Text
                    style={{
                        fontSize: scale(16),
                        color: '#007839',
                        marginLeft: scale(10)
                    }}>
                    {totalLectures} bài giảng
                </Text>
            </View>
            <View style={{ marginTop: scale(14) }}>
                {data?.map((item, index) => (
                    <Curriculum
                        key={index}
                        data={item}
                        navigateToLesson={navigateToLesson}
                    />
                ))}
            </View>
        </>
    )
}

export default LectureTab
