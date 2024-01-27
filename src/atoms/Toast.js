import React from 'react'

import Pressable from 'react-native/Libraries/Components/Pressable/Pressable'

import { Alert, Box, Center, HStack, Text, Toast, VStack } from 'native-base'

const ToastAlert = ({ id, status, variant, title, placement, description }) => (
    <Center>
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
                    <Box
                        pl="6"
                        _text={{
                            color: 'coolGray.600'
                        }}>
                        {description}
                    </Box>
                </VStack>
            </Alert>
        </Pressable>
    </Center>
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
