import { Text } from 'app/atoms'
import React from 'react'

import { Pressable, StyleSheet, TextInput, View } from 'react-native'
import { XCircle } from 'react-native-feather'

const Input = ({
    label,
    isRequired = false,
    error,
    allowClear,
    placeholder,
    height,
    InputRightElement,
    ...props
}) => (
    <>
        {label && <Text style={styles.label}>{label}</Text>}
        <View style={styles.searchSection}>
            <TextInput
                {...props}
                multiline={true}
                numberOfLines={4}
                style={[styles.input, { height }]}
                placeholder={placeholder}
                placeholderTextColor="#6C746E"
                underlineColorAndroid="transparent"
            />
            {allowClear && props.value && !InputRightElement ? (
                <Pressable
                    style={styles.searchIcon}
                    onPress={() => props.onChangeText('')}>
                    <XCircle
                        width={16}
                        height={16}
                        fill={'#777'}
                        color="#fff"
                    />
                </Pressable>
            ) : null}

            {InputRightElement ? (
                <View style={styles.searchIcon}>{InputRightElement}</View>
            ) : null}

            {error && (
                <Text
                    style={{
                        color: 'red',
                        fontSize: 12,
                        textAlign: 'left',
                        width: '100%'
                    }}>
                    {error}
                </Text>
            )}
        </View>
    </>
)

export default Input

const styles = StyleSheet.create({
    searchSection: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    searchIcon: {
        position: 'absolute',
        right: 15
    },
    label: {
        marginBottom: 5,
        textAlign: 'left',
        width: '100%',
        fontSize: 14,
        color: '#6C746E',
        fontFamily: 'Mulish-Bold'
    },
    input: {
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#E1E1E1',
        width: '100%',
        color: '#6C746E',
        fontFamily: 'Mulish-Regular',
        fontSize: 14
    }
})
