import { scale } from 'app/helpers/responsive'
import React, { useMemo, useState } from 'react'

import { useNavigation, useRoute } from '@react-navigation/native'
import { Dimensions, Image, Pressable, View } from 'react-native'

import { Button, Center, HStack, Text } from 'native-base'

const HeaderChat = ({}) => {
    const navigation = useNavigation()
    const route = useRoute()
    console.log('Route', route)

    return (
        <HStack space={2} justifyContent="center">
            <Pressable onPress={() => navigation.navigate('Chat')}>
                <Center
                    h="10"
                    w="150"
                    bg={route?.name === 'Chat' ? 'primary.300' : 'gray.300'}
                    rounded="md"
                    shadow={3}>
                    <Text color="white" fontSize={14}>
                        Bạn cùng học
                    </Text>
                </Center>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('ChatDetail')}>
                <Center
                    h="10"
                    w="150"
                    bg={
                        route?.name === 'ChatDetail'
                            ? 'primary.300'
                            : 'gray.300'
                    }
                    rounded="md"
                    shadow={3}>
                    <Text color="white" fontSize={14}>
                        Trò chuyện nhóm
                    </Text>
                </Center>
            </Pressable>
        </HStack>
    )
}

export default HeaderChat
