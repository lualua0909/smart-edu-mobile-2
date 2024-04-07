import { STYLES } from 'app/constants'
import { scale } from 'app/helpers/responsive'
import React from 'react'

import { Pressable } from 'react-native'

export default function Card({ shadow, children, onPress, style }) {
    return (
        <Pressable
            onPress={onPress}
            style={[
                {
                    borderRadius: scale(10),
                    marginBottom: scale(12),
                    borderWidth: 1,
                    borderColor: '#E5E5E5'
                },
                shadow ? STYLES.boxShadow : {},
                style
            ]}>
            {children}
        </Pressable>
    )
}
