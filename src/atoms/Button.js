import React from 'react'

import { Pressable, StyleSheet, Text } from 'react-native'

export default function Button({ onPress, children, outlined, style }) {
    return (
        <Pressable
            style={[outlined ? styles.outlined : styles.button, style]}
            onPress={onPress}>
            <Text style={outlined ? styles.outlinedText : styles.text}>
                {children}
            </Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 6,
        paddingHorizontal: 24,
        borderRadius: 5,
        elevation: 3,
        backgroundColor: '#52B553'
    },
    outlined: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 6,
        paddingHorizontal: 24,
        borderRadius: 5,
        elevation: 3,
        backgroundColor: '#fff',
        color: '#52B553'
    },
    text: {
        fontSize: 14,
        lineHeight: 21,
        letterSpacing: 0.25,
        color: 'white',
        fontFamily: 'Mulish-SemiBold'
    },
    outlinedText: {
        fontSize: 14,
        lineHeight: 21,
        letterSpacing: 0.25,
        color: '#52B553',
        fontFamily: 'Mulish-Medium'
    }
})
