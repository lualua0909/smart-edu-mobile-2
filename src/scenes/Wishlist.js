import { Text } from 'app/atoms'
import FriendList from 'app/components/FriendList'
import MentorList from 'app/components/MentorList'
import MyCourseList from 'app/components/MyCourseList'
import COLORS from 'app/constants/colors'
import { scale } from 'app/helpers/responsive'
import React, { useState } from 'react'

import { Pressable, View } from 'react-native'
import { TabView } from 'react-native-tab-view'

const Wishlist = () => {
    const [tabIndex, setTabIndex] = useState(0)

    const routes = [
        {
            key: 'tab-1',
            title: 'KH yêu thích'
        }
        // {
        //     key: 'tab-2',
        //     title: 'GV yêu thích'
        // }
        // {
        //     key: 'tab-3',
        //     title: 'Bạn bè'
        // }
    ]

    const renderScene = ({ route }) => {
        switch (route.key) {
            case 'tab-1':
                return <MyCourseList />
            case 'tab-2':
                return <MentorList />
            case 'tab-3':
                return <FriendList />
            default:
                return null
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <View
                style={{
                    paddingTop: scale(16),
                    paddingBottom: scale(10),
                    backgroundColor: '#fff'
                }}>
                <View
                    style={{
                        alignSelf: 'center',
                        flexDirection: 'row',
                        borderWidth: 1,
                        borderColor: COLORS.green,
                        padding: scale(2),
                        borderRadius: scale(5)
                    }}>
                    <Pressable
                        onPress={() => setTabIndex(0)}
                        style={[
                            {
                                paddingVertical: scale(6),
                                width: scale(125),
                                alignItems: 'center'
                            },
                            tabIndex == 0 && {
                                backgroundColor: COLORS.green,
                                borderRadius: scale(5)
                            }
                        ]}>
                        <Text
                            style={[
                                {
                                    lineHeight: scale(20),
                                    fontSize: scale(16),
                                    color: COLORS.green
                                },
                                tabIndex == 0 && { color: '#fff' }
                            ]}>
                            KH yêu thích
                        </Text>
                    </Pressable>
                    {/* <Pressable
                        onPress={() => setTabIndex(1)}
                        style={[
                            {
                                paddingVertical: scale(6),
                                width: scale(125),
                                alignItems: 'center'
                            },
                            tabIndex == 1 && {
                                backgroundColor: COLORS.green,
                                borderRadius: scale(5)
                            }
                        ]}>
                        <Text
                            style={[
                                {
                                    lineHeight: scale(20),
                                    fontSize: scale(16),
                                    color: COLORS.green
                                },
                                tabIndex == 1 && { color: '#fff' }
                            ]}>
                            GV yêu thích
                        </Text>
                    </Pressable> */}
                    {/* <Pressable
                        onPress={() => setTabIndex(2)}
                        style={[
                            {
                                paddingVertical: scale(6),
                                width: scale(100),
                                alignItems: 'center'
                            },
                            tabIndex == 2 && {
                                backgroundColor: COLORS.green,
                                borderRadius: scale(5)
                            }
                        ]}>
                        <Text
                            style={[
                                {
                                    lineHeight: scale(20),
                                    fontSize: scale(16),
                                    color: COLORS.green
                                },
                                tabIndex == 2 && { color: '#fff' }
                            ]}>
                            Bạn bè
                        </Text>
                    </Pressable> */}
                </View>
            </View>
            <TabView
                navigationState={{ index: tabIndex, routes }}
                renderScene={renderScene}
                renderTabBar={() => null}
                onIndexChange={setTabIndex}
                style={{
                    backgroundColor: '#fff'
                }}
            />
        </View>
    )
}

export default Wishlist
