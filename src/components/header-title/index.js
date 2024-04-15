import { Text } from 'app/atoms'
import { scale } from 'app/helpers/responsive'
import React from 'react'

const HeaderTitle = ({ title, color = '#0E564D' }) => {
    return (
        <Text
            numberOfLines={2}
            style={{
                fontWeight: 'bold',
                fontSize: 18,
                color: color,
                textAlign: 'center',
                paddingTop: scale(2)
            }}>
            {title}
        </Text>
    )
}

export default HeaderTitle
