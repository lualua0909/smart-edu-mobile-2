import { showToast } from 'app/atoms'
import React, { useEffect } from 'react'

import { Dimensions } from 'react-native'
import { WebView } from 'react-native-webview'

const w = Dimensions.get('window').width
const h = Dimensions.get('window').height

function isPortrait() {
    const dim = Dimensions.get('screen')
    return dim.height >= dim.width
}

export default ({ content, uri }) => {
    useEffect(() => {
        if (uri && isPortrait()) {
            showToast({
                title: 'Xoay ngang màn hình thiết bị để hiển thị PDF toàn màn hình',
                status: 'info'
            })
        }
    }, [])

    return uri ? (
        <WebView
            originWhitelist={['*']}
            source={{
                uri
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
                console.log('uri = ', uri)
                console.log('onLoadStart', nativeEvent.loading)
            }}
            onLoadEnd={syntheticEvent => {
                const { nativeEvent } = syntheticEvent
                console.log('onLoadEnd', nativeEvent.loading)
            }}
        />
    ) : (
        <WebView
            originWhitelist={['*']}
            source={{
                html: content
            }}
            nestedScrollEnabled={true}
            textZoom={100}
            showsVerticalScrollIndicator={true}
            style={{
                backgroundColor: '#fff',
                height: Math.min(w, h),
                width: Math.max(w, h),
                padding: 20,
                marginBottom: 14
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
