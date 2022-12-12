import React from 'react'
import { View, StatusBar } from 'react-native'
import {
    createStackNavigator,
    TransitionPresets,
} from '@react-navigation/stack'
import Wireframe from 'app/scenes/Welcome'
import Login from 'app/scenes/Login'
import { ROUTES } from 'app/constants'
import Register from 'app/scenes/register'
import ForgotPassword from 'app/scenes/ForgotPassword'

const Stack = createStackNavigator()

const AuthNavigator = () => {
    return (
        <View style={{ flex: 1 }}>
            <StatusBar barStyle="light-content" />
            <Stack.Navigator
                screenOptions={{
                    headerStyle: { elevation: 0 },
                    cardStyle: { backgroundColor: '#fff' },
                    ...TransitionPresets.SlideFromRightIOS,
                }}
            >
                <Stack.Screen
                    name={ROUTES.Wireframe}
                    component={Wireframe}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name={ROUTES.Login}
                    component={Login}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name={ROUTES.Register}
                    component={Register}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name={ROUTES.ForgotPassword}
                    component={ForgotPassword}
                    options={{
                        headerShown: false,
                    }}
                />
            </Stack.Navigator>
        </View>
    )
}

export default AuthNavigator
