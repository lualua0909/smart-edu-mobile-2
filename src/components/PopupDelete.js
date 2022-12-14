import React from 'react'
import { View, Pressable } from 'react-native'
import { scale } from 'app/helpers/responsive'
import Modal from 'react-native-modal'
import { SvgXml } from 'react-native-svg'
import { svgClose, svgDelete } from 'assets/svg'
import { Text } from 'native-base'

const PopupDelete = ({ isVisible, onBackPress, message, headers }) => {
    return (
        <>
            <Modal
                isVisible={isVisible}
                onBackButtonPress={() => onBackPress(false)}
                onBackdropPress={() => onBackPress(false)}
            >
                <View
                    style={{
                        backgroundColor: '#fff',
                        borderRadius: scale(5),
                    }}
                >
                    <View
                        style={{
                            backgroundColor: '#00BD67',
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                            height: scale(35),
                            alignItems: 'center',
                        }}
                    >
                        <Text
                            style={{
                                marginLeft: scale(10),

                                fontSize: scale(16),
                                color: '#fff',
                            }}
                        >
                            {headers}
                        </Text>
                        <Pressable
                            onPress={() => onBackPress(false)}
                            hitSlop={15}
                            style={{
                                marginRight: scale(10),
                            }}
                        >
                            <SvgXml
                                xml={svgClose('#fff')}
                                width={scale(24)}
                                height={scale(24)}
                            />
                        </Pressable>
                    </View>
                    <View
                        style={{
                            textAlign: 'center',
                            margin: scale(20),

                            fontSize: scale(16),
                            color: '#6C746E',
                        }}
                    >
                        <View
                            style={{
                                justifyContent: 'center',
                                flexDirection: 'row',
                            }}
                        >
                            <SvgXml
                                xml={svgDelete}
                                width={scale(100)}
                                height={scale(100)}
                            />
                        </View>

                        <Text
                            style={{
                                textAlign: 'center',
                                marginTop: scale(20),
                                fontSize: scale(16),
                            }}
                        >
                            {message}
                        </Text>
                        <View
                            style={{
                                justifyContent: 'flex-end',
                                flexDirection: 'row',
                                marginTop: scale(20),
                            }}
                        >
                            <Pressable
                                style={{
                                    borderWidth: 1,
                                    borderColor: '#52B553',
                                    width: '30%',
                                    alignContent: 'center',
                                    alignItems: 'center',
                                    marginRight: scale(5),
                                    borderRadius: scale(5),
                                    backgroundColor: '#52B553',
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: scale(16),
                                        color: '#FFFFFF',
                                        padding: scale(5),
                                    }}
                                >
                                    Delete
                                </Text>
                            </Pressable>
                            <Pressable
                                style={{
                                    borderWidth: 1,
                                    width: '30%',
                                    alignContent: 'center',
                                    alignItems: 'center',
                                    marginLeft: scale(5),
                                    borderRadius: scale(5),
                                    borderColor: '#D9D9D9',
                                }}
                                onPress={() => onBackPress(false)}
                            >
                                <Text
                                    style={{
                                        fontSize: scale(16),
                                        color: '#2C2C2C',
                                        padding: scale(5),
                                    }}
                                >
                                    Cancel
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    )
}

export default PopupDelete
