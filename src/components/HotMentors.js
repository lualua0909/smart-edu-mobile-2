import { COLORS } from 'app/constants'
import { scale } from 'app/helpers/responsive'
import React from 'react'

import { View } from 'react-native'

const HotMentors = ({ data }) => {
    return (
        <View
            style={{
                borderTopWidth: scale(8),
                borderTopColor: COLORS.borderGrey,
                paddingVertical: scale(16),
                backgroundColor: '#fff'
            }}></View>
    )
}

export default HotMentors
