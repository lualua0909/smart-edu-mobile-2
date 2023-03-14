import React from 'react'

import {
    Alert,
    Box,
    Center,
    CloseIcon,
    HStack,
    IconButton,
    Text,
    Toast,
    VStack
} from 'native-base'

const ToastAlert = ({
    status,
    variant,
    title,
    placement = 'top',
    description
}) => (
    <Center>
        <Alert
            maxWidth="98%"
            alignSelf="center"
            flexDirection="row"
            status={status || 'info'}
            variant={variant}
            placement={placement}>
            <VStack space={2} flexShrink={1} w="100%">
                <HStack
                    flexShrink={1}
                    space={2}
                    alignItems="center"
                    justifyContent="space-between">
                    <HStack flexShrink={1} space={2} alignItems="center">
                        <Alert.Icon />
                        <Text
                            fontSize="sm"
                            fontWeight="bold"
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
                    <IconButton
                        variant="unstyled"
                        _focus={{
                            borderWidth: 0
                        }}
                        icon={<CloseIcon size="3" />}
                        _icon={{
                            color: 'coolGray.600'
                        }}
                    />
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
                        status,
                        title,
                        variant: 'left-accent',
                        description
                    }}
                />
            )
        }
    })
}
