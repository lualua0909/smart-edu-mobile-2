import React from 'react'
import { Skeleton, VStack, Center } from 'native-base'

export default () => (
    <Center w="100%">
        <VStack
            w="100%"
            space={15}
            alignItems="center"
            _dark={{
                borderColor: 'coolGray.500',
            }}
            _light={{
                borderColor: 'coolGray.200',
            }}
        >
            <Skeleton h="40" w="100%" />
            <Skeleton
                borderColor="coolGray.200"
                endColor="warmGray.50"
                size="40"
                mt="-70"
            />
            <Skeleton mb="3" rounded="20" w="100%" h="100" px="12" />
            <Skeleton.Text
                lines={3}
                alignItems="center"
                px="12"
                w="100%"
                h="100"
            />
            <Skeleton mb="3" rounded="20" w="100%" h="100" px="12" />
            <Skeleton.Text
                lines={3}
                alignItems="center"
                w="100%"
                h="100"
                px="12"
            />
        </VStack>
    </Center>
)
