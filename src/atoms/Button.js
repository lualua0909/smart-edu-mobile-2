import { HStack } from 'app/atoms'
import React from 'react'

import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native'

export default function Button({
    onPress,
    children,
    outlined,
    style,
    isLoading,
    isLoadingText
}) {
    return (
        <Pressable
            style={[
                outlined ? styles.outlined : styles.button,
                isLoading ? styles.disabled : null,
                style
            ]}
            disabled={isLoading}
            onPress={onPress}>
            <HStack>
                {isLoading && (
                    <ActivityIndicator
                        size="small"
                        color="#fff"
                        style={{ marginRight: 5 }}
                    />
                )}
                <Text style={outlined ? styles.outlinedText : styles.text}>
                    {isLoading ? isLoadingText : children}
                </Text>
            </HStack>
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
    disabled: {
        backgroundColor: '#52B55350'
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
