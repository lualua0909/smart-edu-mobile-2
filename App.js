import {
    ApolloClient,
    ApolloProvider,
    InMemoryCache,
    createHttpLink
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { useGlobalState } from 'app/Store'
import { ModalNotLogin, showToast } from 'app/atoms'
import { API_URL } from 'app/constants'
import { getData } from 'app/helpers/utils'
import React, { useEffect } from 'react'

import firebase from '@react-native-firebase/app'
import messaging from '@react-native-firebase/messaging'
import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'react-native'
import { Platform } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import SplashScreen from 'react-native-splash-screen'

import SwitchNavigator from 'app/navigation/switch-navigator'
import { NativeBaseProvider, extendTheme } from 'native-base'

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

    const httpLink = createHttpLink({
        uri: API_URL + 'graphql' + `${userInfo?.token ? '/secret' : ''}`
    })
    const authLink = setContext((_, { headers }) => {
        return {
            headers: {
                ...headers,
                Authorization: `Bearer ${userInfo?.token}`
            }
        }
    })

    const client = new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache(),
        defaultOptions: { watchQuery: { fetchPolicy: 'no-cache' } }
    })

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
        <ApolloProvider client={client}>
            <NativeBaseProvider theme={theme}>
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
        </ApolloProvider>
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
                normal: 'Mulish-Medium',
                italic: 'Mulish-MediumItalic'
            },
            600: {
                normal: 'Mulish-SemiBold',
                italic: 'Mulish-SemiBoldItalic'
            },
            700: {
                normal: 'Mulish-Bold',
                italic: 'Mulish-BoldItalic'
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
        heading: 'Roboto',
        body: 'Roboto',
        mono: 'Roboto'
    },
    components: {
        Button: {
            baseStyle: { rounded: 7 },
            sizes: {
                xs: { px: 6, py: 1 },
                md: { px: 6 },
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
