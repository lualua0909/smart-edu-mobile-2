import AsyncStorage from '@react-native-async-storage/async-storage'
import { NavigationContainer } from '@react-navigation/native'
import { API_URL } from 'app/constants'
import SwitchNavigator from 'app/navigation/switch-navigator'
import { useGlobalState } from 'app/Store'
import React, { useEffect, useState } from 'react'
import { StatusBar, Dimensions } from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import EncryptedStorage from 'react-native-encrypted-storage'
import {
    Skeleton,
    VStack,
    Center,
    NativeBaseProvider,
    extendTheme,
} from 'native-base'
import Orientation from 'react-native-orientation'

const App = () => {
    const [userInfo, setUserState] = useGlobalState('userInfo')
    const [random, setRandom] = useGlobalState('random')
    const [windowWidth, setWindowWidth] = useGlobalState('windowWidth')
    const [windowHeight, setWindowHeight] = useGlobalState('windowHeight')
    const [loading, setLoading] = useState(false)

    async function fetchData() {
        let userInfo = await EncryptedStorage.getItem('@userInfo')
        userInfo = userInfo ? JSON.parse(userInfo) : null

        if (userInfo) {
            setUserState(userInfo)
        }
        setRandom(Math.random())

        SplashScreen.hide()
    }

    useEffect(() => {
        fetchData()
    }, [])

    const getFocusRoute = (route) => {
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
            {!loading ? (
                <>
                    <StatusBar hidden />
                    <NavigationContainer
                        onStateChange={(navigationState) => {
                            const { name } = getFocusRoute(
                                navigationState.routes[navigationState.index]
                            )
                            console.log('Route', name)

                            const w = Dimensions.get('window').width
                            const h = Dimensions.get('window').height

                            if (name === 'CourseDetail') {
                                Orientation.lockToLandscapeLeft()
                                setWindowWidth(Math.max(w, h))
                                setWindowHeight(Math.min(w, h))
                            } else {
                                Orientation.getOrientation(
                                    (err, orientation) => {
                                        if (orientation === 'LANDSCAPE') {
                                            Orientation.lockToPortrait()
                                        }
                                    }
                                )
                            }
                        }}
                    >
                        <SwitchNavigator />
                    </NavigationContainer>
                </>
            ) : (
                <Center
                    w="100%"
                    style={{ backgroundColor: '#6C746E', padding: 20 }}
                >
                    <VStack
                        w="100%"
                        h="100%"
                        maxW="400"
                        space={8}
                        overflow="hidden"
                        rounded="md"
                    >
                        <Skeleton h="40" />
                        <Skeleton h="10" />
                        <Skeleton h="10" />
                        <Skeleton h="10" />
                        <Skeleton h="20" />
                        <Skeleton h="10" />
                        <Skeleton h="10" />
                    </VStack>
                </Center>
            )}
        </NativeBaseProvider>
    )
}

export default App

const theme = extendTheme({
    fontConfig: {
        Roboto: {
            100: {
                normal: 'Mulish-Light',
                italic: 'Mulish-LightItalic',
            },
            200: {
                normal: 'Mulish-Light',
                italic: 'Mulish-LightItalic',
            },
            300: {
                normal: 'Mulish-Light',
                italic: 'Mulish-LightItalic',
            },
            400: {
                normal: 'Mulish-Regular',
                italic: 'Mulish-Italic',
            },
            500: {
                normal: 'Mulish-Medium',
            },
            600: {
                normal: 'Mulish-Medium',
                italic: 'Mulish-MediumItalic',
            },
        },
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
            900: '#52B553',
        },
    },
    // Make sure values below matches any of the keys in `fontConfig`
    fonts: {
        heading: 'Mulish-Regular',
        body: 'Mulish-Regular',
        mono: 'Mulish-Regular',
    },
    components: {
        Button: {
            baseStyle: { rounded: 7 },
            sizes: {
                xs: { px: 6, py: 1 },
                md: { px: 6, py: 1 },
                sm: { px: 6, py: 1 },
            },
            variants: {
                outline: { borderColor: '#52B553' },
            },
        },
        Heading: {
            // Can pass also function, giving you access theming tools
            baseStyle: ({ colorMode }) => {
                return {
                    color: colorMode === 'dark' ? 'red.300' : 'blue.300',
                    fontWeight: 'normal',
                }
            },
        },
    },
})
