import React from 'react'

import { View } from 'react-native'

export default function VStack({ children, style }) {
    return (
        <View style={{ display: 'flex', flexDirection: 'column', ...style }}>
            {children}
        </View>
    )
}
