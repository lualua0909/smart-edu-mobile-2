import React from 'react'

import { StyleSheet, View } from 'react-native'

const Block = ({
    children,
    style,
    flex = 1,
    row,
    justify,
    justifyContent,
    align,
    alignItems,
    content,
    alignContent,
    wrap, // <-- add this
    ...props
}) => {
    const blockStyle = StyleSheet.flatten([
        flex !== undefined && { flex },
        row && { flexDirection: 'row' },
        justify !== undefined && { justifyContent: justify },
        justifyContent !== undefined && { justifyContent },
        align !== undefined && { alignItems: align },
        alignItems !== undefined && { alignItems },
        content !== undefined && { alignContent: content },
        alignContent !== undefined && { alignContent },
        wrap !== undefined && { flexWrap: wrap }, // <-- add this
        style
    ])

    return (
        <View style={blockStyle} {...props}>
            {children}
        </View>
    )
}

export default Block
