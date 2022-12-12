import React, { useEffect } from 'react'
// import JitsiMeet, { JitsiMeetView } from 'react-native-jitsi-meet'
import { StyleSheet, View, StatusBar, Text } from 'react-native'

function JitsiMeetScene() {
    return <Text>JitsiMeeting</Text>
    // useEffect(() => {
    //     StatusBar.setHidden(false, 'none')
    //     StatusBar.setTranslucent(false)
    //     StatusBar.setBackgroundColor('#000000') // optional
    //     StatusBar.setBarStyle('light-content') // optional
    // }, [])

    // useEffect(() => {
    //     const url = 'https://meet.jit.si/854530'
    //     const userInfo = {
    //         displayName: 'User',
    //         email: 'user@example.com',
    //         avatar: 'https:/gravatar.com/avatar/abc123',
    //     }
    //     JitsiMeet.call(url, userInfo)
    // }, [])

    // useEffect(() => {
    //     return () => {
    //         JitsiMeet.endCall()
    //     }
    // })

    // function onConferenceTerminated(nativeEvent) {
    //     /* Conference terminated event */
    //     console.log(nativeEvent)
    // }

    // function onConferenceJoined(nativeEvent) {
    //     /* Conference joined event */
    //     console.log(nativeEvent)
    // }

    // function onConferenceWillJoin(nativeEvent) {
    //     /* Conference will join event */
    //     console.log(nativeEvent)
    // }
    // return (
    //     <View style={StyleSheet.absoluteFillObject}>
    //         <JitsiMeetView
    //             onConferenceTerminated={(e) => onConferenceTerminated(e)}
    //             onConferenceJoined={(e) => onConferenceJoined(e)}
    //             onConferenceWillJoin={(e) => onConferenceWillJoin(e)}
    //             style={{
    //                 flex: 1,
    //                 height: '100%',
    //                 width: '100%',
    //                 ...StyleSheet.absoluteFillObject,
    //             }}
    //         />
    //         <View style={{ position: 'absolute', top: 100, left: 50 }} />
    //     </View>
    // )
}
export default JitsiMeetScene
