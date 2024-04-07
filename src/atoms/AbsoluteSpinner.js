import { HStack, Text } from 'app/atoms'
import React from 'react'

import { ActivityIndicator, StyleSheet, View } from 'react-native'

export default function AbsoluteSpinner({
    loading = true,
    title = 'Đang tải'
}) {
    return (
        loading && (
            <View style={styles.loading}>
                <HStack>
                    <ActivityIndicator size="large" color="green" />
                    <Text
                        style={{
                            marginTop: 5,
                            marginLeft: 10,
                            color: 'black',
                            fontSize: 16,
                            fontWeight: 'bold'
                        }}>
                        {title}
                    </Text>
                </HStack>
            </View>
        )
    )
}

const styles = StyleSheet.create({
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        opacity: 0.5,
        backgroundColor: '#eee',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999
    }
})
