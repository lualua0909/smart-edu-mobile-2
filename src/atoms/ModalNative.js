import React from 'react'

import { Alert, Modal, TouchableOpacity, View } from 'react-native'

const CustomModal = ({ isVisible, setIsVisible, children }) => {
    return (
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isVisible}
                onBackdropPress={() => Alert.alert('Modal has been closed.')}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.')
                    // setModalVisible(!isVisible)
                }}>
                <TouchableOpacity
                    style={{
                        flex: 1,
                        justifyContent: 'center'
                    }}
                    onPress={() => Alert.alert('Modal has been closed.')}>
                    <View
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'rgba(0,0,0,0.5)'
                        }}>
                        <View
                            style={{
                                backgroundColor: 'white',
                                borderRadius: 5,
                                padding: 10,
                                alignItems: 'center'
                            }}>
                            {children}
                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    )
}
export default CustomModal
