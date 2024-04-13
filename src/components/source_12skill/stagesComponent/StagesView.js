import React from 'react'

import { StyleSheet, Text, View } from 'react-native'
import { Dimensions } from 'react-native'

import ListCourse from './components/ListCourse'
import VideoIntroduction from './components/VideoIntroduction'

const { width, height } = Dimensions.get('screen')

const StagesView = ({ navigation, route }) => {
    const { data } = route.params
    console.log('🚀 ~ StagesView ~ data:', data)
    return (
        <View style={styles.container}>
            {/* <VideoIntroduction /> */}
            <ListCourse dataStage={data} />
        </View>
    )
}

export default StagesView

const styles = StyleSheet.create({
    container: {
        width: width,
        height: height
    }
})
