import React from 'react'
import { View, Pressable, Image, ScrollView } from 'react-native'
import { Text } from 'native-base'
import { scale } from 'app/helpers/responsive'
import { ROUTES } from 'app/constants'
import LinearGradient from 'react-native-linear-gradient'
import HeaderChat from 'app/components/header-chat'

const Chat = ({ navigation }) => {
    const navigateChatDetail = () => navigation.navigate(ROUTES.ChatDetail)

    return (
        <View style={{ flex: 1 }}>
            <HeaderChat />
            <ScrollView
                contentContainerStyle={{
                    paddingTop: scale(8),
                    paddingHorizontal: scale(15),
                    paddingBottom: scale(15),
                }}
            >
                <Pressable
                    onPress={navigateChatDetail}
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: scale(8),
                    }}
                >
                    <Image
                        source={{
                            uri: 'https://phplaravel-695396-2297336.cloudwaysapps.com/public/user-avatars/452.webp',
                        }}
                        style={{
                            width: scale(48),
                            height: scale(48),
                            borderRadius: scale(48),
                            borderWidth: 1,
                            borderColor: '#eee',
                        }}
                    />
                    <Text
                        style={{
                            marginLeft: scale(8),

                            fontSize: scale(16),
                            color: '#091230',
                        }}
                    >
                        Nguyễn Trần Thùy Duyên
                    </Text>
                    <LinearGradient
                        colors={['#079A96', '#00BD67']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={{
                            paddingVertical: scale(2),
                            paddingHorizontal: scale(4),
                            borderTopLeftRadius: scale(10),
                            borderBottomRightRadius: scale(10),
                            marginLeft: scale(8),
                        }}
                    >
                        <Text
                            style={{
                                fontSize: scale(12),
                                color: '#F4F5F7',
                            }}
                        >
                            Giảng viên
                        </Text>
                    </LinearGradient>
                </Pressable>
                <Pressable
                    onPress={navigateChatDetail}
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: scale(8),
                    }}
                >
                    <Image
                        source={{
                            uri: 'https://phplaravel-695396-2297336.cloudwaysapps.com/public/user-avatars/452.webp',
                        }}
                        style={{
                            width: scale(48),
                            height: scale(48),
                            borderRadius: scale(48),
                            borderWidth: 1,
                            borderColor: '#eee',
                        }}
                    />
                    <Text
                        style={{
                            marginLeft: scale(8),

                            fontSize: scale(16),
                            color: '#091230',
                        }}
                    >
                        Tuấn Anh
                    </Text>
                    <LinearGradient
                        colors={['#FC8A4A', '#FC6A4A']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={{
                            paddingVertical: scale(2),
                            paddingHorizontal: scale(4),
                            borderTopLeftRadius: scale(10),
                            borderBottomRightRadius: scale(10),
                            marginLeft: scale(8),
                        }}
                    >
                        <Text
                            style={{
                                fontSize: scale(12),
                                color: '#F4F5F7',
                            }}
                        >
                            Trợ giảng
                        </Text>
                    </LinearGradient>
                </Pressable>
                <Pressable
                    onPress={navigateChatDetail}
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: scale(8),
                    }}
                >
                    <Image
                        source={{
                            uri: 'https://phplaravel-695396-2297336.cloudwaysapps.com/public/user-avatars/452.webp',
                        }}
                        style={{
                            width: scale(48),
                            height: scale(48),
                            borderRadius: scale(48),
                            borderWidth: 1,
                            borderColor: '#eee',
                        }}
                    />
                    <Text
                        style={{
                            marginLeft: scale(8),

                            fontSize: scale(16),
                            color: '#091230',
                        }}
                    >
                        Tuấn Anh
                    </Text>
                    <LinearGradient
                        colors={['#0F7DFF', '#00B3EC']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={{
                            paddingVertical: scale(2),
                            paddingHorizontal: scale(4),
                            borderTopLeftRadius: scale(10),
                            borderBottomRightRadius: scale(10),
                            marginLeft: scale(8),
                        }}
                    >
                        <Text
                            style={{
                                fontSize: scale(12),
                                color: '#F4F5F7',
                            }}
                        >
                            Khách mời
                        </Text>
                    </LinearGradient>
                </Pressable>
                <View
                    style={{
                        marginTop: scale(8),
                        borderTopWidth: 1,
                        borderTopColor: '#ccc',
                    }}
                >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => (
                        <Pressable
                            onPress={navigateChatDetail}
                            key={index}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginTop: scale(8),
                            }}
                        >
                            <Image
                                source={{
                                    uri: 'https://phplaravel-695396-2297336.cloudwaysapps.com/public/user-avatars/452.webp',
                                }}
                                style={{
                                    width: scale(48),
                                    height: scale(48),
                                    borderRadius: scale(48),
                                    borderWidth: 1,
                                    borderColor: '#eee',
                                }}
                            />
                            <Text
                                style={{
                                    marginLeft: scale(8),

                                    fontSize: scale(16),
                                    color: '#091230',
                                }}
                            >
                                Nguyễn Trần Thùy Duyên
                            </Text>
                        </Pressable>
                    ))}
                </View>
            </ScrollView>
        </View>
    )
}

export default Chat
