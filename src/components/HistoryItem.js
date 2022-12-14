import { ROUTES } from 'app/constants'
import { scale } from 'app/helpers/responsive'
import { svgCircle, svgLineDashVertical } from 'assets/svg'
import dayjs from 'dayjs'
import React from 'react'

import { useNavigation } from '@react-navigation/native'
import { Pressable, View } from 'react-native'
import { Book } from 'react-native-feather'
import { SvgXml } from 'react-native-svg'

import { Box, Progress } from 'native-base'
import { Text } from 'native-base'

const HistoryItem = ({ data }) => {
    const navigation = useNavigation()
    const year = data?.end_date !== '' ? dayjs(data?.end_date).get('year') : ''
    const month =
        data?.end_date !== '' ? dayjs(data?.end_date).get('month') : ''
    const day = data?.end_date !== '' ? dayjs(data?.end_date).get('date') : ''

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
                                    fontSize: scale(16),
                                    color: '#000000',
                                    textAlign: 'right'
                                }}>
                                Ng??y {day}
                            </Text>
                        ) : null}
                        {month ? (
                            <Text
                                style={{
                                    fontSize: scale(16),
                                    color: '#6C746E',
                                    textAlign: 'right'
                                }}>
                                Th??ng {month}
                            </Text>
                        ) : null}
                        {year ? (
                            <Text
                                style={{
                                    fontSize: scale(16),
                                    color: '#6C746E',
                                    textAlign: 'right'
                                }}>
                                {year}
                            </Text>
                        ) : null}
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
                            fontSize: scale(16),
                            color: '#000'
                        }}>
                        {data?.title}
                    </Text>
                    <Progress
                        bg="coolGray.100"
                        _filledTrack={{
                            bg: 'lime.500'
                        }}
                        value={75}
                        mx="4"
                        style={{ marginVertical: scale(10) }}
                    />
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 5
                        }}>
                        <Book stroke="#0E564D" width={18} height={18} />
                        <Text
                            numberOfLines={2}
                            style={{
                                fontSize: scale(14),
                                color: '#6C746E',
                                marginLeft: scale(4)
                            }}>
                            {data?.total_lectures} b??i h???c
                        </Text>
                    </View>
                </Box>
            </View>
        </Pressable>
    )
}

export default HistoryItem
