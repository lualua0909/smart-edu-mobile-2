import { scale } from 'app/helpers/responsive'
import { svgClose, svgStarGold, svgStartBorderGold } from 'assets/svg'
import React from 'react'

import { Pressable, TextInput, View } from 'react-native'
import Modal from 'react-native-modal'
import { SvgXml } from 'react-native-svg'

import { Text } from 'native-base'

const PopupRate = ({ isVisible, onBackPress, message }) => {
    return (
        <>
            <Modal
                isVisible={isVisible}
                onBackButtonPress={() => onBackPress(false)}
                onBackdropPress={() => onBackPress(false)}>
                <View
                    style={{
                        backgroundColor: '#fff',
                        borderRadius: scale(5),
                        paddingTop: scale(10)
                    }}>
                    <View
                        style={{
                            justifyContent: 'flex-end',
                            flexDirection: 'row'
                        }}>
                        <Pressable
                            onPress={() => onBackPress(false)}
                            hitSlop={15}
                            style={{
                                marginRight: scale(12),
                                marginTop: scale(12),
                                position: 'absolute',
                                zIndex: 1,
                                marginTop: scale(-10)
                            }}>
                            <SvgXml
                                xml={svgClose('#6C746E')}
                                width={scale(24)}
                                height={scale(24)}
                            />
                        </Pressable>
                    </View>

                    <View
                        style={{
                            justifyContent: 'center',
                            margin: scale(20)
                        }}>
                        <Text
                            style={{
                                textAlign: 'center',
                                fontSize: scale(20),

                                color: '#1F1F1F'
                            }}>
                            {message}
                        </Text>
                        <View
                            style={{
                                justifyContent: 'center',
                                flexDirection: 'row',
                                padding: scale(20)
                            }}>
                            <SvgXml
                                xml={svgStarGold}
                                width={scale(40)}
                                style={{ margin: scale(2) }}
                            />
                            <SvgXml
                                xml={svgStarGold}
                                width={scale(40)}
                                style={{ margin: scale(2) }}
                            />
                            <SvgXml
                                xml={svgStarGold}
                                width={scale(40)}
                                style={{ margin: scale(2) }}
                            />
                            <SvgXml
                                xml={svgStarGold}
                                width={scale(40)}
                                style={{ margin: scale(2) }}
                            />
                            <SvgXml
                                xml={svgStartBorderGold}
                                width={scale(40)}
                                style={{ margin: scale(2) }}
                            />
                        </View>
                        <TextInput
                            placeholder="Bạn chia sẻ nhiều hơn nhé"
                            style={{
                                fontSize: scale(16),
                                color: '#333333',
                                textAlignVertical: 'top',
                                height: scale(100),
                                paddingLeft: scale(10),
                                paddingRight: scale(10),
                                borderWidth: 1,
                                borderColor: '#E5E5E5',
                                borderRadius: 6
                            }}
                            multiline={true}
                        />
                        <View
                            style={{
                                justifyContent: 'center',
                                flexDirection: 'row',
                                marginTop: scale(15)
                            }}>
                            <Pressable
                                style={{
                                    alignContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: '#52B553',
                                    borderRadius: scale(8),
                                    width: '60%'
                                }}>
                                <Text
                                    style={{
                                        fontSize: scale(16),
                                        color: '#FFFFFF',
                                        padding: scale(10)
                                    }}>
                                    Gửi giá ngay
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    )
}

export default PopupRate
