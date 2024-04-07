import { Text, VStack } from 'app/atoms'
import React from 'react'

const typeName = new Map([
    [0, 'Tự luận'],
    [1, 'Trắc nghiệm đơn'],
    [2, 'Đúng/Sai'],
    [3, 'Nối câu'],
    [5, 'Trắc nghiệm nhiều lựa chọn']
])

const Title = ({ index, title, isInvalid }) => (
    <VStack space={5}>
        <Text bold>Câu {parseInt(index) + 1}</Text>
        <Text>{title?.replace(/<[^>]*>?/gm, '')}</Text>
    </VStack>
)

export default Title
