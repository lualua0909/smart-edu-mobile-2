import { scale } from 'app/helpers/responsive'
import { clearDataAfterLogout } from 'app/helpers/utils'
import { svgClose } from 'assets/svg'
import React from 'react'

import { Pressable, View } from 'react-native'
import Modal from 'react-native-modal'
import { SvgXml } from 'react-native-svg'

import { Button, Center, Image, Text } from 'native-base'

const ModalNotLogin = ({ visible, setVisible }) => (
    <Modal
        isVisible={visible}
        onBackButtonPress={() => setVisible(false)}
        onBackdropPress={() => setVisible(false)}>
        <View
            style={{
                backgroundColor: '#fff',
                borderRadius: scale(5),
                paddingBottom: scale(28)
            }}>
            <Image
                source={require('assets/images/warning.png')}
                style={{
                    width: scale(135),
                    height: scale(135),
                    alignSelf: 'center',
                    marginTop: -scale(80)
                }}
                resizeMode="contain"
                alt="image"
            />
            <Pressable
                onPress={() => setVisible(false)}
                hitSlop={15}
                style={{
                    position: 'absolute',
                    top: -scale(50),
                    right: scale(10)
                }}>
                <SvgXml
                    xml={svgClose('#fff')}
                    width={scale(24)}
                    height={scale(24)}
                />
            </Pressable>
            <Text
                style={{
                    textAlign: 'center',
                    marginTop: scale(20),
                    fontSize: scale(16),
                    color: '#6C746E'
                }}>
                Vui lòng đăng nhập để sử dụng tính năng
            </Text>
            <Center>
                <Button
                    style={{
                        marginTop: scale(16)
                    }}
                    onPress={() => {
                        setVisible(false)
                        clearDataAfterLogout()
                    }}>
                    Đến trang đăng nhập
                </Button>
            </Center>
        </View>
    </Modal>
)

export default ModalNotLogin
