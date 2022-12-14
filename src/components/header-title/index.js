import React from 'react'
import { Text } from 'react-native'
import { scale } from 'app/helpers/responsive'

const HeaderTitle = ({ title }) => {
    return (
        <Text
            numberOfLines={2}
            style={{
                fontSize: scale(16),
                color: '#1F1F1F',
                textAlign: 'center',
            }}
        >
            {title}
        </Text>
    )
}

export default HeaderTitle
