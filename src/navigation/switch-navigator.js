import { useGlobalState } from 'app/Store'
import React from 'react'

import AppNavigator from './app-navigator'
import AuthNavigator from './auth-navigator'

const SwitchNavigator = () => {
    const [userInfo, setUserInfo] = useGlobalState('userInfo')

    console.log('token === ', userInfo?.token)
    return userInfo?.token ? <AppNavigator /> : <AuthNavigator />
}

export default SwitchNavigator
