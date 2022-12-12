import React from 'react'
import { View, Text, FlatList } from 'react-native'
import { scale } from 'app/helpers/responsive'
import { SvgXml } from 'react-native-svg'
import { svgList } from 'assets/svg'
import { SafeAreaView } from 'react-native-safe-area-context'
import Modal from 'react-native-modal'
import Advise from 'app/components/advise'
import TeacherItem from 'app/components/TeacherItem'
import { FONTS, STYLES, ROUTES, COLORS } from 'app/constants'

const HotMentors = ({}) => {
    return (
        <View
            style={{
                borderTopWidth: scale(8),
                borderTopColor: COLORS.borderGrey,
                paddingVertical: scale(16),
                backgroundColor: '#fff',
            }}
        >
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: scale(16),
                }}
            >
                <SvgXml xml={svgList} width={scale(20)} />
                <Text
                    style={{
                        marginLeft: scale(8),
                        fontFamily: FONTS.MulishBold,
                        fontSize: scale(16),
                        color: '#0E564D',
                    }}
                >
                    GÓI TƯ VẤN HOT
                </Text>
            </View>
            <FlatList
                data={[1, 2, 3, 4]}
                keyExtractor={(_, index) => index.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    paddingLeft: scale(16),
                    marginTop: scale(16),
                }}
                renderItem={({ item, index }) => <Advise />}
            />
        </View>
    )
}

export default HotMentors
