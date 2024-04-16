import React from 'react'

import { StyleSheet, Text } from 'react-native'

export default function CustomText({ children, style, bold }) {
    return (
        <Text
            style={[
                styles.text,
                { fontFamily: bold ? 'Mulish-Bold' : 'Mulish-Regular' },
                style
            ]}>
            {children}
        </Text>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 14,
        color: '#6C746E'
    }
})
