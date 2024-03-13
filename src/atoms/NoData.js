import React from 'react'

import { Center, WarningIcon } from 'native-base'

export default () => (
    <Center
        height={100}
        _text={{
            fontSize: 14,
            color: '#6C746E'
        }}>
        <WarningIcon size="10" color="orange.300" />
        Không có dữ liệu
    </Center>
)
