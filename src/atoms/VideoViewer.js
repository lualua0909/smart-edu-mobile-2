import { Loading } from 'app/atoms'
import { API_URL } from 'app/constants'
import React, { useEffect, useRef, useState } from 'react'

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
    height: Math.min(w, h),
    width: isPortrait() ? Math.min(w, h) : Math.max(w, h),
    resizeMode: 'contain',
    flex: 1,
    border: 'none',
    border: 'none'
}

export default ({ videoUrl, poster }) => {
    const [loading, setLoading] = useState(false)
    const videoRef = useRef(null)
    const isBunnyVideo = videoUrl?.includes('iframe.mediadelivery.net')
    const isYoutube = videoUrl?.includes('youtube.com')

    if (loading) {
        return <Loading title={'Đang tải video'} />
    }

    // useEffect(() => {
    //     if (!videoRef.current) return
    //     return () => {
    //         videoRef.current.seek(0)
    //     }
    // }, [videoRef])

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
                onLoadStart={syntheticEvent => {
                    setLoading(true)
                }}
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
            />
        )

    return (
        <Video
            ref={videoRef}
            poster={poster}
            controls
            seek={0}
            ignoreSilentSwitch="ignore"
            source={{
                uri: `${API_URL}/public/${videoUrl}`
            }} // Can be a URL or a local file.
            // onVideoLoadStart={() => setLoading(true)}
            onSeek={data => console.log(data)}
            // onVideoEnd={() => setLoading(false)}
            style={{ height: 200, width: '100%' }}
        />
    )
}
