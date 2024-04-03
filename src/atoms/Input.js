import { Text } from 'app/atoms'
import React, { useRef } from 'react'

import { TextInput as Input, Pressable, StyleSheet, View } from 'react-native'
import { XCircle } from 'react-native-feather'

const CustomInput = ({
    icon,
    label,
    isRequired = false,
    error,
    allowClear,
    width = '100%',
    placeholder,
    ...props
}) => (
    <>
        {label && <Text style={styles.label}>{label}</Text>}
        <View style={styles.searchSection}>
            <Input
                {...props}
                style={styles.input}
                placeholder={placeholder}
                placeholderTextColor="#eee"
                underlineColorAndroid="transparent"
            />
            {allowClear && props.value && (
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
            )}
            <Pressable style={[styles.searchIcon, { paddingRight: 20 }]}>
                {props.InputRightElement}
            </Pressable>
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

export default React.memo(CustomInput)

const styles = StyleSheet.create({
    searchSection: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    searchIcon: {
        position: 'absolute',
        right: 10
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
        height: 40,
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
