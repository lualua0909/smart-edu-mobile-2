import { Button, Center, HStack } from 'app/atoms'
import React from 'react'

import { useNavigation } from '@react-navigation/native'

const HeaderChat = () => {
    const navigation = useNavigation()
    return (
        <Center style={{ height: 40 }}>
            <HStack space={5}>
                <Button onPress={() => navigation.navigate('Chat')}>
                    Bạn cùng học
                </Button>
                <Button
                    onPress={() => navigation.navigate('ConversationDetail')}>
                    Trò chuyện nhóm
                </Button>
            </HStack>
        </Center>
    )
}

export default HeaderChat
