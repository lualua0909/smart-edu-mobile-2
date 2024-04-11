import { useGlobalState } from 'app/Store'
import { Avatar, Card, Text } from 'app/atoms'
import { STYLES } from 'app/constants'
import { scale } from 'app/helpers/responsive'
import { isIOS, toRelativeTime } from 'app/helpers/utils'
import { svgSend } from 'assets/svg'
import React, { useEffect, useRef, useState } from 'react'

import firestore from '@react-native-firebase/firestore'
import { useHeaderHeight } from '@react-navigation/elements'
import {
    KeyboardAvoidingView,
    Pressable,
    ScrollView,
    TextInput,
    View
} from 'react-native'
import { SvgXml } from 'react-native-svg'

import HeaderChat from 'app/components/header-chat'

const ConversationDetail = ({ navigation }) => {
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
                <Avatar size={50} userId={data?.id} />
                <Card
                    shadow
                    style={{
                        marginLeft: scale(8),
                        backgroundColor: '#BFEA7C',
                        paddingHorizontal: scale(16),
                        paddingVertical: 10,
                        borderRadius: 10,
                        borderTopLeftRadius: 0
                    }}>
                    <View
                        style={{
                            flexDirection: 'column'
                        }}>
                        <Text
                            bold
                            style={{
                                fontSize: 16
                            }}>
                            {data?.name}{' '}
                        </Text>
                        <Text
                            style={{
                                fontSize: 12
                            }}>
                            {toRelativeTime(data.createdAt.toDate())}
                        </Text>
                    </View>
                    <Text
                        style={{
                            fontSize: 14,
                            color: '#091230',
                            marginTop: scale(8)
                        }}>
                        {data?.message}
                    </Text>
                </Card>
            </View>
        )
    }

    const renderRight = data => {
        return (
            <View
                style={{
                    alignSelf: 'flex-end'
                }}>
                <Card
                    shadow
                    style={{
                        padding: 10,
                        backgroundColor: '#416D19',
                        borderRadius: 10,
                        borderTopRightRadius: 0
                    }}>
                    <Text
                        style={{
                            fontSize: 14,
                            color: '#fff'
                        }}>
                        {data?.message}
                    </Text>
                </Card>
                {/* <Avatar userId={data?.id} size={50} /> */}
            </View>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#F4F5F7' }}>
            <HeaderChat />
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={isIOS ? 'padding' : ''}
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
                        placeholder="Nhập tin nhắn..."
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

export default ConversationDetail
