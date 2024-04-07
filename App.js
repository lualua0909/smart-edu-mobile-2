import { useGlobalState } from 'app/Store'
import { ModalNotLogin, showToast } from 'app/atoms'
import { getData } from 'app/helpers/utils'
import React, { useEffect } from 'react'

import firebase from '@react-native-firebase/app'
import messaging from '@react-native-firebase/messaging'
import { NavigationContainer } from '@react-navigation/native'
import { Platform, StatusBar } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import SplashScreen from 'react-native-splash-screen'

import SwitchNavigator from 'app/navigation/switch-navigator'
import { NativeBaseProvider } from 'native-base'

const firebaseConfig = {
    // Your project's configuration object goes here.
}
firebase.initializeApp(firebaseConfig)
const linking = {
    prefixes:
        Platform.OS === 'ios'
            ? ['IfaSmartTraining://']
            : ['ifa_smart_training://']
}
const App = () => {
    const [userInfo, setUserState] = useGlobalState('userInfo')
    const [random, setRandom] = useGlobalState('random')
    const [visible, setVisible] = useGlobalState('visibleNotLogin')

    useEffect(() => {
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            const { title, body } = remoteMessage?.notification
            showToast({
                title,
                description: body,
                status: 'info'
            })
        })

        return unsubscribe
    }, [])

    const requestUserPermission = async () => {
        const authStatus = await messaging().requestPermission()
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL

        if (enabled) {
            console.log('Authorization status:', authStatus)
        }
    }

    useEffect(() => {
        requestUserPermission()
    }, [])

    const fetchData = () => {
        let userInfo = getData('@userInfo')
        if (userInfo) {
            setUserState(userInfo)
        }
        setRandom(Math.random())

        SplashScreen.hide()
    }

    useEffect(() => {
        fetchData()
    }, [])

    const getFocusRoute = route => {
        try {
            if (route.state != undefined) {
                let { index, routes } = route.state
                return getFocusRoute(routes[index])
            }

            return route
        } catch (error) {
            return null
        }
    }

    return (
        <NativeBaseProvider>
            <StatusBar hidden />
            <GestureHandlerRootView style={{ flex: 1 }}>
                <NavigationContainer
                    linking={linking}
                    onStateChange={navigationState => {
                        const { name } = getFocusRoute(
                            navigationState.routes[navigationState.index]
                        )
                        console.log('Route', name)
                    }}>
                    <SwitchNavigator />
                </NavigationContainer>
                <ModalNotLogin visible={visible} setVisible={setVisible} />
            </GestureHandlerRootView>
        </NativeBaseProvider>
    )
}

export default App
