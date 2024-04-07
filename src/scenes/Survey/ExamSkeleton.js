import { Center, VStack } from 'app/atoms'
import React from 'react'

import { Skeleton } from 'react-native-skeletons'

export default () => (
    <VStack space={6} style={{ marginTop: 20 }}>
        <Center>
            <Skeleton count={8} width={'80%'} height={60} color={'#E2E8F0'} />
        </Center>
    </VStack>
)
