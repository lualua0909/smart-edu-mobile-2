import axios from 'app/Axios'
import { useGlobalState } from 'app/Store'
import {
    Avatar,
    Button,
    Center,
    CourseDetailSkeleton,
    HStack,
    Input,
    Text
} from 'app/atoms'
import { API_URL } from 'app/constants'
import { scale } from 'app/helpers/responsive'
import React, { useEffect, useState } from 'react'

import { Image, ScrollView, View } from 'react-native'

import DetailInformation from './DetailInformation'
import MenuUser from './MenuUser'

const ProfileOverview = ({ navigation, route }) => {
    const { userId } = route.params
    const [userInfo, setUserState] = useGlobalState('userInfo')
    const [fullName, setFullName] = useState()
    const [isEditName, setIsEditName] = useState(false)
    const [loading, setLoading] = useState(false)
    const [isFriend, setIsFriend] = useState(false)
    const [data, setData] = useState(null)
    const [certificates, setCertificates] = useState(null)
    const [friends, setFriends] = useState([])
    const [totalFriend, setTotalFriend] = useState(0)
    const [random, setRandom] = useGlobalState('random')

    const name = `${data?.first_name} ${data?.last_name}`

    useEffect(() => {
        if (userId) {
            setLoading(true)
            axios
                .get(`get-user-info/${userId}/${userInfo?.id}`)
                .then(res => {
                    if (res.status === 200) {
                        const data = res.data.data
                        setData(data)
                        setFullName(`${data.first_name} ${data.last_name}`)
                        setCertificates(res.data.certificates)
                        setFriends(res.data.friends)
                        setTotalFriend(res.data.total_friend)
                        setIsFriend(res.data.is_friend)
                    }
                })
                .finally(() => setLoading(false))
        }
    }, [userId])

    if (loading || !data) {
        return <CourseDetailSkeleton />
    }

    const renderAddFriendBtn = (
        <Button onPress={() => setIsFriend(!isFriend)}>
            {isFriend ? 'Huỷ kết bạn' : 'Thêm bạn'}
        </Button>
    )

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
            <View
                style={{
                    alignItems: 'center'
                }}>
                <Image
                    alt="profile overview"
                    source={{
                        uri: `${API_URL}public/user-avatars/${userId}-cover.webp?rand=${random}`
                    }}
                    fallbackSource={require('assets/images/fallback.jpg')}
                    style={{
                        width: '100%',
                        position: 'absolute',
                        height: scale(210)
                    }}
                    resizeMode="cover"
                />
                {/* <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        paddingRight: scale(20),
                        position: 'absolute',
                        width: '100%',
                        marginTop: scale(170)
                    }}>
                    <Pressable
                        style={{
                            backgroundColor: '#aaa',
                            borderRadius: 50,
                            padding: 5
                        }}>
                        <Upload width={16} height={16} color={'#fff'} />
                    </Pressable>
                </View> */}
                <View>
                    <View
                        style={{
                            borderRadius: scale(120),
                            borderWidth: scale(2),
                            borderColor: '#fff',
                            marginTop: '35%'
                        }}>
                        <Avatar userId={data?.id} size={110} />
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            marginTop: scale(-40)
                        }}>
                        {/* <Pressable
                            style={{
                                backgroundColor: '#aaa',
                                borderRadius: 50,
                                padding: 5
                            }}>
                            <Ionicons
                                name="md-camera"
                                color="white"
                                size={16}
                            />
                        </Pressable> */}
                    </View>
                </View>
                <Center style={{ marginTop: 60 }}>
                    <Text
                        bold
                        style={{
                            lineHeight: scale(20),
                            color: '#0E564D',
                            fontSize: 20
                        }}>
                        {fullName}
                    </Text>
                </Center>

                <View
                    style={{
                        flexDirection: 'row',
                        paddingTop: scale(10)
                    }}>
                    <Input
                        placeholder="Giới thiệu bản thân..."
                        isDisabled
                        value={data?.description}
                    />
                </View>

                <HStack
                    space={5}
                    justifyContent="space-around"
                    style={{ marginTop: 10 }}>
                    {userInfo?.id !== userId ? renderAddFriendBtn : null}
                    <MenuUser userId={userId} navigation={navigation} />
                </HStack>
                <DetailInformation fullName={name} data={data} />
                {/* <FlatListCredits data={[1, 1, 1]} userId={userId} /> */}
                {/* <Achievement data={[1, 1, 1]} />
                <CreditBouns data={[1, 1, 1]} /> */}
            </View>
        </ScrollView>
    )
}

export default ProfileOverview
