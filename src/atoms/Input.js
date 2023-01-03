import React from 'react'

import Ionicons from 'react-native-vector-icons/Ionicons'

import {
    FormControl,
    Icon,
    Input,
    Pressable,
    WarningOutlineIcon
} from 'native-base'

const CustomInput = ({
    icon,
    label = null,
    isRequired = false,
    error = null,
    allowClear = false,
    width = '100%',
    ...props
}) => (
    <FormControl isRequired={isRequired} isInvalid={error} width={width}>
        {label && <FormControl.Label>{label}</FormControl.Label>}
        <Input
            {...props}
            size="sm"
            variant="outline"
            InputLeftElement={
                icon ? (
                    <Icon as={icon} size={5} ml={3} color="muted.400" />
                ) : null
            }
            _light={{
                bg: 'coolGray.100',
                _hover: {
                    bg: 'coolGray.200'
                },
                _focus: {
                    bg: 'coolGray.200:alpha.50'
                },
                _disabled: {
                    bg: 'coolGray.200:alpha.30'
                }
            }}
            placeholder={props?.placeholder || label}
            InputRightElement={
                <>
                    {allowClear && props.value && (
                        <Pressable onPress={() => props.onChangeText('')}>
                            <Icon
                                as={<Ionicons name="close-circle" />}
                                size={5}
                                mr="2"
                                color="muted.400:alpha.60"
                            />
                        </Pressable>
                    )}
                    {props.InputRightElement}
                </>
            }
        />
        {error && (
            <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}>
                {error}
            </FormControl.ErrorMessage>
        )}
    </FormControl>
)

export default React.memo(CustomInput)
