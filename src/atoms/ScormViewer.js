import React from 'react'

import { Dimensions } from 'react-native'
import { WebView } from 'react-native-webview'

const w = Dimensions.get('window').width
const h = Dimensions.get('window').height

export default ({ src }) => {
    return (
        <WebView
            originWhitelist={['*']}
            source={{
                uri: src
            }}
            style={{
                height: Math.min(w, h),
                width: Math.max(w, h),
                border: 'none'
            }}
            onLoadStart={syntheticEvent => {
                const { nativeEvent } = syntheticEvent
                console.log('onLoadStart', nativeEvent.loading)
            }}
            onLoadEnd={syntheticEvent => {
                const { nativeEvent } = syntheticEvent
                console.log('onLoadEnd', nativeEvent.loading)
            }}
        />
    )
}
