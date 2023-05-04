import React from 'react'

import { Center, Skeleton, VStack } from 'native-base'

const ExamSkeleton = () => {
    return (
        <Center w="100%" mt="70">
            <VStack
                w="90%"
                maxW="400"
                borderWidth="1"
                space={8}
                overflow="hidden"
                rounded="md"
                _dark={{
                    borderColor: 'coolGray.500'
                }}
                _light={{
                    borderColor: 'coolGray.200'
                }}>
                <Skeleton h="40" />
                <Skeleton.Text px="4" />
                <Skeleton.Text px="4" />
                <Skeleton.Text px="4" />
                <Skeleton.Text px="4" />
            </VStack>
        </Center>
    )
}

export default ExamSkeleton
