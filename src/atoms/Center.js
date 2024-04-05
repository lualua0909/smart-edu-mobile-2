import React from 'react'

import { View } from 'react-native'

export default function Center({ children }) {
    return (
        <View
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
            {children}
        </View>
    )
}
// Path: src/atoms/Center.js
