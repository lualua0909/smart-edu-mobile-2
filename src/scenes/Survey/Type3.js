import React from 'react'

import { Dimensions } from 'react-native'

import { HStack, Pressable, Text, VStack, View } from 'native-base'

import Title from './Title'

const w = Dimensions.get('window').width * 0.9

const Type3 = ({ data, index, onSelect, selected }) => {
    const select = selected?.find(i => i?.id === data?.id)
    return (
        <VStack space={3} mb="5" key={index}>
            <Title index={index} title={data?.title} />
            <HStack space={3} justifyContent="center">
                {[...Array(5)].map((item, index) => {
                    const isSelected = select?.data === index + 1
                    return (
                        <Pressable
                            key={index}
                            onPress={() => onSelect(data?.id, index + 1)}>
                            <View
                                key={index}
                                w={w / 6}
                                bg={isSelected ? 'primary.50' : 'cyan.50'}
                                rounded="md"
                                p="2"
                                shadow={3}>
                                <Text
                                    color={isSelected ? '#fff' : '#000'}
                                    style={{ textAlign: 'center' }}>
                                    {index + 1}
                                </Text>
                            </View>
                        </Pressable>
                    )
                })}
            </HStack>
        </VStack>
    )
}

export default React.memo(Type3)
