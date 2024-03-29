import { scale } from 'app/helpers/responsive'
import React from 'react'

import { Text } from 'native-base'

const HeaderTitle = ({ title }) => {
    return (
        <Text
            bold
            numberOfLines={2}
            style={{
                fontSize: 18,
                color: '#0E564D',
                textAlign: 'center',
                paddingTop: scale(2)
            }}>
            {title}
        </Text>
    )
}

export default HeaderTitle
