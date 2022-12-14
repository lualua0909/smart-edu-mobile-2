import React, { useState } from 'react'
import { View, Pressable, TextInput } from 'react-native'
import { scale } from 'app/helpers/responsive'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text } from 'native-base'

const EditPhone = ({ isVisible, onBackPress, onSubmit }) => {
    const [viewHeight, setViewHeight] = useState({
        footer: 0,
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
                        backgroundColor: '#00000066',
                    }}
                >
                    <SafeAreaView
                        onLayout={(e) =>
                            setViewHeight({
                                ...viewHeight,
                                footer: e.nativeEvent.layout.height,
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
                                backgroundColor: '#FFFFFF',
                            },
                        ]}
                    >
                        <Text
                            style={{
                                fontSize: scale(18),
                                color: '#1F1F1F',
                                textAlign: 'center',
                                padding: scale(20),
                            }}
                        >
                            Sửa số điện thoại
                        </Text>
                        <TextInput
                            placeholder="Nhập số điện thoại"
                            style={{
                                borderWidth: 1,
                                padding: scale(10),
                                borderRadius: scale(5),
                                borderColor: COLORS.green,
                                borderLeftWidth: scale(4),
                            }}
                        />
                        <Pressable
                            style={{
                                backgroundColor: COLORS.green,
                                padding: scale(10),
                                borderRadius: scale(8),
                                marginHorizontal: scale(10),
                                marginVertical: scale(20),
                            }}
                            onPress={() => onSubmit()}
                        >
                            <Text
                                style={{
                                    textAlign: 'center',
                                    color: '#FFFFFF',

                                    fontSize: scale(18),
                                }}
                            >
                                Lưu
                            </Text>
                        </Pressable>
                    </SafeAreaView>
                </View>
            )}
        </>
    )
}

export default EditPhone
