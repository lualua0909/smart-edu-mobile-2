import { scale } from 'app/helpers/responsive'
import { svgClose } from 'assets/svg'
import React from 'react'

import { Pressable, View } from 'react-native'
import Modal from 'react-native-modal'
import { SvgXml } from 'react-native-svg'

const CustomModal = ({ visible, onClose, children, style }) => {
    return (
        <Modal
            isVisible={visible}
            onBackButtonPress={onClose}
            onBackdropPress={onClose}>
            <View
                style={{
                    backgroundColor: '#fff',
                    borderRadius: scale(5),
                    ...style
                }}>
                <Pressable
                    onPress={onClose}
                    hitSlop={15}
                    style={{
                        backgroundColor: '#fff',
                        borderRadius: 50,
                        padding: 5,
                        position: 'absolute',
                        top: -15,
                        right: -13
                    }}>
                    <SvgXml
                        xml={svgClose('#a1a1a1')}
                        width={scale(24)}
                        height={scale(24)}
                    />
                </Pressable>
                {children}
            </View>
        </Modal>
    )
}

export default CustomModal
