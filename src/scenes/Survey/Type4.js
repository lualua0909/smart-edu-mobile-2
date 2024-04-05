import { Text } from 'app/atoms'
import React from 'react'

import { Dimensions, Pressable, View } from 'react-native'

import { VStack } from 'native-base'

import Title from './Title'

const w = Dimensions.get('window').width * 0.9

const Type4 = ({ data, index, onSelect, selected }) => {
    const select = selected?.find(i => i?.id === data?.id)
    return (
        <VStack space={3} mb="5" key={index}>
            <Title index={index} title={data?.title} />
            {data?.options?.map((item, index) => {
                const isSelected = select?.data === item
                return (
                    <Pressable
                        key={index}
                        onPress={() => onSelect(data?.id, item)}>
                        <View
                            key={index}
                            w={w}
                            bg={isSelected ? 'primary.50' : 'cyan.50'}
                            rounded="md"
                            p="2"
                            shadow={3}>
                            <Text color={isSelected ? '#fff' : '#000'}>
                                {item}
                            </Text>
                        </View>
                    </Pressable>
                )
            })}
        </VStack>
    )
}

export default React.memo(Type4)
