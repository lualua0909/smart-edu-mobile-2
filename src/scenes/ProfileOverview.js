import Axios from 'app/Axios'
import { useGlobalState } from 'app/Store'
import { Avatar, DetailSkeleton } from 'app/atoms'
import MenuUser from 'app/components/MenuUser'
import { API_URL } from 'app/constants'
import { scale } from 'app/helpers/responsive'
import React, { useEffect, useState } from 'react'

import { Image, Pressable, ScrollView, TextInput, View } from 'react-native'
import {
    MessageCircle,
    MessageSquare,
    MoreHorizontal,
    UserPlus
} from 'react-native-feather'

import {
    Box,
    Center,
    FormControl,
    Heading,
    Input,
    Text,
    TextArea,
    VStack
} from 'native-base'

const ProfileOverview = ({ navigation, route }) => {
    const { userId } = route.params
    const [userInfo, setUserState] = useGlobalState('userInfo')
    const [visibleFilter, setVisibleFilter] = useState(false)
    const [fullName, setFullName] = useState()
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
            Axios.get(`get-user-info/${userId}`)
                .then(res => {
                    if (res.data.status === 200) {
                        const data = res.data.data
                        setData(data)
                        console.log('get-user-info', data)
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
        return <DetailSkeleton />
    }

    const renderAddFriendBtn = () => {
        if (userInfo?.id !== userId) {
            return !isFriend ? (
                <>
                    <Pressable
                        style={{
                            borderColor: '#52B553',
                            borderWidth: 1,
                            borderRadius: scale(5),
                            position: 'relative',
                            height: scale(40),
                            paddingHorizontal: 12,
                            paddingVertical: 6,
                            backgroundColor: '#fff'
                        }}>
                        <MessageCircle
                            stroke="#52B553"
                            width={24}
                            height={24}
                        />
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
                            <UserPlus stroke="#fff" width={24} height={24} />
                            <Text
                                style={{
                                    fontSize: scale(16),
                                    color: '#FFFFFF',
                                    textAlign: 'center',
                                    marginLeft: scale(8)
                                }}>
                                Kết bạn
                            </Text>
                        </View>
                    </Pressable>
                </>
            ) : (
                <>
                    <Pressable>
                        <UserPlus stroke="#52B553" width={24} height={24} />
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
        }

        return null
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                stickyHeaderIndices={[1]}>
                <View
                    style={{
                        alignItems: 'center'
                    }}>
                    <Image
                        source={{
                            uri: `${API_URL}public/user-avatars/${userId}-cover.webp?rand=${random}`
                        }}
                        defaultSource={require('assets/images/menu-banner.jpg')}
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
                            marginTop: scale(170),
                        }}
                    >
                        <Pressable
                            style={{
                                backgroundColor: '#F6F8FF',
                                width: scale(35),
                                borderRadius: scale(8),
                                alignItems: 'center',
                            }}
                        >
                            <SvgXml
                                xml={svgCamera}
                                width={scale(25)}
                                height={scale(30)}
                                style={{
                                    color: '#333333',
                                }}
                            />
                        </Pressable>
                    </View> */}
                    <View style={{ marginBottom: scale(10) }}>
                        <View
                            style={{
                                borderRadius: scale(120),
                                borderWidth: scale(2),
                                borderColor: '#fff',
                                marginTop: '40%'
                            }}>
                            <Avatar userId={data?.id} size="120" name={name} />
                        </View>
                        {/* <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'flex-end',
                                marginTop: scale(-60),
                            }}
                        >
                            <Pressable
                                style={{
                                    backgroundColor: '#F6F8FF',
                                    width: scale(40),
                                    borderRadius: scale(8),

                                    alignItems: 'center',
                                }}
                            >
                                <SvgXml
                                    xml={svgCamera}
                                    width={scale(25)}
                                    height={scale(30)}
                                    style={{
                                        color: '#333333',
                                    }}
                                />
                            </Pressable>
                        </View> */}
                    </View>
                    <View
                        style={{
                            flexDirection: 'row'
                        }}>
                        <TextInput
                            style={{
                                fontSize: scale(20),
                                color: '#000',
                                borderColor: '#000',
                                width: '70%',
                                textAlign: 'center',
                                padding: scale(5)
                            }}
                            maxLength={30}
                            value={`${data?.first_name} ${data?.last_name}`}
                            onChange={e => {
                                const value = e.target.value
                                setFullName(value)
                            }}
                            height={scale(36)}
                        />
                        {/* {!editName ? (
                            <Pressable onPress={() => setEditName(true)}>
                                <SvgXml
                                    xml={svgEdit_3}
                                    width={scale(40)}
                                    style={{
                                        marginHorizontal: scale(2),
                                        color: '#333333',
                                        marginTop: scale(6),
                                    }}
                                />
                            </Pressable>
                        ) : (
                            <Pressable
                                style={{
                                    backgroundColor: '#52B553',
                                    borderRadius: scale(5),
                                    width: '13%',
                                    marginLeft: scale(10),
                                }}
                                onPress={() => setEditName(false)}
                            >
                                <Text
                                    style={{
                                        
                                        fontSize: scale(16),
                                        color: '#FFFFFF',
                                        padding: scale(8),
                                        textAlign: 'center',
                                    }}
                                >
                                    Lưu
                                </Text>
                            </Pressable>
                        )} */}
                    </View>

                    <View
                        style={{
                            flexDirection: 'row',
                            paddingTop: scale(10)
                        }}>
                        <TextArea
                            fontSize="xs"
                            placeholder="Giới thiệu bản thân..."
                            w="80%"
                            h={16}
                            value={data?.description}
                        />
                    </View>

                    <View
                        style={{
                            flexDirection: 'row',
                            paddingTop: scale(10)
                        }}>
                        {renderAddFriendBtn()}
                        {userId !== userInfo?.id ? (
                            <Pressable
                                style={{
                                    borderColor: '#52B553',
                                    borderWidth: 1,
                                    borderRadius: scale(5),
                                    position: 'relative',
                                    height: scale(40),
                                    paddingHorizontal: 12,
                                    paddingVertical: 6,
                                    backgroundColor: '#fff',
                                    marginLeft: scale(10)
                                }}
                                onPress={() => {
                                    setVisibleFilter(true)
                                }}>
                                <MoreHorizontal
                                    stroke="#52B553"
                                    width={28}
                                    height={28}
                                />
                            </Pressable>
                        ) : (
                            <Pressable
                                style={{
                                    position: 'relative',
                                    width: 200
                                }}
                                onPress={() => {
                                    setVisibleFilter(true)
                                }}>
                                <Text
                                    style={{
                                        color: '#000',
                                        textAlign: 'center'
                                    }}>
                                    Xem thêm thông tin
                                </Text>
                            </Pressable>
                        )}
                    </View>
                    <DetailInfomation fullName={name} data={data} />
                    {/* <FlatListCredits data={data2} userId={userId} /> */}
                    {/* <FlatListCredits data={data1} />
                    <FlatListCredits data={data2} /> */}
                    {/* <Achievement data={achievement} />
                    <CreditBouns data={bouns} /> */}
                </View>
            </ScrollView>

            <MenuUser
                userId={data?.id}
                visible={visibleFilter}
                navigation={navigation}
                setVisible={setVisibleFilter}
                onBackPress={() => setVisibleFilter(false)}
                onDropPress={() => setVisibleFilter(false)}
            />
        </View>
    )
}

