import { Center, VStack } from 'app/atoms'
import React from 'react'

import { Skeleton } from 'react-native-skeletons'

export default () => (
    <VStack space={6} style={{ marginTop: 20 }}>
        <Center>
            <Skeleton
                circle
                width={100}
                height={100}
                style={{ marginBottom: 20 }}
            />
            <Skeleton count={8} width={'80%'} height={50} color={'#E2E8F0'} />
        </Center>
    </VStack>
)
