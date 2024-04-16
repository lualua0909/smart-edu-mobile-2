import { Card, HStack, Text } from 'app/atoms'
import { ROUTES } from 'app/constants'
import { scale } from 'app/helpers/responsive'
import { svgCircle, svgLineDashVertical } from 'assets/svg'
import dayjs from 'dayjs'
import React from 'react'

import { useNavigation } from '@react-navigation/native'
import { Pressable, View } from 'react-native'
import { Book } from 'react-native-feather'
import * as Progress from 'react-native-progress'
import { SvgXml } from 'react-native-svg'

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
                        {day ? (
                            <Text
                                style={{
                                    fontSize: scale(14),
                                    color: '#000000',
                                    textAlign: 'right'
                                }}>
                                Ngày {day}
                            </Text>
                        ) : null}
                        {month ? (
                            <Text
                                style={{
                                    fontSize: scale(14),
                                    color: '#6C746E',
                                    textAlign: 'right'
                                }}>
                                Tháng {month}
                            </Text>
                        ) : null}
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
                <Card
                    shadow
                    style={{
                        padding: 8
                    }}>
                    <Text
                        numberOfLines={2}
                        style={{
                            fontSize: scale(14),
                            color: '#000'
                        }}>
                        {data?.title}
                    </Text>
                    <HStack space={10} style={{ marginTop: 10 }}>
                        {/* <Progress
                            bg="coolGray.100"
                            _filledTrack={{
                                bg:
                                    data?.process >= 100
                                        ? 'lime.300'
                                        : data?.process === 0
                                        ? 'gray.200'
                                        : 'orange.300'
                            }}
                            value={data?.process === 0 ? 100 : data?.process}
                            w="80%"
                            style={{ marginVertical: scale(10) }}
                        /> */}
                        <Progress.Bar
                            progress={data?.process / 100}
                            height={scale(10)}
                            color="green"
                        />
                        <Text
                            bold
                            style={{
                                color: '#6C746E',
                                marginTop: -3
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
                </Card>
            </View>
        </Pressable>
    )
}

export default HistoryItem
