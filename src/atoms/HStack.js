import React from 'react'

import { View } from 'react-native'

export default function HStack({ children, style, space }) {
    return (
        <View style={{ display: 'flex', flexDirection: 'row', ...style }}>
            {children.map((child, index) => (
                <View
                    key={index}
                    style={{
                        marginRight: index === children.length - 1 ? 0 : space
                    }}>
                    {child}
                </View>
            ))}
        </View>
    )
}
