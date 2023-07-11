import Advise from 'app/components/Advise'
import { COLORS } from 'app/constants'
import { scale } from 'app/helpers/responsive'
import { svgList } from 'assets/svg'
import React from 'react'

import { FlatList, View } from 'react-native'
import { SvgXml } from 'react-native-svg'

import { Text } from 'native-base'

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
