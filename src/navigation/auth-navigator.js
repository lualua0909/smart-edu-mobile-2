import { ROUTES } from 'app/constants'
import ForgotPassword from 'app/scenes/ForgotPassword'
import Login from 'app/scenes/Login'
import Wireframe from 'app/scenes/Welcome'
import Register from 'app/scenes/register'
import React from 'react'

import {
    TransitionPresets,
    createStackNavigator
} from '@react-navigation/stack'
import { StatusBar, View } from 'react-native'

const Stack = createStackNavigator()

const AuthNavigator = () => {
    return (
        <View style={{ flex: 1 }}>
            <StatusBar barStyle="light-content" />
            <Stack.Navigator
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
