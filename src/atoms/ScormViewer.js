import { AbsoluteSpinner, showToast } from 'app/atoms'
import React, { useEffect, useState } from 'react'

import { Dimensions } from 'react-native'
import { WebView } from 'react-native-webview'

const w = Dimensions.get('window').width
const h = Dimensions.get('window').height

function isPortrait() {
    const dim = Dimensions.get('screen')
    return dim.height >= dim.width
}

export default ({ src }) => {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (isPortrait()) {
            showToast({
                title: 'Xoay ngang màn hình thiết bị để hiển thị toàn màn hình bài giảng SCORM',
                description: '',
                placement: 'bottom'
            })
        }
    }, [])

    return (
        <>
            {loading && <AbsoluteSpinner title="Đang tải bài học..." />}
            <WebView
                originWhitelist={['https://*']}
                javaScriptEnabled={true}
                source={{
                    uri: src
                }}
                onLoadStart={() => {
                    console.log('loading = ', src)
                }}
                onError={syntheticEvent => {
                    const { nativeEvent } = syntheticEvent
                    console.warn('WebView error: ', nativeEvent)
                }}
                onLoadProgress={({ nativeEvent }) => {
                    console.log('loadingProgress', nativeEvent.progress)
                }}
                onLoadEnd={syntheticEvent => {
                    // update component to be aware of loading status
                    setLoading(false)
                }}
                style={{
                    height: Math.min(w, h),
                    width: isPortrait() ? Math.min(w, h) : Math.max(w, h),
                    display: loading ? 'none' : 'flex'
                }}
            />
        </>
    )
}
