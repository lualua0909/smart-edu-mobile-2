import { AbsoluteSpinner } from 'app/atoms'
import { API_URL } from 'app/constants'
import React, { useRef, useState } from 'react'

import { useIsFocused } from '@react-navigation/native'
import { Dimensions } from 'react-native'
import Video from 'react-native-video'
import { WebView } from 'react-native-webview'

const w = Dimensions.get('window').width
const h = Dimensions.get('window').height

function isPortrait() {
    const dim = Dimensions.get('screen')
    return dim.height >= dim.width
}

const frameStyle = {
    height: 200,
    width: isPortrait() ? Math.min(w, h) : Math.max(w, h),
    resizeMode: 'contain',
    flex: 1,
    border: 'none'
}

export default ({ videoUrl, poster }) => {
    const [loading, setLoading] = useState(false)
    const videoRef = useRef(null)
    const isBunnyVideo = videoUrl?.includes('iframe.mediadelivery.net')
    const isYoutube = videoUrl?.includes('youtube.com')
    const isFocused = useIsFocused()

    if (loading) {
        return <AbsoluteSpinner title={'Đang tải video'} />
    }

    if (isYoutube)
        return (
            <WebView
                originWhitelist={['*']}
                source={{
                    uri:
                        videoUrl?.replace('/watch?v=', '/embed/') +
                        '?autoplay=1'
                }}
                style={frameStyle}
                onLoadEnd={syntheticEvent => {
                    setLoading(false)
                }}
            />
        )

    if (isBunnyVideo)
        return (
            <WebView
                originWhitelist={['*']}
                source={{
                    html: videoUrl
                }}
                style={frameStyle}
                onRenderProcessGone={event => console.log(event)}
                onLoadEnd={syntheticEvent => {
                    setLoading(false)
                }}
            />
        )

    return (
        <Video
            ref={videoRef}
            poster={poster}
            controls
            source={{
                uri: `${API_URL}/public/${videoUrl}`
            }} // Can be a URL or a local file.
            paused={!isFocused}
            style={{ height: 250, width: '100%' }}
            playInBackground={false}
            playWhenInactive={false}
        />
    )
}
