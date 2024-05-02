import axios from 'app/Axios'
import { getGlobalState } from 'app/Store'
import { Avatar, Block, ListSkeleton, NoDataAnimation, Text } from 'app/atoms'
import FriendItem from 'app/components/FriendItem'
import React, { useEffect, useState } from 'react'

import { useNavigation } from '@react-navigation/native'
import { Pressable, ScrollView, View } from 'react-native'
import { Grid, List } from 'react-native-feather'

import { Center, VStack } from '../atoms'

const Friends = ({ route }) => {
    const { userId } = route.params
    const [data, setData] = useState()
    const [loading, setLoading] = useState(true)
    const [grid, setGrid] = useState(false)
    const userInfo = getGlobalState('userInfo')
    const nav = useNavigation()

    nav.setOptions({
        headerRight: () => (
            <Pressable
                style={{ marginRight: 10 }}
                onPress={() => setGrid(!grid)}>
                {grid ? (
                    <Grid color="#000" size={24} strokeWidth={1} />
                ) : (
                    <List color="#000" size={24} strokeWidth={1} />
                )}
            </Pressable>
        )
    })

    useEffect(() => {
        setLoading(true)
        axios
            .get(`friends/friend_list/${userId || userInfo?.id}`)
            .then(res => {
                console.log('res = ', res.data)
                if (res.status === 200) {
                    setData(res.data.data)
                }
            })
            .finally(() => setLoading(false))
    }, [userId])

    if (loading) {
        return <ListSkeleton />
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#fff', marginBottom: 20 }}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                stickyHeaderIndices={[1]}>
                {data?.length ? (
                    grid ? (
                        <Block flex={0} row wrap="wrap">
                            {data?.map(item => {
                                return (
                                    <Center
                                        style={{
                                            width: '25%',
                                            border: '1px solid #000',
                                            marginVertical: 15
                                        }}>
                                        <Pressable
                                            onPress={() =>
                                                navigation.navigate(
                                                    ROUTES.ProfileOverview,
                                                    {
                                                        userId: item?.id
                                                    }
                                                )
                                            }>
                                            <Avatar
                                                userId={item?.id}
                                                size={70}
                                            />
                                            <Text
                                                bold
                                                style={{ textAlign: 'center' }}>
                                                {item?.last_name}
                                            </Text>
                                        </Pressable>
                                    </Center>
                                )
                            })}
                        </Block>
                    ) : (
                        <FriendItem data={data} />
                    )
                ) : (
                    <NoDataAnimation />
                )}
            </ScrollView>
        </View>
    )
}

export default Friends
