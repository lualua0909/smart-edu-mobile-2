import React from 'react'

import { TextArea, VStack } from 'native-base'

import Title from './Title'

const Writing = ({ data, index, onSelect }) => {
    return (
        <VStack space={3} mb="5" key={index}>
            <Title index={index} title={data?.title} />
            {[...Array(data?.row_number)].map((i, rowIndex) => (
                <TextArea
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
