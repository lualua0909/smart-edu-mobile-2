import React from 'react'

import { Dimensions, StyleSheet, Text, View } from 'react-native'

const { width, height } = Dimensions.get('screen')

const VideoIntroduction = () => {
    return (
        <View style={styles.viewVideoIntroduce}>
            <Text style={{ color: '#000', textAlign: 'center' }}>
                Video giới thiệu
            </Text>
        </View>
    )
}

export default VideoIntroduction

const styles = StyleSheet.create({
    viewVideoIntroduce: {
        width: width,
        height: height / 3,
        backgroundColor: 'rgba(224, 244, 244, 0.4)',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
})
