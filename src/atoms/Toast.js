import React from 'react'

import { Alert, HStack, Text, Toast, VStack } from 'native-base'

const ToastAlert = ({
    status,
    variant,
    title,
    placement,
    description,
    ...rest
}) => (
    <Alert
        maxWidth="98%"
        alignSelf="center"
        flexDirection="row"
        status={status}
        variant={variant}
        placement={placement}
        {...rest}
    >
        <VStack space={1} flexShrink={1} w="100%">
            <HStack
                flexShrink={1}
                alignItems="center"
                justifyContent="space-between"
            >
                <HStack space={2} flexShrink={1} alignItems="center">
                    <Text
                        fontSize="14"
                        fontWeight="bold"
                        flexShrink={1}
                        color={
                            variant === 'solid'
                                ? 'lightText'
                                : variant !== 'outline'
                                ? 'darkText'
                                : null
                        }
                    >
                        {title}
                    </Text>
                </HStack>
            </HStack>
            <Text
                fontSize="12"
                color={
                    variant === 'solid'
                        ? 'lightText'
                        : variant !== 'outline'
                        ? 'darkText'
                        : null
                }
            >
                {description}
            </Text>
        </VStack>
    </Alert>
)

export default ({
    title = '',
    description = '',
    placement = 'top',
    status = 'info',
}) => {
    Toast.show({
        placement,
        render: ({ id }) => {
            return (
                <ToastAlert
                    {...{
                        status,
                        title,
                        variant: 'left-accent',
                        description,
                    }}
                />
            )
        },
    })
}
