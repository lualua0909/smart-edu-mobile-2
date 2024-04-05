import { scale } from 'app/helpers/responsive'
import React from 'react'

import { useNavigation } from '@react-navigation/native'
import { Dimensions, Pressable } from 'react-native'
import { ChevronLeft } from 'react-native-feather'

const HeaderBack = ({ parentId = null }) => {
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
            <ChevronLeft width={22} height={22} stroke={'green'} />
        </Pressable>
    )
}

export default HeaderBack
