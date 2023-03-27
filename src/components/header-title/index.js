import { scale } from 'app/helpers/responsive'
import React from 'react'

import { Text } from 'native-base'

const HeaderTitle = ({ title }) => {
    return (
        <Text
            numberOfLines={2}
            style={{
                fontSize: scale(16),
                color: '#1F1F1F',
                textAlign: 'center',
                paddingTop: scale(2)
            }}>
            {title}
        </Text>
    )
}

export default HeaderTitle
