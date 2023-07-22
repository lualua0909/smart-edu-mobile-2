import React from 'react'

import { Dimensions } from 'react-native'
import { WebView } from 'react-native-webview'

const w = Dimensions.get('window').width
const h = Dimensions.get('window').height

function isPortrait() {
    const dim = Dimensions.get('screen')
    return dim.height >= dim.width
}

export default ({ src }) => {
    return (
        <WebView
            originWhitelist={['*']}
            source={{
                uri: src
            }}
            style={{
                height: Math.min(w, h),
                width: isPortrait() ? Math.min(w, h) : Math.max(w, h),
                resizeMode: 'contain',
                flex: 1,
                border: 'none'
            }}
            allowsInlineMediaPlayback={true}
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
