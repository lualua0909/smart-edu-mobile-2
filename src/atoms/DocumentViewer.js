import React from 'react'
import { Dimensions } from 'react-native'
import { WebView } from 'react-native-webview'

const w = Dimensions.get('window').width
const h = Dimensions.get('window').height

export default ({ content }) => (
    <WebView
        originWhitelist={['*']}
        source={{
            html: content,
        }}
        nestedScrollEnabled={true}
        textZoom={100}
        showsVerticalScrollIndicator={true}
        style={{
            backgroundColor: '#fff',
            height: Math.min(w, h),
            width: Math.max(w, h),
            padding: 20,
            marginBottom: 14,
        }}
        onLoadStart={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent
            console.log('onLoadStart', nativeEvent.loading)
        }}
        onLoadEnd={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent
            console.log('onLoadEnd', nativeEvent.loading)
        }}
    />
)
