import { Input, VStack } from 'app/atoms'
import React from 'react'

import Title from './Title'

const Writing = ({ data, index, onSelect }) => {
    return (
        <VStack space={3} style={{ marginBottom: 5 }} key={index}>
            <Title index={index} title={data?.title} />
            {[...Array(data?.row_number)].map((i, rowIndex) => (
                <Input
                    placeholder="Nhập nội dung câu trả lời"
                    value={data?.select?.option}
                    onChangeText={text => onSelect(data?.id, rowIndex, text)} // for android and ios
                    w="95%"
                    h={50}
                />
            ))}
        </VStack>
    )
}

export default React.memo(Writing)
