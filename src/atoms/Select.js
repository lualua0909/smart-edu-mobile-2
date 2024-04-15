import { Button, Text } from 'app/atoms'
import React from 'react'

import { StyleSheet, View } from 'react-native'
import { ChevronDown, ChevronUp } from 'react-native-feather'
import SelectDropdown from 'react-native-select-dropdown'

export default Select = ({
    data,
    style,
    displayItem,
    onChange,
    placeholder = 'chọn...'
}) => {
    return (
        <SelectDropdown
            data={data}
            onSelect={(item, index) => {
                onChange(item, index)
            }}
            renderButton={(selectedItem, isOpened) => {
                return (
                    <Button style={styles.dropdownButtonStyle}>
                        <Text style={styles.dropdownButtonTxtStyle}>
                            {(selectedItem && selectedItem.title) ||
                                placeholder}
                        </Text>
                        {isOpened ? (
                            <ChevronUp
                                color="#52B553"
                                width={18}
                                style={styles.dropdownButtonArrowStyle}
                            />
                        ) : (
                            <ChevronDown
                                color="#52B553"
                                width={18}
                                style={styles.dropdownButtonArrowStyle}
                            />
                        )}
                    </Button>
                )
            }}
            renderItem={(item, index, isSelected) => {
                return (
                    <View
                        style={{
                            ...styles.dropdownItemStyle,
                            ...(isSelected && {
                                backgroundColor: '#9BCF53'
                            })
                        }}>
                        {displayItem(item, index, isSelected)}
                    </View>
                )
            }}
            showsVerticalScrollIndicator={false}
            dropdownStyle={styles.dropdownMenuStyle}
        />
    )
}
const styles = StyleSheet.create({
    dropdownButtonStyle: {
        width: 200,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 5,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#9BCF53'
    },
    dropdownButtonTxtStyle: {
        flex: 1,
        fontSize: 14,
        fontWeight: '500',
        color: '#151E26'
    },
    dropdownButtonArrowStyle: {
        fontSize: 18
    },
    dropdownMenuStyle: {
        backgroundColor: '#416D19',
        borderRadius: 8
    },
    dropdownItemStyle: {
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 12,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8
    },
    dropdownItemTxtStyle: {
        flex: 1,
        fontSize: 16,
        fontWeight: '500',
        color: '#fff'
    }
})
