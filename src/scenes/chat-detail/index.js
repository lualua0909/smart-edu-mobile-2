import { STYLES } from 'app/constants'
import { scale } from 'app/helpers/responsive'
import React from 'react'

import { useHeaderHeight } from '@react-navigation/elements'
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    TextInput,
    View
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import HeaderChat from 'app/components/header-chat'
import { Text } from 'native-base'

const ChatDetail = ({ navigation }) => {
    const headerHeight = useHeaderHeight()

    return (
        <View style={{ flex: 1, backgroundColor: '#F4F5F7' }}>
            <HeaderChat />
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS == 'ios' ? 'padding' : ''}
                keyboardVerticalOffset={headerHeight}>
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{
                        paddingHorizontal: scale(15),
                        paddingTop: scale(21)
                    }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            marginBottom: scale(16)
                        }}>
                        <Image
                            source={{
                                uri: 'https://phplaravel-695396-2297336.cloudwaysapps.com/public/user-avatars/452.webp'
                            }}
                            style={{
                                width: scale(48),
                                height: scale(48),
                                borderRadius: scale(48),
                                borderWidth: 1,
                                borderColor: '#eee'
                            }}
                        />
                        <View
                            style={{
                                flex: 1,
                                marginLeft: scale(8),
                                backgroundColor: '#fff',
                                padding: scale(16),
                                borderRadius: scale(16),
                                borderTopLeftRadius: 0
                            }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}>
                                <Text
                                    style={{
                                        fontSize: scale(16),
                                        color: '#091230'
                                    }}>
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
                                        marginLeft: scale(8)
                                    }}>
                                    <Text
                                        style={{
                                            fontSize: scale(12),
                                            color: '#F4F5F7'
                                        }}>
                                        Khách mời
                                    </Text>
                                </LinearGradient>
                            </View>
                            <Text
                                style={{
                                    fontSize: scale(16),
                                    color: '#091230',
                                    marginTop: scale(8)
                                }}>
                                Text labels need to be Text labels need to be
                                Text label
                            </Text>
                        </View>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            marginBottom: scale(16)
                        }}>
                        <Image
                            source={{
                                uri: 'https://phplaravel-695396-2297336.cloudwaysapps.com/public/user-avatars/452.webp'
                            }}
                            style={{
                                width: scale(48),
                                height: scale(48),
                                borderRadius: scale(48),
                                borderWidth: 1,
                                borderColor: '#eee'
                            }}
                        />
                        <View
                            style={{
                                flex: 1,
                                marginLeft: scale(8),
                                backgroundColor: '#fff',
                                padding: scale(16),
                                borderRadius: scale(16),
                                borderTopLeftRadius: 0
                            }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}>
                                <Text
                                    style={{
                                        fontSize: scale(16),
                                        color: '#091230'
                                    }}>
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
                                        marginLeft: scale(8)
                                    }}>
                                    <Text
                                        style={{
                                            fontSize: scale(12),
                                            color: '#F4F5F7'
                                        }}>
                                        Khách mời
                                    </Text>
                                </LinearGradient>
                            </View>
                            <Text
                                style={{
                                    fontSize: scale(16),
                                    color: '#091230',
                                    marginTop: scale(8)
                                }}>
                                Text labels need to be Text labels need to be
                                Text label
                            </Text>
                        </View>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            marginBottom: scale(16)
                        }}>
                        <Image
                            source={{
                                uri: 'https://phplaravel-695396-2297336.cloudwaysapps.com/public/user-avatars/452.webp'
                            }}
                            style={{
                                width: scale(48),
                                height: scale(48),
                                borderRadius: scale(48),
                                borderWidth: 1,
                                borderColor: '#eee'
                            }}
                        />
                        <View
                            style={{
                                flex: 1,
                                marginLeft: scale(8),
                                backgroundColor: '#fff',
                                padding: scale(16),
                                borderRadius: scale(16),
                                borderTopLeftRadius: 0
                            }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}>
                                <Text
                                    style={{
                                        fontSize: scale(16),
                                        color: '#091230'
                                    }}>
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
                                        marginLeft: scale(8)
                                    }}>
                                    <Text
                                        style={{
                                            fontSize: scale(12),
                                            color: '#F4F5F7'
                                        }}>
                                        Khách mời
                                    </Text>
                                </LinearGradient>
                            </View>
                            <Text
                                style={{
                                    fontSize: scale(16),
                                    color: '#091230',
                                    marginTop: scale(8)
                                }}>
                                Text labels need to be Text labels need to be
                                Text label
                            </Text>
                        </View>
                    </View>
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
                            <Text>Hello cac ban</Text>
                        </View>
                        <Image
                            source={{
                                uri: 'https://phplaravel-695396-2297336.cloudwaysapps.com/public/user-avatars/452.webp'
                            }}
                            style={{
                                width: scale(48),
                                height: scale(48),
                                borderRadius: scale(48),
                                borderWidth: 1,
                                borderColor: '#eee',
                                marginLeft: scale(8)
                            }}
                        />
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            marginBottom: scale(16)
                        }}>
                        <Image
                            source={{
                                uri: 'https://phplaravel-695396-2297336.cloudwaysapps.com/public/user-avatars/452.webp'
                            }}
                            style={{
                                width: scale(48),
                                height: scale(48),
                                borderRadius: scale(48),
                                borderWidth: 1,
                                borderColor: '#eee'
                            }}
                        />
                        <View
                            style={{
                                marginLeft: scale(8),
                                backgroundColor: '#fff',
                                padding: scale(16),
                                borderRadius: scale(16),
                                borderBottomLeftRadius: 0
                            }}>
                            {/* <Loader
                                size={scale(9)}
                                background="#52B55320"
                                activeBackground="#52B553"
                                animationScale={1}
                                dotMargin={4}
                            /> */}
                        </View>
                    </View>
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

                            fontSize: scale(14)
                        }}
                        placeholderTextColor={'#9C9C9C'}
                        placeholder="Tin nhắn"
                    />
                    <Pressable
                        style={{
                            padding: scale(16),
                            backgroundColor: '#EEFCF6'
                        }}>
                        {/* <SvgXml xml={svgSend} width={scale(24)} /> */}
                    </Pressable>
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}

export default ChatDetail
