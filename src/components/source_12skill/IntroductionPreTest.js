import { useQuery } from '@apollo/client'
import {
    Avatar,
    CourseDetailSkeleton,
    NoData,
    Rate,
    VideoViewer,
    showToast
} from 'app/atoms'
import { GET_ROADMAP_PRETEST } from 'app/qqlStore/queries'
import React from 'react'

import { StyleSheet, Text, View } from 'react-native'

const IntroductionPreTest = () => {
    const { loading, error, data } = useQuery(GET_ROADMAP_PRETEST)
    console.log('🚀 ~ EntranceTest ~ data:', data)

    return (
        <View>
            <VideoViewer
                videoUrl={data?.video_path}
                poster={`${COURSE_IMG_PATH}${data?.id}.webp`}
            />
            <Text>IntroductionPreTest</Text>
            <></>
        </View>
    )
}

export default IntroductionPreTest

const styles = StyleSheet.create({})
