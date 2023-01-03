import { scale } from 'app/helpers/responsive'
import React from 'react'

import { useNavigation } from '@react-navigation/native'
import { Dimensions, Pressable } from 'react-native'

import { ChevronLeftIcon } from 'native-base'

const HeaderBack = ({ white = false, whiteBg = false }) => {
    const navigation = useNavigation()

    return (
        <Pressable
            onPress={() => navigation.goBack()}
            hitSlop={15}
            style={{
                marginLeft: scale(15),
                backgroundColor: 'transparent',
                borderRadius: Dimensions.get('window').width * 0.5
            }}>
            <ChevronLeftIcon size={22} color={white ? 'white' : 'black'} />
        </Pressable>
    )
}

export default HeaderBack
