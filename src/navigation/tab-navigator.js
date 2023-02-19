import CourseList from 'app/scenes/CourseList'
import Dashboard from 'app/scenes/Dashboard'
import Home from 'app/scenes/Home'
import Notification from 'app/scenes/NotifyList'
import TeacherList from 'app/scenes/TeacherList'
import {
    svgTabCourse,
    svgTabHome,
    svgTabMenu,
    svgTabNoti,
    svgTabTeacher
} from 'assets/svg'
import React from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import BottomTabButton from 'app/components/tabbar-button'
import { Text } from 'native-base'

const Tab = createBottomTabNavigator()

const TabNavigator = ({}) => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarStyle: {
                    paddingBottom: 12,
                    height: 60
                },
                headerShown: false
            })}
            initialRouteName="Home">
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarButton: props => (
                        <BottomTabButton
                            focused={props.accessibilityState.selected}
                            iconActive={svgTabHome('#fff')}
                            iconInactive={svgTabHome('#a3a3a3')}
                            label={'Trang chủ'}
                            props={props}
                        />
                    )
                }}
            />
            <Tab.Screen
                name={'CourseList'}
                component={CourseList}
                options={({ route, navigation }) => ({
                    tabBarButton: props => (
                        <BottomTabButton
                            focused={props.accessibilityState.selected}
                            iconActive={svgTabCourse('#fff')}
                            iconInactive={svgTabCourse('#a3a3a3')}
                            label={'Khóa học'}
                            props={props}
                        />
                    )
                })}
            />
            <Tab.Screen
                name="TeacherList"
                component={TeacherList}
                options={({ route, navigation }) => ({
                    tabBarButton: props => (
                        <BottomTabButton
                            focused={props.accessibilityState.selected}
                            iconActive={svgTabTeacher('#fff')}
                            iconInactive={svgTabTeacher('#a3a3a3')}
                            label={'Giảng viên'}
                            props={props}
                        />
                    )
                })}
            />
            <Tab.Screen
                name="Notification"
                component={Notification}
                options={({ route, navigation }) => ({
                    headerShown: true,
                    headerTitle: () => (
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                            Danh sách thông báo
                        </Text>
                    ),
                    tabBarButton: props => (
                        <BottomTabButton
                            focused={props.accessibilityState.selected}
                            iconActive={svgTabNoti('#fff')}
                            iconInactive={svgTabNoti('#a3a3a3')}
                            label={'Thông báo'}
                            props={props}
                        />
                    )
                })}
            />
            <Tab.Screen
                name="Dashboard"
                component={Dashboard}
                options={({ route, navigation }) => ({
                    tabBarButton: props => (
                        <BottomTabButton
                            focused={props.accessibilityState.selected}
                            iconActive={svgTabMenu('#fff')}
                            iconInactive={svgTabMenu('#a3a3a3')}
                            label={'Menu'}
                            props={props}
                        />
                    )
                })}
            />
        </Tab.Navigator>
    )
}

export default TabNavigator
