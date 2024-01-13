import { getGlobalState } from 'app/Store'
import React from 'react'

import AppNavigator from './app-navigator'
import AuthNavigator from './auth-navigator'

const SwitchNavigator = () => {
    const userInfo = getGlobalState('userInfo')
    return userInfo?.token ? <AppNavigator /> : <AuthNavigator />
}

export default SwitchNavigator
