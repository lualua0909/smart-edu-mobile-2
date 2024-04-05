import { Input, Text } from 'app/atoms'
import React from 'react'

import { Box, FormControl, VStack } from 'native-base'

const DetailInformation = ({ data, fullName }) => {
    return (
        <Box w="90%" py="8">
            <Text
                bold
                style={{
                    fontSize: 16,
                    color: '#0E564D'
                }}>
                Giới thiệu về {fullName}
            </Text>
            <VStack space={3} mt="5">
                <FormControl>
                    <FormControl.Label>Ngày sinh</FormControl.Label>
                    <Input
                        value={data?.birthday}
                        variant="underlined"
                        isDisabled={true}
                    />
                </FormControl>
                <FormControl>
                    <FormControl.Label>Giới tính</FormControl.Label>
                    <Input
                        value={data?.gender === 2 ? 'Nữ' : 'Nam'}
                        variant="underlined"
                        isDisabled={true}
                    />
                </FormControl>
                <FormControl>
                    <FormControl.Label>Địa chỉ</FormControl.Label>
                    <Input
                        value={data?.address}
                        variant="underlined"
                        isDisabled={true}
                    />
                </FormControl>
                <FormControl>
                    <FormControl.Label>Chức vụ hiện tại</FormControl.Label>
                    <Input
                        value={data?.position}
                        variant="underlined"
                        isDisabled={true}
                    />
                </FormControl>
                <FormControl>
                    <FormControl.Label>Thuộc bộ phận</FormControl.Label>
                    <Input
                        value={data?.department}
                        variant="underlined"
                        isDisabled={true}
                    />
                </FormControl>
                <FormControl>
                    <FormControl.Label>Công ty</FormControl.Label>
                    <Input
                        value={data?.partner}
                        variant="underlined"
                        isDisabled={true}
                    />
                </FormControl>
            </VStack>
        </Box>
    )
}

export default DetailInformation
