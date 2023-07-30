import axios from 'app/Axios'
import { useGlobalState } from 'app/Store'
import { Avatar, CourseDetailSkeleton, Input } from 'app/atoms'
import { API_URL } from 'app/constants'
import { scale } from 'app/helpers/responsive'
import React, { useEffect, useState } from 'react'

import { ScrollView, View } from 'react-native'
import {
    MessageCircle,
    Upload,
    UserMinus,
    UserPlus
} from 'react-native-feather'

import {
    Button,
    Center,
    HStack,
    Heading,
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
        return <CourseDetailSkeleton />
    }

    const renderAddFriendBtn =
        userInfo?.id !== userId ? (
            !isFriend ? (
                <>
                    <Button
                        style={{
                            alignItems: 'center',
                            width: '40%'
                        }}
                        leftIcon={<UserPlus color="white" width={16} />}
                        onPress={() => setIsFriend(!isFriend)}>
                        Thêm bạn
                    </Button>
                </>
            ) : (
                <>
                    <Button
                        style={{
                            alignItems: 'center',
                            width: '40%'
                        }}
                        leftIcon={<UserMinus color="white" width={16} />}
                        onPress={() => setIsFriend(!isFriend)}>
                        Huỷ kết bạn
                    </Button>
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
                        <Avatar userId={data?.id} size="110" name={name} />
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
                    <Heading
                        fontSize={20}
                        bold
                        color={'#0E564D'}
                        style={{ lineHeight: scale(20) }}>
                        {fullName}
                    </Heading>
                </Center>

                <View
                    style={{
                        flexDirection: 'row',
                        paddingTop: scale(10)
                    }}>
                    <TextArea
                        fontSize={scale(14)}
                        placeholder="Giới thiệu bản thân..."
                        w="90%"
                        h={16}
                        isDisabled
                        value={data?.description}
                        style={{
                            borderWidth: 1,
                            borderColor: '#999',
                            borderRadius: 7
                        }}
                    />
                </View>

                <HStack space={5} justifyContent="space-around" mt="3">
                    {renderAddFriendBtn}
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
