import React from 'react'
import AuthNavigator from './auth-navigator'
import AppNavigator from './app-navigator'
import { useGlobalState } from 'app/Store'

const SwitchNavigator = () => {
    const [userInfo, setUserInfo] = useGlobalState('userInfo')

    console.log('token === ', userInfo?.token)
    return userInfo?.token ? <AppNavigator /> : <AuthNavigator />
}

export default SwitchNavigator
