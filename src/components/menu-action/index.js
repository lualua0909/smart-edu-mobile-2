import { scale } from 'app/helpers/responsive'
import React, { useMemo, useState } from 'react'

import { TouchableOpacity, View } from 'react-native'
import { SvgXml } from 'react-native-svg'

import { Text } from 'native-base'

const MenuAction = ({
    icon,
    title,
    description,
    backgroundColor,
    badge = 0,
    onPress
}) => {
    return (
        <TouchableOpacity
            style={{ alignItems: 'center', width: '30%' }}
            onPress={onPress}>
            <View
                style={[
                    {
                        width: scale(54),
                        height: scale(54),
                        borderRadius: scale(54),
                        justifyContent: 'center',
                        alignItems: 'center'
                    },
                    { backgroundColor }
                ]}>
                <SvgXml xml={icon} width={scale(42)} height={scale(42)} />
                {badge > 0 && (
                    <View
                        style={{
                            width: scale(20),
                            height: scale(20),
                            borderRadius: scale(20),
                            backgroundColor: '#F13642',
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'absolute',
                            top: 0,
                            right: -scale(3)
                        }}>
                        <Text
                            style={{
                                fontSize: scale(12),
                                color: '#fff'
                            }}>
                            {badge}
                        </Text>
                    </View>
                )}
            </View>
            <Text
                style={{
                    marginTop: scale(8),

                    fontSize: scale(14),
                    color: '#1F1F1F'
                }}>
                {title}
            </Text>
            <Text
                style={{
                    fontSize: scale(12),
                    color: '#A3A3A3'
                }}>
                {description}
            </Text>
        </TouchableOpacity>
    )
}

export default MenuAction
