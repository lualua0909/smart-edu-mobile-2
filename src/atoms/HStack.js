import React from 'react'

import { View } from 'react-native'

export default function HStack({ children, style }) {
    return (
        <View style={{ display: 'flex', flexDirection: 'row', ...style }}>
            {children}
        </View>
    )
}