export default ProfileOverview

const DetailInfomation = ({ data, fullName }) => {
    return (
        <Center w="100%">
            <Box safeArea p="2" w="90%" maxW="290" py="8">
                <Heading
                    mt="1"
                    color="coolGray.600"
                    _dark={{
                        color: 'warmGray.200'
                    }}
                    fontWeight="medium"
                    size="xs">
                    Giới thiệu về {fullName}
                </Heading>
                <VStack space={3} mt="5">
                    <FormControl>
                        <FormControl.Label>Ngày sinh</FormControl.Label>
                        <Input
                            value={data?.birthday}
                            variant="underlined"
                            isDisabled={true}
                        />
                    </FormControl>
                    <FormControl>
                        <FormControl.Label>Giới tính</FormControl.Label>
                        <Input
                            value={data?.gender === 2 ? 'Nữ' : 'Nam'}
                            variant="underlined"
                            isDisabled={true}
                        />
                    </FormControl>
                    <FormControl>
                        <FormControl.Label>Địa chỉ</FormControl.Label>
                        <Input
                            value={data?.address}
                            variant="underlined"
                            isDisabled={true}
                        />
                    </FormControl>
                    <FormControl>
                        <FormControl.Label>Chức vụ hiện tại</FormControl.Label>
                        <Input
                            value={data?.position}
                            variant="underlined"
                            isDisabled={true}
                        />
                    </FormControl>
                    <FormControl>
                        <FormControl.Label>Thuộc bộ phận</FormControl.Label>
                        <Input
                            value={data?.department}
                            variant="underlined"
                            isDisabled={true}
                        />
                    </FormControl>
                    <FormControl>
                        <FormControl.Label>Công ty</FormControl.Label>
                        <Input
                            value={data?.partner}
                            variant="underlined"
                            isDisabled={true}
                        />
                    </FormControl>
                </VStack>
            </Box>
        </Center>
    )
}
