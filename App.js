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
import { getData, isIOS } from 'app/helpers/utils'
import React, { useEffect } from 'react'

import firebase from '@react-native-firebase/app'
import messaging from '@react-native-firebase/messaging'
import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import SplashScreen from 'react-native-splash-screen'
import Toast, {
    BaseToast,
    BaseToastProps,
    ToastConfig
} from 'react-native-toast-message'

import SwitchNavigator from 'app/navigation/switch-navigator'

const firebaseConfig = {
    // Your project's configuration object goes here.
}
firebase.initializeApp(firebaseConfig)
const linking = {
    prefixes: isIOS ? ['IfaSmartTraining://'] : ['ifa_smart_training://']
}

const toastProps = {
    text1Style: {
        fontSize: 16
    },
    text2Style: {
        fontSize: 13
    },
    text2NumberOfLines: 0,
    style: {
        height: 'auto',
        paddingVertical: 10,
        paddingHorizontal: 0
    }
}

export const toastConfig = {
    success: props => (
        <BaseToast
            {...props}
            {...toastProps}
            style={[
                toastProps.style,
                {
                    borderLeftColor: '#69C779'
                }
            ]}
        />
    ),
    error: props => (
        <BaseToast
            {...props}
            {...toastProps}
            style={[
                toastProps.style,
                {
                    borderLeftColor: '#FE6301'
                }
            ]}
        />
    ),
    warning: props => (
        <BaseToast
            {...props}
            {...toastProps}
            style={[
                toastProps.style,
                {
                    borderLeftColor: '#FFC107'
                }
            ]}
        />
    )
}

const App = () => {
    const [userInfo, setUserState] = useGlobalState('userInfo')
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
        const userInfo = getData('@userInfo')
        if (userInfo) {
            setUserState(userInfo)
        }
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
            <GestureHandlerRootView style={{ flex: 1 }}>
                <StatusBar hidden />
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
                <Toast config={toastConfig} />
                <ModalNotLogin visible={visible} setVisible={setVisible} />
            </GestureHandlerRootView>
        </ApolloProvider>
    )
}

export default App
