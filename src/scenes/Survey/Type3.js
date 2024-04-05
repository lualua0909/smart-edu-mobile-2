import { scale } from 'app/helpers/responsive'
import kemImg from 'assets/images/kem.png'
import khaImg from 'assets/images/kha.png'
import totImg from 'assets/images/tot.png'
import tbImg from 'assets/images/trungbinh.png'
import xuatsacImg from 'assets/images/xuatsac.png'
import React from 'react'

import { Dimensions, Pressable } from 'react-native'

import { Avatar, HStack, VStack } from 'native-base'

import Title from './Title'

const w = Dimensions.get('window').width * 0.9

const indexToImg = index => {
    switch (index) {
        case 1:
            return kemImg
        case 2:
            return tbImg
        case 3:
            return khaImg
        case 4:
            return totImg
        case 5:
            return xuatsacImg
    }
}

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
                            <Avatar
                                key={index}
                                size={scale(isSelected ? w / 8 : w / 10)}
                                shadow={3}
                                source={indexToImg(index + 1)}>
                                {index + 1}
                            </Avatar>
                        </Pressable>
                    )
                })}
            </HStack>
        </VStack>
    )
}

export default React.memo(Type3)
