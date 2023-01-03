import React from 'react'

import { Center, Skeleton, VStack } from 'native-base'

export default () => (
    <Center w="100%">
        <VStack
            w="100%"
            maxW="400"
            space={6}
            rounded="md"
            alignItems="center"
            _dark={{
                borderColor: 'coolGray.500'
            }}
            _light={{
                borderColor: 'coolGray.200'
            }}>
            <Skeleton h="40" />
            <Skeleton.Text lines={3} alignItems="center" px="12" />
            <Skeleton.Text lines={3} alignItems="center" px="12" />
            <Skeleton.Text lines={3} alignItems="center" px="12" />
            <Skeleton mb="3" w="40" rounded="20" />
        </VStack>
    </Center>
)
