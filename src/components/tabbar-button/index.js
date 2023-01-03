import { scale } from 'app/helpers/responsive'
import React from 'react'

import { Pressable, View } from 'react-native'
import { SvgXml } from 'react-native-svg'

import { Text } from 'native-base'

const TabbarButton = ({ focused, label, iconActive, iconInactive, props }) => {
    const iconSize = focused ? scale(20) : scale(18)
    return (
        <Pressable
            {...props}
            style={{
                width: '20%',
                alignItems: 'center',
                justifyContent: 'flex-end'
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
            ) : (
                <SvgXml xml={iconInactive} width={iconSize} height={iconSize} />
            )}
            <Text
                style={[
                    {
                        fontSize: scale(12),
                        color: '#A3A3A3',
                        textAlign: 'center'
                    },
                    focused && { color: '#52B553' }
                ]}>
                {label}
            </Text>
        </Pressable>
    )
}

export default TabbarButton
