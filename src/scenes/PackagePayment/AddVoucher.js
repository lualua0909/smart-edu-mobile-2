import React, { useState } from 'react'

import { Button, Center, Modal, ScrollView, Text, VStack } from 'native-base'

import VoucherList from '@/components/pages/Vouchers/List'

const AddVoucher = ({ modalVisible, setModalVisible }) => {
    return (
        <>
            <Modal isOpen={modalVisible} size="full">
                <Modal.Content>
                    <Modal.Header>Chọn Voucher</Modal.Header>
                    <Modal.Body>
                        <VoucherList data={[1, 2, 3, 4, 5, 6, 7]} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button.Group space={2}>
                            <Button
                                variant="ghost"
                                colorScheme="blueGray"
                                onPress={() => {
                                    setModalVisible(false)
                                }}>
                                Hủy
                            </Button>
                            <Button
                                onPress={() => {
                                    setModalVisible(false)
                                }}>
                                Áp dụng
                            </Button>
                        </Button.Group>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
        </>
    )
}

export default AddVoucher
