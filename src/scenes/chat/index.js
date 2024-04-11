import { useGlobalState } from 'app/Store'
import { Avatar, Text } from 'app/atoms'
import { scale } from 'app/helpers/responsive'
import React, { useEffect, useState } from 'react'

import firestore from '@react-native-firebase/firestore'
import { Pressable, ScrollView, View } from 'react-native'

import HeaderChat from 'app/components/header-chat'

const Chat = ({ navigation }) => {
    const [data, setData] = useState([])
    const [currentId, setCurrentId] = useGlobalState('currentCourseId')
    const [userInfo, setUserState] = useGlobalState('userInfo')
    const [currentDoc, setCurrentDoc] = useState(null)
    const name = userInfo?.first_name + ' ' + userInfo?.last_name

    const room = firestore()
        .collection('group-chat')
        .doc('members')
        .collection(`${currentId}`)

    const leaveRoom = () => {
        if (currentDoc) {
            room.doc(currentDoc)
                .delete()
                .then(() => {
                    console.log('Document successfully deleted!')
                })
                .catch(error => {
                    console.error('Error removing document: ', error)
                })
        }
    }

    const joinRoom = () => {
        room.where('id', '==', userInfo?.id)
            .get()
            .then(querySnapshot => {
                if (querySnapshot?.size < 1) {
                    //thêm học viên vào danh sách đang học
                    //id, name
                    room.add({
                        name,
                        id: userInfo?.id,
                        createdAt: firestore.FieldValue.serverTimestamp()
                    }).then(docRef => {
                        console.log('User added!', docRef.id)
                        setCurrentDoc(docRef.id)
                    })
                }
            })
            .catch(error => {
                console.log('Error getting documents: ', error)
            })
    }

    useEffect(() => {
        joinRoom()
        const subscriber = room.onSnapshot(querySnapshot => {
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
        return () => {
            subscriber()
            leaveRoom()
        }
    }, [])

    return (
        <View style={{ flex: 1 }}>
            <HeaderChat />
            <ScrollView
                contentContainerStyle={{
                    paddingTop: scale(8),
                    paddingHorizontal: scale(15),
                    paddingBottom: scale(15)
                }}>
                <View
                    style={{
                        marginTop: scale(8),
                        borderTopWidth: 1,
                        borderTopColor: '#ccc'
                    }}>
                    {data?.map((item, index) => (
                        <Pressable
                            // onPress={navigateChatDetail}
                            key={item?.key}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginTop: scale(8)
                            }}>
                            <Avatar
                                size={50}
                                userId={item?.id}
                                name={item?.name}
                            />
                            <Text
                                bold
                                style={{
                                    marginLeft: scale(8),
                                    fontSize: 16,
                                    color: '#091230'
                                }}>
                                {item?.name}
                            </Text>
                        </Pressable>
                    ))}
                </View>
            </ScrollView>
        </View>
    )
}

export default Chat
