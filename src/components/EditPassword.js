import { scale } from 'app/helpers/responsive'
import React, { useState } from 'react'

import { Pressable, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Text } from 'native-base'

const EditPassword = ({ isVisible, onBackPress, onSubmit }) => {
    const [viewHeight, setViewHeight] = useState({
        footer: 0
    })
    return (
        <>
            {isVisible && (
                <View
                    style={{
                        zIndex: 1,
                        width: '100%',
                        position: 'absolute',
                        height: '100%',
                        backgroundColor: '#00000066'
                    }}>
                    <SafeAreaView
                        onLayout={e =>
                            setViewHeight({
                                ...viewHeight,
                                footer: e.nativeEvent.layout.height
                            })
                        }
                        edges={['bottom']}
                        style={[
                            {
                                position: 'absolute',
                                bottom: 0,
                                width: '100%',
                                paddingBottom: scale(3),
                                paddingHorizontal: scale(20),
                                backgroundColor: '#FFFFFF'
                            }
                        ]}>
                        <Text
                            style={{
                                fontSize: scale(18),
                                color: '#1F1F1F',
                                textAlign: 'center',
                                padding: scale(20)
                            }}>
                            Đổi mật khẩu
                        </Text>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginTop: scale(5),
                                justifyContent: 'center'
                            }}>
                            {gender ? (
                                <Pressable
                                    style={{
                                        width: '30%',
                                        borderWidth: 1,
                                        borderColor: COLORS.green,
                                        paddingVertical: scale(12),
                                        alignItems: 'center',
                                        backgroundColor: COLORS.green,
                                        borderBottomStartRadius: scale(10),
                                        borderTopLeftRadius: scale(10)
                                    }}>
                                    <Text
                                        style={{
                                            fontSize: scale(18),
                                            color: '#fff'
                                        }}>
                                        Nam
                                    </Text>
                                </Pressable>
                            ) : (
                                <Pressable
                                    style={{
                                        width: '30%',
                                        borderWidth: 1,
                                        borderColor: '#E5E5E5',
                                        paddingVertical: scale(12),
                                        alignItems: 'center',
                                        backgroundColor: '#FFFFFF',
                                        borderBottomStartRadius: scale(10),
                                        borderTopLeftRadius: scale(10)
                                    }}
                                    onPress={() => setGender(true)}>
                                    <Text
                                        style={{
                                            fontSize: scale(18),
                                            color: '#000000'
                                        }}>
                                        Nam
                                    </Text>
                                </Pressable>
                            )}
                            {!gender ? (
                                <Pressable
                                    style={{
                                        width: '30%',
                                        borderWidth: 1,
                                        borderColor: COLORS.green,
                                        paddingVertical: scale(12),
                                        alignItems: 'center',
                                        backgroundColor: COLORS.green,
                                        borderTopEndRadius: scale(10),
                                        borderBottomRightRadius: scale(10)
                                    }}>
                                    <Text
                                        style={{
                                            fontSize: scale(18),
                                            color: '#fff'
                                        }}>
                                        Nữ
                                    </Text>
                                </Pressable>
                            ) : (
                                <Pressable
                                    style={{
                                        width: '30%',
                                        borderWidth: 1,
                                        borderColor: '#E5E5E5',
                                        paddingVertical: scale(12),
                                        alignItems: 'center',
                                        backgroundColor: '#FFFFFF',
                                        borderTopEndRadius: scale(10),
                                        borderBottomRightRadius: scale(10)
                                    }}
                                    onPress={() => onSubmit()}>
                                    <Text
                                        style={{
                                            fontSize: scale(18),
                                            color: '#000000'
                                        }}>
                                        Nữ
                                    </Text>
                                </Pressable>
                            )}
                        </View>
                        <Pressable
                            style={{
                                backgroundColor: COLORS.green,
                                padding: scale(10),
                                borderRadius: scale(8),
                                marginHorizontal: scale(10),
                                marginVertical: scale(20)
                            }}
                            onPress={() => setIsEditGender(false)}>
                            <Text
                                style={{
                                    textAlign: 'center',
                                    color: '#FFFFFF',

                                    fontSize: scale(18)
                                }}>
                                Lưu
                            </Text>
                        </Pressable>
                    </SafeAreaView>
                </View>
            )}
        </>
    )
}

export default EditPassword
