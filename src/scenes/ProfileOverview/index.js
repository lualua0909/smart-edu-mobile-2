import axios from 'app/Axios'
import { useGlobalState } from 'app/Store'
import { Avatar, Input, TeacherSkeleton } from 'app/atoms'
import { API_URL } from 'app/constants'
import { scale } from 'app/helpers/responsive'
import React, { useEffect, useState } from 'react'

import { ScrollView, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import {
    Button,
    Center,
    HStack,
    Icon,
    Image,
    Pressable,
    Text,
    TextArea
} from 'native-base'

import Achievement from './Achievement'
import CreditBouns from './CreditsBouns'
import DetailInformation from './DetailInformation'
import FlatListCredits from './FlatListCredits'
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
                .get(`get-user-info/${userId}`)
                .then(res => {
                    if (res.data.status === 200) {
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
        return <TeacherSkeleton />
    }

    const renderAddFriendBtn =
        userInfo?.id !== userId ? (
            !isFriend ? (
                <>
                    <Button
                        size="xs"
                        style={{
                            alignItems: 'center',
                            width: '40%'
                        }}
                        leftIcon={
                            <Ionicons
                                name="ios-person-add"
                                color="white"
                                size={16}
                            />
                        }
                        onPress={() => setIsFriend(!isFriend)}>
                        Thêm bạn bè
                    </Button>
                </>
            ) : (
                <>
                    <Pressable>
                        <Ionicons name="cloud-upload" color="red" size={24} />
                    </Pressable>
                    <Pressable
                        style={{
                            backgroundColor: '#52B553',
                            borderRadius: scale(5),
                            width: '40%',
                            marginLeft: scale(10),
                            position: 'relative',
                            height: scale(40),
                            alignItems: 'center'
                        }}
                        onPress={() => setIsFriend(!isFriend)}>
                        <View
                            style={{
                                flexDirection: 'row',
                                padding: scale(8)
                            }}>
                            <MessageSquare
                                stroke="#fff"
                                width={24}
                                height={24}
                            />
                            <Text
                                style={{
                                    fontSize: scale(16),
                                    color: '#FFFFFF',
                                    textAlign: 'center',
                                    marginLeft: scale(8)
                                }}>
                                Trò chuyện
                            </Text>
                        </View>
                    </Pressable>
                </>
            )
        ) : null

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
            <View
                style={{
                    alignItems: 'center'
                }}>
                <Image
                    alt="menu-banner.jpg'"
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
                <View
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
                        <Ionicons name="cloud-upload" color="white" size={16} />
                    </Pressable>
                </View>
                <View>
                    <View
                        style={{
                            borderRadius: scale(120),
                            borderWidth: scale(2),
                            borderColor: '#fff',
                            marginTop: '40%'
                        }}>
                        <Avatar userId={data?.id} size="120" name={name} />
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            marginTop: scale(-40)
                        }}>
                        <Pressable
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
                        </Pressable>
                    </View>
                </View>
                <Center style={{ marginTop: 20 }}>
                    <Input
                        fontSize="sm"
                        value={fullName}
                        onChange={e => {
                            const value = e.target.value
                            setFullName(value)
                        }}
                        w={'90%'}
                        InputRightElement={
                            <Pressable
                                onPress={() => setIsEditName(!isEditName)}>
                                <Icon
                                    as={
                                        <Ionicons
                                            name={
                                                isEditName
                                                    ? 'md-checkmark'
                                                    : 'ios-create'
                                            }
                                            size={16}
                                        />
                                    }
                                    size={8}
                                    mr="2"
                                    color="muted.400"
                                />
                            </Pressable>
                        }
                        placeholder="Password"
                    />
                </Center>

                <View
                    style={{
                        flexDirection: 'row',
                        paddingTop: scale(10)
                    }}>
                    <TextArea
                        fontSize="sm"
                        placeholder="Giới thiệu bản thân..."
                        w="90%"
                        h={16}
                        value={data?.description}
                    />
                </View>

                <HStack space={5} justifyContent="space-around" mt="3">
                    {renderAddFriendBtn}
                    <MenuUser userId={data?.id} navigation={navigation} />
                </HStack>
                <DetailInformation fullName={name} data={data} />
                <FlatListCredits data={[1, 1, 1]} userId={userId} />
                <Achievement data={[1, 1, 1]} />
                <CreditBouns data={[1, 1, 1]} />
            </View>
        </ScrollView>
    )
}

export default ProfileOverview
