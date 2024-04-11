import { Text } from 'app/atoms'
import { scale } from 'app/helpers/responsive'
import { svgCircleTick } from 'assets/svg'
import React from 'react'

import { Pressable, View } from 'react-native'
import { SvgXml } from 'react-native-svg'

export default ({ isChecked, text, onPress }) => (
    <Pressable onPress={onPress}>
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center'
            }}>
            {isChecked ? (
                <SvgXml
                    xml={svgCircleTick}
                    width={scale(16)}
                    height={scale(16)}
                />
            ) : (
                <View
                    style={{
                        width: scale(16),
                        height: scale(16),
                        borderRadius: scale(16),
                        borderWidth: 1,
                        borderColor: '#000'
                    }}
                />
            )}

            <Text
                style={{
                    fontSize: scale(14),
                    marginLeft: scale(15),
                    flex: 1,
                    color: '#000'
                }}>
                {text}
            </Text>
        </View>
    </Pressable>
)
