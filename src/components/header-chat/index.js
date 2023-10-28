import React from 'react'

import { useNavigation, useRoute } from '@react-navigation/native'

import { Center, HStack, Pressable, Text } from 'native-base'

const HeaderChat = ({}) => {
    const navigation = useNavigation()
    const route = useRoute()

    return (
        <HStack space={2} justifyContent="center" mt="3">
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
