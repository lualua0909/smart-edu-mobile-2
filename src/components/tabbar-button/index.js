import { useGlobalState } from 'app/Store'
import { scale } from 'app/helpers/responsive'
import React from 'react'

import { Lock } from 'react-native-feather'
import { SvgXml } from 'react-native-svg'

import { Pressable, Text, View } from 'native-base'

const TabbarButton = ({
    focused,
    label,
    iconActive,
    iconInactive,
    props,
    disabled = false
}) => {
    const iconSize = focused ? scale(20) : scale(18)
    const [visible, setVisible] = useGlobalState('visibleNotLogin')

    return (
        <Pressable
            {...props}
            style={{
                width: '20%',
                alignItems: 'center',
                justifyContent: 'flex-end'
            }}
            onPress={() => {
                if (disabled) setVisible(true)
                else props.onPress()
            }}>
            {focused ? (
                <View
                    style={[
                        {
                            width: scale(60),
                            height: scale(60),
                            borderRadius: scale(60),
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderWidth: scale(5),
                            borderColor: '#fff',
                            backgroundColor: '#52B553',
                            position: 'absolute',
                            top: -scale(26)
                        }
                    ]}>
                    <SvgXml
                        xml={iconActive}
                        width={iconSize}
                        height={iconSize}
                    />
                </View>
            ) : disabled ? (
                <>
                    <Lock
                        stroke="#A3A3A3"
                        width={scale(16)}
                        height={scale(16)}
                    />
                    <Text
                        style={{
                            fontSize: scale(12),
                            color: '#A3A3A3',
                            textAlign: 'center'
                        }}>
                        {label}
                    </Text>
                </>
            ) : (
                <>
                    <SvgXml
                        xml={iconInactive}
                        width={iconSize}
                        height={iconSize}
                    />
                    <Text
                        style={{
                            fontSize: scale(12),
                            color: '#A3A3A3',
                            textAlign: 'center'
                        }}>
                        {label}
                    </Text>
                </>
            )}
        </Pressable>
    )
}

export default TabbarButton
