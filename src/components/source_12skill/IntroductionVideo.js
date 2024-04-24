import { useQuery } from '@apollo/client'
import { AbsoluteSpinner, showToast } from 'app/atoms'
import { API_URL } from 'app/constants'
import { GET_ROADMAP_PRETEST } from 'app/qqlStore/queries'
import React, { useEffect, useRef, useState } from 'react'

import { Alert, Dimensions, Modal, StyleSheet, Text, View } from 'react-native'
import Video from 'react-native-video'
import { WebView } from 'react-native-webview'

const { width, height } = Dimensions.get('screen')
function isPortrait() {
    const dim = Dimensions.get('screen')
    return dim.height >= dim.width
}

const frameStyle = {
    height: Math.min(width, height),
    width: isPortrait() ? Math.min(width, height) : Math.max(width, height),
    resizeMode: 'contain',
    flex: 1,
    border: 'none',
    border: 'none'
}
const IntroductionVideo = ({
    visible,
    setVisible,
    isReview = false,
    route
}) => {
    const {
        loading: isLoadingData,
        error,
        data
    } = useQuery(GET_ROADMAP_PRETEST)
    const [videoUrl, setVideoUrl] = useState(undefined)

    const [isYoutube, setIsYoutube] = useState()
    const [isBunnyVideo, setIsBunnyVideo] = useState()

    const [videoDuration, setVideoDuration] = useState(0)
    const [currentTime, setCurrentTime] = useState(-1)
    const [isFinishWatch, setIsFinishWatch] = useState(false)
    const videoRef = useRef(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isPlay, setIsPlay] = useState(false)

    const getVideoUrl = () => {
        const dataRoadmapPretest = data?.RoadmapPretest
        const iframeRegex = /<iframe[^>]*src="([^"]+)"[^>]*>/
        const match = dataRoadmapPretest?.description.match(iframeRegex)
        if (match) {
            setVideoUrl(match[1])
            setIsYoutube(match[1]?.includes('youtube.com'))
            setIsBunnyVideo(match[1]?.includes('iframe.mediadelivery.net'))
        }
        setTimeout(() => {
            setIsLoading(false)
        }, 1000)
    }
    useEffect(() => {
        getVideoUrl()
    }, [videoUrl, isLoadingData, data])

    const handleWebViewMessage = event => {
        const message = event.nativeEvent.data

        setVideoDuration(Math.floor(parseFloat(message)) - 10)
        setCurrentTime(1)
        setIsPlay(true)
    }

    const handleVideoLoad = () => {
        videoRef?.current?.injectJavaScript(`
        const video = document.getElementsByTagName('video')[0];
        video.addEventListener('loadedmetadata', function() {
          window?.ReactNativeWebView?.postMessage(video.duration);
        });
       
        video.addEventListener('pause', function(e) {
            e.preventDefault();
            document.querySelector('video').play();
        });
      
      `)
    }

    const finishWatchVideo = () => {
        showToast({
            title: 'Video giới thiệu đã kết thúc.',
            status: 'info'
        })
        setVisible(false)
    }

    const handleStartLearning = () => {
        Alert.alert(
            'Thông báo',
            `${'Bạn phải xem hết video hướng dẫn của tôi trước khi bắt đầu bài khảo sát?'}`,
            [
                {
                    text: 'Đóng',
                    style: 'cancel'
                }
            ]
        )
    }

    React.useEffect(() => {
        if (route?.params?.isReview || !videoUrl || !isPlay) return
        const interval = setInterval(() => {
            if (currentTime > videoDuration) {
                setIsFinishWatch(true)
                finishWatchVideo()
                clearInterval(interval)
            } else {
                setCurrentTime(prev => prev + 1)
            }
        }, 1000)

        return () => clearInterval(interval)
    }, [currentTime, videoDuration, isPlay])

    if (isLoading && isLoadingData && !videoUrl)
        return <AbsoluteSpinner title={'Đang tải video'} />

    const renderVideoViewer = () => {
        if (isYoutube)
            return (
                <WebView
                    ref={videoRef}
                    originWhitelist={['*']}
                    onMessage={handleWebViewMessage}
                    // mediaPlaybackRequiresUserAction={false}
                    // javaScriptEnabled={true}
                    // injectJavaScript={`document.querySelector('video').play();`}
                    onLoad={handleVideoLoad}
                    allowsFullscreenVideo={true}
                    source={{
                        uri: videoUrl
                    }}
                    style={frameStyle}
                />
            )

        if (isBunnyVideo)
            return (
                <WebView
                    ref={videoRef}
                    onMessage={handleWebViewMessage}
                    onLoad={handleVideoLoad}
                    mediaPlaybackRequiresUserAction={true}
                    allowsInlineMediaPlayback={false}
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
                controls
                seek={0}
                onMessage={handleWebViewMessage}
                onLoad={handleVideoLoad}
                mediaPlaybackRequiresUserAction={true}
                allowsInlineMediaPlayback={false}
                ignoreSilentSwitch="ignore"
                source={{
                    uri: `${API_URL}/public/${videoUrl}`
                }}
            />
        )
    }

    if (route?.params?.isReview)
        return (
            <View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                    width: width
                }}>
                <View
                    style={{
                        height: height / 2,
                        width: width - 20,
                        borderRadius: 5
                    }}>
                    {renderVideoViewer()}
                </View>
            </View>
        )
    return (
        <Modal
            isVisible={visible}
            transparent={true}
            onRequestClose={() => {
                if (!isFinishWatch) return handleStartLearning()
                setVisible(false)
            }}>
            <View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                    width: width
                }}>
                <View
                    style={{
                        height: height / 2,
                        width: width - 20,
                        borderRadius: 5
                    }}>
                    {renderVideoViewer()}
                </View>
            </View>
        </Modal>
    )
}

export default IntroductionVideo

const styles = StyleSheet.create({})
