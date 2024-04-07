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
            <VStack space={1} flexShrink={1} w="100%">
                <HStack
                    flexShrink={1}
                    space={2}
                    alignItems="center"
                    justifyContent="space-between">
                    <HStack flexShrink={1} space={2} alignItems="center">
                        <Alert.Icon />
                        <Text
                            fontSize="sm"
                            bold
                            color={
                                variant === 'solid'
                                    ? 'lightText'
                                    : variant !== 'outline'
                                    ? 'darkText'
                                    : null
                            }>
                            {title}
                        </Text>
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
