import { ROUTES } from 'app/constants'
import { scale } from 'app/helpers/responsive'
import { svgCircle, svgLineDashVertical } from 'assets/svg'
import dayjs from 'dayjs'
import React from 'react'

import { useNavigation } from '@react-navigation/native'
import { Pressable, View } from 'react-native'
import { Book } from 'react-native-feather'
import { SvgXml } from 'react-native-svg'

import { Box, HStack, Progress } from 'native-base'
import { Text } from 'native-base'

var customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)

const HistoryItem = ({ data }) => {
    const navigation = useNavigation()
    const year = dayjs(data?.end_date, 'DD-MM-YYYY').year()
    const month = dayjs(data?.end_date, 'DD-MM-YYYY').month()
    const day = dayjs(data?.end_date, 'DD-MM-YYYY').date()

    return (
        <Pressable
            onPress={() =>
                navigation.navigate(ROUTES.CourseInfo, { id: data?.id })
            }
            style={{ flexDirection: 'row', marginTop: 5 }}>
            <View style={{ width: scale(100), height: scale(114) }}>
                <View
                    style={{
                        alignSelf: 'flex-end',
                        zIndex: 1
                    }}>
                    <SvgXml
                        xml={svgCircle}
                        style={{
                            color: '#9FBDF6',
                            position: 'absolute',
                            marginTop: scale(-5),
                            marginLeft: scale(-6),
                            zIndex: 2
                        }}
                    />
                    <SvgXml
                        xml={svgLineDashVertical}
                        height="100%"
                        style={{ color: '#9FBDF6' }}
                    />
                </View>
                <View
                    style={{
                        paddingHorizontal: scale(11),
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        width: '100%',
                        position: 'absolute'
                    }}>
                    <View>
                        <Text
                            style={{
                                fontSize: scale(14),
                                color: '#000000',
                                textAlign: 'right'
                            }}>
                            Ngày {day || ''}
                        </Text>
                        <Text
                            style={{
                                fontSize: scale(14),
                                color: '#6C746E',
                                textAlign: 'right'
                            }}>
                            Tháng {month || ''}
                        </Text>
                        <Text
                            style={{
                                fontSize: scale(14),
                                color: '#6C746E',
                                textAlign: 'right'
                            }}>
                            {year || dayjs().year()}
                        </Text>
                    </View>
                </View>
            </View>
            <View
                style={{
                    flex: 1,
                    padding: scale(10)
                }}>
                <Box
                    style={{
                        backgroundColor: '#FFFFFF'
                    }}
                    rounded="lg"
                    p={3}
                    shadow={5}>
                    <Text
                        numberOfLines={2}
                        style={{
                            fontSize: scale(14),
                            color: '#000'
                        }}>
                        {data?.title}
                    </Text>
                    <HStack>
                        <Progress
                            bg="coolGray.100"
                            _filledTrack={{
                                bg:
                                    data?.process >= 100
                                        ? 'lime.300'
                                        : 'orange.300'
                            }}
                            value={data?.process}
                            w="80%"
                            style={{ marginVertical: scale(10) }}
                        />
                        <Text
                            ml="2"
                            style={{
                                fontSize: scale(10),
                                color: '#6C746E'
                            }}>
                            {data?.process}%
                        </Text>
                    </HStack>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 5
                        }}>
                        <Book stroke="#6C746E" width={18} height={18} />
                        <Text
                            numberOfLines={2}
                            style={{
                                fontSize: scale(13),
                                color: '#6C746E',
                                marginLeft: scale(4)
                            }}>
                            {data?.total_lectures} bài học
                        </Text>
                    </View>
                </Box>
            </View>
        </Pressable>
    )
}

export default HistoryItem
