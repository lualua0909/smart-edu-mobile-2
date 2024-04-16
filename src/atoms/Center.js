import React from 'react'

import { View } from 'react-native'

export default function Center({ children, style }) {
    return (
        <View
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                ...style
            }}>
            {children}
        </View>
    )
}
// Path: src/atoms/Center.js
