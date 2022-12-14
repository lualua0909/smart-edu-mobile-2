import React from 'react'
import { View, Pressable } from 'react-native'
import { Text } from 'native-base'
import { scale } from 'app/helpers/responsive'
import { SvgXml } from 'react-native-svg'
import { svgCircleTick } from 'assets/svg'

export default ({ isChecked, text, onPress }) => (
    <Pressable style={{ paddingTop: scale(12) }} onPress={onPress}>
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
            }}
        >
            {isChecked ? (
                <SvgXml
                    xml={svgCircleTick}
                    width={scale(21)}
                    height={scale(21)}
                />
            ) : (
                <View
                    style={{
                        width: scale(21),
                        height: scale(21),
                        borderRadius: scale(21),
                        borderWidth: 1,
                        borderColor: '#000',
                    }}
                />
            )}

            <Text
                style={{
                    fontSize: scale(17),
                    marginLeft: scale(15),
                    flex: 1,
                    color: '#000',
                }}
            >
                {text}
            </Text>
        </View>
        <View
            style={{
                flexDirection: 'row',
                marginTop: scale(10),
            }}
        >
            <View style={{ width: scale(21) }} />
            <View
                style={{
                    flex: 1,
                    marginLeft: scale(15),
                    height: 1,
                    backgroundColor: '#ddd',
                }}
            />
        </View>
    </Pressable>
)
