import React from 'react'

import { View } from 'react-native'

export default function VStack({ children, style, space }) {
    return (
        <View style={{ display: 'flex', flexDirection: 'column', ...style }}>
            {Array.isArray(children)
                ? children.map((child, index) => (
                      <View key={index} style={{ marginTop: space }}>
                          {child}
                      </View>
                  ))
                : children}
        </View>
    )
}
