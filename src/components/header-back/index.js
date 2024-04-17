import { scale } from 'app/helpers/responsive'
import React from 'react'

import { useNavigation } from '@react-navigation/native'
import { Dimensions, Pressable } from 'react-native'
import { ChevronLeft } from 'react-native-feather'

const HeaderBack = ({ white = false, style }) => {
    const navigation = useNavigation()

    return (
        <Pressable
            onPress={() => navigation.goBack()}
            hitSlop={15}
            style={{
                marginLeft: scale(15),
                backgroundColor: 'transparent',
                borderRadius: Dimensions.get('window').width * 0.5,
                ...style
            }}>
            <ChevronLeft
                width={36}
                height={36}
                stroke={white ? 'white' : '#0E564D'}
            />
        </Pressable>
    )
}

export default HeaderBack
