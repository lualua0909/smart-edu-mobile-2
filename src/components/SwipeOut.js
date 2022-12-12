import React, { useEffect, useMemo, useRef } from 'react'
import { View, Animated } from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { scale } from 'app/helpers/responsive'

const Swipeout = ({
    id,
    children,
    buttonWidth = scale(80),
    arrayButton = [],
}) => {
    const swipeoutWidth = useMemo(() => {
        return buttonWidth * arrayButton.length
    }, [])

    const renderRightActions = (progress) => {
        const trans = progress.interpolate({
            inputRange: [0, 1, 1.1],
            outputRange: [swipeoutWidth, 0, 0],
        })

        const opacity = progress.interpolate({
            inputRange: [0, 1, 1.1],
            outputRange: [0, 1, 1],
        })

        return (
            <View>
                <Animated.View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        opacity,
                        transform: [{ translateX: trans }],
                    }}
                >
                    {arrayButton.map((item, index) => (
                        <View key={index + ''}>{item}</View>
                    ))}
                </Animated.View>
            </View>
        )
    }

    return (
        <Swipeable
            renderRightActions={renderRightActions}
            rightThreshold={40}
            enabled={arrayButton.length > 0}
        >
            {children}
        </Swipeable>
    )
}

export default React.memo(Swipeout)
