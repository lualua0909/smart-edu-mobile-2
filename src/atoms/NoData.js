import { Center, Text } from 'app/atoms'
import React from 'react'

import { AlertTriangle } from 'react-native-feather'

export default () => (
    <Center height={100}>
        <AlertTriangle size={24} color="gray" />
        <Text bold>Không có dữ liệu</Text>
    </Center>
)
