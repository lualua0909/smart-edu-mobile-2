import { useGlobalState } from 'app/Store'
import React from 'react'

import { View } from 'react-native'
import ErrorBoundary from 'react-native-error-boundary'

import AppNavigator from './app-navigator'
import AuthNavigator from './auth-navigator'
import { Text } from 'native-base'

const SwitchNavigator = () => {
    const [userInfo, setUserInfo] = useGlobalState('userInfo')

    const errorHandler = (error, stackTrace) => {
        /* Log the error to an error reporting service */
        return (
            <View>
                <Text>Something happened!</Text>
                <Text>{error.toString()}</Text>
            </View>
        )
    }

    return (
        <ErrorBoundary onError={errorHandler}>
            {userInfo?.token ? <AppNavigator /> : <AuthNavigator />}
        </ErrorBoundary>
    )
}

export default SwitchNavigator
