import React from 'react'
import { Pressable, Dimensions } from 'react-native'
import { scale } from 'app/helpers/responsive'
import { useNavigation } from '@react-navigation/native'
import { ChevronLeftIcon } from 'native-base'

const HeaderBack = ({ white = false, whiteBg = false }) => {
    const navigation = useNavigation()

    return (
        <Pressable
            onPress={() => navigation.goBack()}
            hitSlop={15}
            style={{
                marginLeft: scale(15),
                backgroundColor: '#fff',
                borderRadius: Dimensions.get('window').width * 0.5,
            }}
        >
            <ChevronLeftIcon
                size={scale(36)}
                color={white ? 'white' : 'black'}
            />
        </Pressable>
    )
}

export default HeaderBack
