import { Text, VStack } from 'app/atoms'
import dayjs from 'dayjs'
import React from 'react'

import { Dimensions, View } from 'react-native'

import Title from './Title'

const w = Dimensions.get('window').width * 0.9

const Type9 = ({ data, index, onSelect, selected }) => {
    const select = selected?.find(i => i?.id === data?.id)
    return (
        <VStack space={3} style={{ marginBottom: 5 }} key={index}>
            <Title index={index} title={data?.title} />
            {data?.options?.map((item, rowIndex) => {
                const date = select?.data[rowIndex]
                return (
                    <View key={rowIndex} w={w} rounded="md" p="2">
                        <Text>{item}</Text>
                        {/* <DateTimePicker
                            date={date ? new Date(date) : new Date()}
                            onChange={(event, selectedDate) => {
                                onSelect(
                                    data?.id,
                                    rowIndex,
                                    dayjs(selectedDate)
                                        .format('YYYY-MM-DD')
                                        .toString()
                                )
                            }}
                        /> */}
                    </View>
                )
            })}
        </VStack>
    )
}

export default React.memo(Type9)
