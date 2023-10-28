import { API_URL } from 'app/constants'
import React, { useState } from 'react'

import { Dimensions } from 'react-native'
import Video from 'react-native-video'
import { WebView } from 'react-native-webview'

import { Text } from 'native-base'

const w = Dimensions.get('window').width
const h = Dimensions.get('window').height

function isPortrait() {
    const dim = Dimensions.get('screen')
    return dim.height >= dim.width
}

const frameStyle = {
    height: Math.min(w, h),
    width: isPortrait() ? Math.min(w, h) : Math.max(w, h),
    resizeMode: 'contain',
    flex: 1,
    border: 'none',
    border: 'none'
}

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
                        uri: embedLink
                    }}
                    style={frameStyle}
                    onLoadEnd={syntheticEvent => {
                        setLoading(false)
                    }}
                />
            ) : isBunnyVideo ? (
                <WebView
                    originWhitelist={['*']}
                    source={{
                        html: embedLink
                    }}
                    style={frameStyle}
                    onLoadEnd={syntheticEvent => {
                        setLoading(false)
                    }}
                />
            ) : (
                <Video
                    controls
                    source={{
                        uri: embedLink
                    }} // Can be a URL or a local file.
                    style={{ height: 200, width: '100%' }}
                />
            )}
        </>
    )
}
