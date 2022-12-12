import React from 'react'
import { View, Text } from 'react-native'
import { scale } from 'app/helpers/responsive'
import { SvgXml } from 'react-native-svg'
import { FONTS } from 'app/constants'
import { svgBestSaler } from 'assets/svg'

const Achievement = ({ data }) => {
    return (
        <View
            style={{
                borderTopWidth: scale(8),
                borderTopColor: COLORS.borderGrey,
                paddingTop: scale(16),
                width: '100%',
            }}
        >
            <View
                style={{
                    paddingHorizontal: scale(16),
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                >
                    <Text
                        style={{
                            fontFamily: FONTS.MulishBold,
                            fontSize: scale(16),
                            color: '#0E564D',
                            marginLeft: scale(8),
                            textTransform: 'uppercase',
                        }}
                    >
                        Thành Tích nổi bật
                    </Text>
                </View>
            </View>
            <View
                style={{
                    paddingBottom: scale(10),
                    paddingTop: scale(10),
                }}
            >
                {data?.map((value, index) => (
                    <>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                paddingHorizontal: scale(16),
                                paddingBottom: scale(10),
                            }}
                            key={index}
                        >
                            <SvgXml
                                xml={svgBestSaler}
                                width={scale(50)}
                                style={{ color: '#000000' }}
                            />
                            <Text
                                style={{
                                    fontFamily: FONTS.Mulish,
                                    fontSize: scale(17),
                                    marginLeft: scale(5),
                                    flex: 1,
                                    color: '#000',
                                }}
                            >
                                {value}
                            </Text>
                        </View>
                    </>
                ))}
            </View>
        </View>
    )
}

export default Achievement
