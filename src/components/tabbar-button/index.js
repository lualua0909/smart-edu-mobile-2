import { setGlobalState } from 'app/Store'
import { STYLES } from 'app/constants'
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
    const iconSize = focused ? scale(22) : scale(18)

    return (
        <Pressable
            {...props}
            style={[
                {
                    width: '20%',
                    alignItems: 'center',
                    justifyContent: 'flex-end'
                }
            ]}
            onPress={() => {
                if (disabled) setGlobalState('visibleNotLogin', true)
                else props.onPress()
            }}>
            {focused ? (
                <View
                    style={[
                        STYLES.boxShadow,
                        {
                            width: scale(50),
                            height: scale(50),
                            borderRadius: scale(50),
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderColor: '#fff',
                            backgroundColor: '#52B553',
                            position: 'absolute',
                            top: -scale(20)
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
                </>
            ) : (
                <>
                    <SvgXml
                        xml={iconInactive}
                        width={iconSize}
                        height={iconSize}
                    />
                </>
            )}
            <Text
                bold
                style={{
                    fontSize: scale(12),
                    color: '#A3A3A3'
                }}>
                {label}
            </Text>
        </Pressable>
    )
}

export default TabbarButton
