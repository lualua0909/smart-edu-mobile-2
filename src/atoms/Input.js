import React from 'react'

import { XCircle } from 'react-native-feather'

import { FormControl, Input, Pressable, WarningOutlineIcon } from 'native-base'

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
            _light={{
                bg: 'coolGray.100',
                _hover: {
                    bg: 'coolGray.200'
                },
                _focus: {
                    // bg: 'coolGray.200:alpha.50'
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
                            <XCircle
                                width={16}
                                height={16}
                                fill={'#777'}
                                color="#fff"
                                style={{ marginRight: 7 }}
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
