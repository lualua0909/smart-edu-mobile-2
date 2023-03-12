import React from 'react'

import { StyleSheet, View } from 'react-native'

import { HStack, Heading, Spinner } from 'native-base'

export default ({ loading = true, title = 'Loading' }) =>
    loading && (
        <View style={styles.loading}>
            <HStack space={2} justifyContent="center">
                <Spinner size={'large'} accessibilityLabel="Loading posts" />
                <Heading color="primary.500" fontSize={'lg'}>
                    {title}
                </Heading>
            </HStack>
        </View>
    )

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
