import React from 'react'

import { Box, Center, FormControl, Input, Text, VStack } from 'native-base'

const DetailInformation = ({ data, fullName }) => {
    return (
        <Center w="100%">
            <Box safeArea p="2" w="90%" py="8">
                <Text
                    style={{
                        fontSize: 16,
                        fontWeight: 'bold',
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
        </Center>
    )
}

export default React.memo(DetailInformation)
