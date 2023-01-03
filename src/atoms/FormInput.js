import React from 'react'

import { FormControl, Input, WarningOutlineIcon } from 'native-base'

export default () => {
    return (
        <FormControl isInvalid w="75%" maxW="300px">
            <FormControl.Label>Password</FormControl.Label>
            <Input placeholder="Enter password" />
            <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}>
                Try different from previous passwords.
            </FormControl.ErrorMessage>
        </FormControl>
    )
}
