import { scale } from 'app/helpers/responsive'
import React from 'react'

import { useNavigation } from '@react-navigation/native'
import { Dimensions, Pressable } from 'react-native'

import { ChevronLeftIcon } from 'native-base'

const HeaderBack = ({ white = false, parentId = null }) => {
    const navigation = useNavigation()

    return (
        <Pressable
            onPress={() =>
                navigation.navigate(ROUTES.CourseInfo, {
                    id: parentId
                })
            }
            hitSlop={15}
            style={{
                marginLeft: scale(15),
                backgroundColor: 'transparent',
                borderRadius: Dimensions.get('window').width * 0.5
            }}>
            <ChevronLeftIcon size={22} />
        </Pressable>
    )
}

export default HeaderBack
