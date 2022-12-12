import React from 'react'
import { Skeleton, VStack, Center, HStack } from 'native-base'

export default () => (
    <Center w="100%" style={{ marginTop: 20 }}>
        <VStack
            w="100%"
            space={4}
            rounded="md"
            alignItems="center"
            _dark={{
                borderColor: 'coolGray.500',
            }}
            _light={{
                borderColor: 'coolGray.200',
            }}
        >
            <Item />
            <Item />
            <Item />
        </VStack>
    </Center>
)

const Item = () => (
    <Center w="100%">
        <HStack
            w="90%"
            borderWidth="1"
            space={2}
            rounded="lg"
            _dark={{
                borderColor: 'coolGray.500',
            }}
            _light={{
                borderColor: 'coolGray.200',
            }}
            p="4"
        >
            <Skeleton flex="1" h="150" rounded="md" startColor="green.200" />
            <VStack flex="3" space="4">
                <Skeleton startColor="lime.200" rounded="md" />
                <Skeleton.Text />
                <HStack space="2" alignItems="center">
                    <Skeleton h="3" flex="2" rounded="full" />
                    <Skeleton h="3" flex="2" rounded="full" />
                </HStack>
            </VStack>
        </HStack>
    </Center>
)
