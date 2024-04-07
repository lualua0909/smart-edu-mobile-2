/**
 * @format
 */
import messaging from '@react-native-firebase/messaging'
import { AppRegistry } from 'react-native'
import { LogBox, Text } from 'react-native'

// import 'antd-mobile/bundle/css-vars-patch.css'
import App from './App'
import { name as appName } from './app.json'

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage)
})

LogBox.ignoreAllLogs(true)

if (Text.defaultProps == null) {
    Text.defaultProps = {}
    Text.defaultProps.allowFontScaling = false
}
AppRegistry.registerComponent(appName, () => App)
