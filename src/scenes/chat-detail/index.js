import { useGlobalState } from 'app/Store'
import { Avatar, Rate } from 'app/atoms'
import { STYLES } from 'app/constants'
import { scale } from 'app/helpers/responsive'
import { svgSend } from 'assets/svg'
import React, { useEffect, useRef, useState } from 'react'

import firestore from '@react-native-firebase/firestore'
import { useHeaderHeight } from '@react-navigation/elements'
import { Image, KeyboardAvoidingView, Platform, TextInput } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { SvgXml } from 'react-native-svg'
import { ScrollView } from 'react-native-virtualized-view'

import HeaderChat from 'app/components/header-chat'
import { Pressable, Text, View } from 'native-base'

const ChatDetail = ({ navigation }) => {
    const headerHeight = useHeaderHeight()
    const [data, setData] = useState([])
    const [currentId, setCurrentId] = useGlobalState('currentCourseId')
    const [message, setMessage] = useState('')
    const [userInfo, setUserState] = useGlobalState('userInfo')
    const scrollViewRef = useRef()

    useEffect(() => {
        const subscriber = firestore()
            .collection('group-chat')
            .doc('chat')
            .collection(`${currentId}`)
            .orderBy('createdAt', 'asc')
            .onSnapshot(querySnapshot => {
                const _data = []

                querySnapshot.forEach(documentSnapshot => {
                    _data.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id
                    })
                })
                setData(_data)
            })

        // Unsubscribe from events when no longer in use
        return () => subscriber()
    }, [currentId])

    const sendMessage = () => {
        firestore()
            .collection('group-chat')
            .doc('chat')
            .collection(`${currentId}`)
            .add({
                name: userInfo?.first_name + ' ' + userInfo?.last_name,
                id: userInfo?.id,
                message,
                createdAt: firestore.FieldValue.serverTimestamp()
            })

        setMessage('')
    }

    const renderLeft = data => {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    marginBottom: scale(16)
                }}>
                <Avatar size={10} userId={data?.id} name={data?.name} />
                <View
                    style={{
                        flex: 1,
                        marginLeft: scale(8),
                        backgroundColor: '#fff',
                        paddingHorizontal: scale(16),
                        paddingVertical: scale(4),
                        borderRadius: scale(16),
                        borderTopLeftRadius: 0
                    }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                        <Text
                            bold
                            style={{
                                fontSize: 14,
                                color: '#091230'
                            }}>
                            {data?.name}
                        </Text>
                        {/* <LinearGradient
                            colors={['#0F7DFF', '#00B3EC']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={{
                                paddingVertical: scale(2),
                                paddingHorizontal: scale(4),
                                borderTopLeftRadius: scale(10),
                                borderBottomRightRadius: scale(10),
                                marginLeft: scale(8)
                            }}>
                            <Text
                                style={{
                                    fontSize: scale(12),
                                    color: '#F4F5F7'
                                }}>
                                Khách mời
                            </Text>
                        </LinearGradient> */}
                    </View>
                    <Text
                        style={{
                            fontSize: 14,
                            color: '#091230',
                            marginTop: scale(8)
                        }}>
                        {data?.message}
                    </Text>
                </View>
            </View>
        )
    }

    const renderRight = data => {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    alignSelf: 'flex-end',
                    marginBottom: scale(16)
                }}>
                <View
                    style={{
                        padding: scale(8),
                        borderRadius: scale(8),
                        backgroundColor: '#EEFCF6'
                    }}>
                    <Text
                        style={{
                            fontSize: 14,
                            color: '#091230',
                            marginTop: scale(8)
                        }}>
                        {data?.message}
                    </Text>
                </View>
                {/* <Image
                    source={{
                        uri: 'https://server.smartx.edu.vn/public/user-avatars/452.webp'
                    }}
                    style={{
                        width: scale(48),
                        height: scale(48),
                        borderRadius: scale(48),
                        borderWidth: 1,
                        borderColor: '#eee',
                        marginLeft: scale(8)
                    }}
                /> */}
            </View>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#F4F5F7' }}>
            <HeaderChat />
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS == 'ios' ? 'padding' : ''}
                keyboardVerticalOffset={headerHeight}>
                <ScrollView
                    ref={scrollViewRef}
                    onContentSizeChange={() => {
                        if (scrollViewRef?.current) {
                            scrollViewRef?.current?.scrollToEnd({
                                animated: true
                            })
                        }
                    }}
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{
                        paddingHorizontal: scale(15),
                        paddingTop: scale(21)
                    }}>
                    {data?.map((item, index) => {
                        return item?.id === userInfo?.id
                            ? renderRight(item)
                            : renderLeft(item)
                    })}
                </ScrollView>
                <View
                    style={[
                        {
                            backgroundColor: '#fff',
                            width: '100%',
                            flexDirection: 'row'
                        },
                        STYLES.boxShadow
                    ]}>
                    <TextInput
                        style={{
                            flex: 1,
                            paddingHorizontal: scale(26),
                            fontSize: scale(14),
                            color: '#091230'
                        }}
                        placeholderTextColor={'#9C9C9C'}
                        placeholder="Tin nhắn"
                        value={message}
                        onChangeText={setMessage}
                    />
                    <Pressable
                        onPress={sendMessage}
                        style={{
                            padding: scale(16),
                            backgroundColor: '#EEFCF6'
                        }}>
                        <SvgXml xml={svgSend} width={scale(24)} />
                    </Pressable>
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}

export default ChatDetail
