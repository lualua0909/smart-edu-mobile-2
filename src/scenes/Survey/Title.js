import React from 'react'

import { FormControl, Text, WarningOutlineIcon } from 'native-base'

const typeName = new Map([
    [0, 'Tự luận'],
    [1, 'Trắc nghiệm đơn'],
    [2, 'Đúng/Sai'],
    [3, 'Nối câu'],
    [5, 'Trắc nghiệm nhiều lựa chọn']
])

const Title = ({ index, title, isInvalid }) => (
    <>
        <FormControl w="3/4" maxW="300" isInvalid={isInvalid}>
            <Text fontWeight="bold">Câu {parseInt(index) + 1}</Text>
            <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}>
                Please make a selection!
            </FormControl.ErrorMessage>
        </FormControl>
        <Text>{title?.replace(/<[^>]*>?/gm, '')}</Text>
    </>
)

export default Title
