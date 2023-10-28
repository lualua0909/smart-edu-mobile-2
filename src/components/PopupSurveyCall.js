import { scale } from 'app/helpers/responsive'
import { svgBackgroundSurveyCall, svgClose } from 'assets/svg'
import React from 'react'

import Modal from 'react-native-modal'
import { SvgXml } from 'react-native-svg'

import { Pressable, Text, View } from 'native-base'

const PopupSurveyCall = ({ isVisible, onBackPress, message, onSubmit }) => {
    return (
        <>
            <Modal
                isVisible={isVisible}
                onBackButtonPress={() => onBackPress(false)}
                onBackdropPress={() => onBackPress(false)}>
                <View
                    style={{
                        backgroundColor: '#fff',
                        borderRadius: scale(5)
                    }}>
                    <View
                        style={{
                            justifyContent: 'flex-end',
                            flexDirection: 'row',
                            marginTop: scale(-12)
                        }}>
                        <Pressable
                            onPress={() => onBackPress(false)}
                            hitSlop={15}
                            style={{
                                marginRight: scale(12),
                                marginTop: scale(12),
                                position: 'absolute',
                                zIndex: 1
                            }}>
                            <SvgXml
                                xml={svgClose('#fff')}
                                width={scale(24)}
                                height={scale(24)}
                            />
                        </Pressable>
                        <SvgXml xml={svgBackgroundSurveyCall} width="100%" />
                    </View>

                    <View
                        style={{
                            justifyContent: 'center',
                            margin: scale(20)
                        }}>
                        <Text
                            style={{
                                textAlign: 'center',
                                fontSize: scale(16),

                                color: '#6C746E'
                            }}>
                            {message}
                        </Text>
                        <View
                            style={{
                                justifyContent: 'center',
                                flexDirection: 'row'
                            }}>
                            <Pressable
                                style={{
                                    alignContent: 'center',
                                    alignItems: 'center'
                                }}
                                onPress={() => onSubmit()}>
                                <Text
                                    style={{
                                        fontSize: scale(16),
                                        color: '#52B553',
                                        padding: scale(5)
                                    }}>
                                    Đánh giá ngay
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    )
}

export default PopupSurveyCall
