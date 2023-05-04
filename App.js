import { useGlobalState } from 'app/Store'
import { showToast } from 'app/atoms'
import { getData } from 'app/helpers/utils'
import React, { useEffect } from 'react'

import messaging from '@react-native-firebase/messaging'
import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'react-native'
import SplashScreen from 'react-native-splash-screen'

import SwitchNavigator from 'app/navigation/switch-navigator'
import { NativeBaseProvider, extendTheme } from 'native-base'

const App = () => {
    const [userInfo, setUserState] = useGlobalState('userInfo')
    const [random, setRandom] = useGlobalState('random')

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
        <NativeBaseProvider theme={theme}>
            <StatusBar hidden />
            <NavigationContainer
                onStateChange={navigationState => {
                    const { name } = getFocusRoute(
                        navigationState.routes[navigationState.index]
                    )
                    console.log('Route', name)
                }}>
                <SwitchNavigator />
            </NavigationContainer>
        </NativeBaseProvider>
    )
}

export default App

const theme = extendTheme({
    fontConfig: {
        Roboto: {
            100: {
                normal: 'Mulish-Light',
                italic: 'Mulish-LightItalic'
            },
            200: {
                normal: 'Mulish-Light',
                italic: 'Mulish-LightItalic'
            },
            300: {
                normal: 'Mulish-Light',
                italic: 'Mulish-LightItalic'
            },
            400: {
                normal: 'Mulish-Regular',
                italic: 'Mulish-Italic'
            },
            500: {
                normal: 'Mulish-Medium'
            },
            600: {
                normal: 'Mulish-Medium',
                italic: 'Mulish-MediumItalic'
            }
        }
    },
    colors: {
        primary: {
            50: '#52B553',
            100: '#52B553',
            200: '#52B553',
            300: '#52B553',
            400: '#52B553',
            500: '#52B553',
            600: '#52B553',
            700: '#52B553',
            800: '#52B553',
            900: '#52B553'
        }
    },
    // Make sure values below matches any of the keys in `fontConfig`
    fonts: {
        heading: 'Mulish-Regular',
        body: 'Mulish-Regular',
        mono: 'Mulish-Regular'
    },
    components: {
        Button: {
            baseStyle: { rounded: 7 },
            sizes: {
                xs: { px: 6, py: 1 },
                md: { px: 6, py: 1 },
                sm: { px: 6, py: 1 }
            },
            variants: {
                outline: ({ colorScheme }) => {
                    return { borderColor: `${colorScheme}.500` }
                }
            }
        },
        Heading: {
            // Can pass also function, giving you access theming tools
            baseStyle: ({ colorMode }) => {
                return {
                    color: colorMode === 'dark' ? 'red.300' : 'blue.300',
                    fontWeight: 'normal'
                }
            }
        }
    }
})
