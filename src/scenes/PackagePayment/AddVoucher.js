import { Button, Modal } from 'app/atoms'
import React from 'react'

import VoucherList from '@/components/pages/Vouchers/List'

const AddVoucher = ({ modalVisible, setModalVisible }) => {
    return (
        <Modal visible={modalVisible} onClose={() => setModalVisible(false)}>
            <VoucherList data={[1, 2, 3, 4, 5, 6, 7]} />
            <Button
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
            {/* <Modal.Content>
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
            </Modal.Content> */}
        </Modal>
    )
}

export default AddVoucher
