import { HStack, Text, VStack } from 'app/atoms'
import React from 'react'

import { Pressable, View } from 'react-native'

import { Alert, Toast } from 'native-base'

const ToastAlert = ({ id, status, variant, title, placement, description }) => (
    <Pressable onPress={() => Toast.close(id)}>
        <Alert
            maxWidth="98%"
            alignSelf="center"
            flexDirection="row"
            status={status}
            variant={variant}
            placement={placement}>
            <VStack space={1}>
                <HStack space={2}>
                    <HStack space={2}>
                        <Alert.Icon />
                        <Text bold>{title}</Text>
                    </HStack>
                </HStack>
                <View>{description}</View>
            </VStack>
        </Alert>
    </Pressable>
)

export default ({
    title = '',
    description = '',
    placement = 'top',
    status = 'info'
}) => {
    Toast.show({
        placement,
        render: ({ id }) => {
            return (
                <ToastAlert
                    {...{
                        id,
                        status,
                        title: title || 'Thông báo',
                        variant: 'top-accent',
                        description
                    }}
                />
            )
        }
    })
}
