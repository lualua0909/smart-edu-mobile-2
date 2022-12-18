import React, { useState } from 'react'
import { WebView } from 'react-native-webview'
import { Dimensions, Text } from 'react-native'
import { API_URL } from 'app/constants'
import Video from 'react-native-video'

const w = Dimensions.get('window').width
const h = Dimensions.get('window').height

export default ({ videoUrl }) => {
    const [loading, setLoading] = useState(true)

    const isBunnyVideo = videoUrl?.includes('iframe.mediadelivery.net')
    const isYoutube = videoUrl?.includes('youtube.com')

    const embedLink = isYoutube
        ? videoUrl?.replace('/watch?v=', '/embed/') + '?autoplay=1'
        : isBunnyVideo
        ? videoUrl
        : API_URL + '/public/' + videoUrl

    return (
        <>
            {loading && <Text>Loading</Text>}
            {isYoutube ? (
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
            ) : isBunnyVideo ? (
                <WebView
                    originWhitelist={['*']}
                    source={{
                        html: embedLink,
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
            ) : (
                <Video
                    controls
                    source={{
                        uri: embedLink,
                    }} // Can be a URL or a local file.
                    style={{ height: 200, width: '100%' }}
                />
            )}
        </>
    )
}
