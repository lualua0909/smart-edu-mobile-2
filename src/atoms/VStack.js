import React from 'react'

import { View } from 'react-native'

export default function VStack({ children, style, gap }) {
    return (
        <View style={{ display: 'flex', flexDirection: 'column', ...style }}>
            {children.map((child, index) => (
                <View key={index} style={{ marginTop: gap }}>
                    {child}
                </View>
            ))}
        </View>
    )
}
