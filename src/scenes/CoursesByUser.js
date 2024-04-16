import MyCourseList from 'app/components/MyCourseList'
import React from 'react'

import { ScrollView, View } from 'react-native'

const CoursesByUser = ({ route }) => {
    const { userId } = route.params

    return (
        <View style={{ flex: 1, backgroundColor: '#fff', marginBottom: 20 }}>
            <MyCourseList userId={userId} />
        </View>
    )
}

export default CoursesByUser
