import { Input, VStack } from 'app/atoms'
import React from 'react'

import { View } from 'react-native'

const DetailInformation = ({ data }) => {
    return (
        <View>
            <VStack space={10} style={{ marginHorizontal: 15 }}>
                <Input
                    label="Ngày sinh"
                    value={data?.birthday}
                    variant="underlined"
                    isDisabled={true}
                />
                <Input
                    label="Giới tính"
                    value={data?.gender === 2 ? 'Nữ' : 'Nam'}
                    variant="underlined"
                    isDisabled={true}
                />
                <Input
                    label="Địa chỉ"
                    value={data?.address}
                    variant="underlined"
                    isDisabled={true}
                />
                <Input
                    label="Chức vụ hiện tại"
                    value={data?.position}
                    variant="underlined"
                    isDisabled={true}
                />
                <Input
                    label="Thuộc bộ phận"
                    value={data?.department}
                    variant="underlined"
                    isDisabled={true}
                />
                <Input
                    label="Công ty"
                    value={data?.partner}
                    variant="underlined"
                    isDisabled={true}
                />
            </VStack>
        </View>
    )
}

export default DetailInformation
