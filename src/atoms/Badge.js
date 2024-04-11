import React from 'react'

import { StyleSheet, Text, View } from 'react-native'

export default function Badge({ children, color = '#52B55380' }) {
    return (
        <View style={[styles.badge, { backgroundColor: color }]}>
            <Text style={styles.text}>{children}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    badge: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 5,
        elevation: 3
    },
    text: {
        fontSize: 12
    }
})
