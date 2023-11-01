import { getGlobalState } from 'app/Store'
import { ROUTES } from 'app/constants'
import ForgotPassword from 'app/scenes/ForgotPassword'
import Login from 'app/scenes/Login'
import Register from 'app/scenes/Register'
import Wireframe from 'app/scenes/Welcome'
import React from 'react'

import {
    TransitionPresets,
    createStackNavigator
} from '@react-navigation/stack'
import { StatusBar, View } from 'react-native'

const Stack = createStackNavigator()

const AuthNavigator = () => {
    const isShow = getGlobalState('isShow')
    const defaultRoute = getGlobalState('defaultRoute')
    return (
        <View style={{ flex: 1 }}>
            <StatusBar barStyle="light-content" />
            <Stack.Navigator
                initialRouteName={isShow ? defaultRoute : ROUTES.Wireframe}
                screenOptions={{
                    headerStyle: { elevation: 0 },
                    cardStyle: { backgroundColor: '#fff' },
                    ...TransitionPresets.SlideFromRightIOS
                }}>
                <Stack.Screen
                    name={ROUTES.Wireframe}
                    component={Wireframe}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name={ROUTES.Login}
                    component={Login}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name={ROUTES.Register}
                    component={Register}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name={ROUTES.ForgotPassword}
                    component={ForgotPassword}
                    options={{
                        headerShown: false
                    }}
                />
            </Stack.Navigator>
        </View>
    )
}

export default AuthNavigator
