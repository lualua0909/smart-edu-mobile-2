import React, { useState } from 'react'
import { WebView } from 'react-native-webview'
import { Dimensions, Text } from 'react-native'
import { API_URL } from 'app/constants'

const w = Dimensions.get('window').width
const h = Dimensions.get('window').height

export default ({ videoUrl }) => {
    const [loading, setLoading] = useState(true)

    const embedLink = videoUrl?.includes('/watch?v=')
        ? videoUrl?.replace('/watch?v=', '/embed/') + '?autoplay=1'
        : videoUrl?.includes('onedrive.live.com')
        ? videoUrl
        : API_URL + '/public/' + videoUrl

    return (
        <>
            {loading && <Text>Loading</Text>}
            <WebView
                originWhitelist={['*']}
                source={{
                    uri: embedLink,
                }}
                style={{
                    height: Math.min(w, h),
                    width: Math.max(w, h),
                    border: 'none',
                }}
                onLoadEnd={(syntheticEvent) => {
                    setLoading(false)
                }}
            />
        </>
    )
}
