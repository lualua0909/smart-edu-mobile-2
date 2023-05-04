import Advise from 'app/components/Advise'
import { COLORS } from 'app/constants'
import { scale } from 'app/helpers/responsive'
import { svgList } from 'assets/svg'
import React from 'react'

import { FlatList, View } from 'react-native'
import { SvgXml } from 'react-native-svg'

import { Text } from 'native-base'

const HotMentors = ({ data }) => {
    return (
        <View
            style={{
                borderTopWidth: scale(8),
                borderTopColor: COLORS.borderGrey,
                paddingVertical: scale(16),
                backgroundColor: '#fff'
            }}>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: scale(16)
                }}>
                <SvgXml xml={svgList} width={scale(20)} />
                <Text
                    style={{
                        marginLeft: scale(8),
                        fontSize: scale(16),
                        fontWeight: 'bold',
                        color: '#0E564D',
                        paddingTop: scale(5)
                    }}>
                    GÓI TƯ VẤN
                </Text>
            </View>
            <FlatList
                data={data}
                keyExtractor={(_, index) => index.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    paddingLeft: scale(16),
                    marginTop: scale(16)
                }}
                renderItem={({ item, index }) => <Advise data={item} />}
            />
        </View>
    )
}

export default HotMentors
