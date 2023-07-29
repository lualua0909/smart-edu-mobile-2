import { useGlobalState } from 'app/Store'
import React, { useState } from 'react'

import { StyleSheet, Text, View } from 'react-native'
import ErrorBoundary from 'react-native-error-boundary'

import AppNavigator from './app-navigator'
import AuthNavigator from './auth-navigator'

const SwitchNavigator = () => {
    const [userInfo, setUserInfo] = useGlobalState('userInfo')
    const errorHandler = (error, stackTrace) => {
        /* Log the error to an error reporting service */
        console.log('error ====', error)
    }

    return userInfo?.token ? <AppNavigator /> : <AuthNavigator />

    // return (
    //     <ErrorBoundary
    //         onError={errorHandler}
    //         FallbackComponent={props => <Text>ERROR</Text>}>
    //         {userInfo?.token ? <AppNavigator /> : <AuthNavigator />}
    //     </ErrorBoundary>
    // )
}

export default SwitchNavigator
