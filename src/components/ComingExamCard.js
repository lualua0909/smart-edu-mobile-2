import { Text } from 'app/atoms'
import { scale } from 'app/helpers/responsive'
import dayjs from 'dayjs'
import React from 'react'

import Countdown from 'react-countdown'
import { View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

const ComingExam = ({}) => {
    const renderer = ({
        total,
        days,
        hours,
        minutes,
        seconds,
        milliseconds,
        completed
    }) => {
        if (completed) {
            // Render a completed state
            return (
                <Wrapper onClick={redirect}>
                    <div className="label" style={{ margin: '0 auto' }}>
                        {text}
                    </div>
                </Wrapper>
            )
        } else {
            return (
                <LinearGradient
                    colors={['#0EBF46', '#087676']}
                    start={{ x: 1, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={{
                        height: '100%',
                        flexDirection: 'row',
                        borderRadius: scale(5),
                        width: '40%',
                        justifyContent: 'center'
                    }}>
                    <View
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginHorizontal: scale(5)
                        }}>
                        <Text
                            style={{
                                fontSize: scale(16),
                                color: '#fff'
                            }}>
                            {days}
                        </Text>
                        <Text
                            style={{
                                fontSize: scale(10),
                                color: '#fff'
                            }}>
                            Ngày
                        </Text>
                    </View>
                    <View
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginHorizontal: scale(5)
                        }}>
                        <Text
                            style={{
                                fontSize: scale(16),
                                color: '#fff'
                            }}>
                            {hours}
                        </Text>
                        <Text
                            style={{
                                fontSize: scale(10),
                                color: '#fff'
                            }}>
                            Giờ
                        </Text>
                    </View>
                    <View
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginHorizontal: scale(5)
                        }}>
                        <Text
                            style={{
                                fontSize: scale(16),
                                color: '#fff'
                            }}>
                            {minutes}
                        </Text>
                        <Text
                            style={{
                                fontSize: scale(10),
                                color: '#fff'
                            }}>
                            Phút
                        </Text>
                    </View>
                    <View
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginHorizontal: scale(5)
                        }}>
                        <Text
                            style={{
                                fontSize: scale(16),
                                color: '#fff'
                            }}>
                            {seconds}
                        </Text>
                        <Text
                            style={{
                                fontSize: scale(10),
                                color: '#fff'
                            }}>
                            Giây
                        </Text>
                    </View>
                </LinearGradient>
            )
        }
    }

    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: scale(73),
                marginTop: scale(24)
            }}>
            <Countdown
                date={dayjs().add(7, 'day')}
                renderer={({
                    total,
                    days,
                    hours,
                    minutes,
                    seconds,
                    milliseconds,
                    completed
                }) =>
                    renderer({
                        total,
                        days,
                        hours,
                        minutes,
                        seconds,
                        milliseconds,
                        completed
                    })
                }
            />
            <View
                style={{
                    flex: 1,
                    height: '100%',
                    marginLeft: scale(14),
                    justifyContent: 'space-between'
                }}>
                <Text
                    style={{
                        fontSize: scale(16),
                        color: '#6C746E'
                    }}>
                    Thi tin học đầu vào
                </Text>
                <Text
                    style={{
                        fontSize: scale(14),
                        color: '#6C746E'
                    }}>
                    Thời gian: 45 phút
                </Text>
                <Text
                    numberOfLines={1}
                    style={{
                        fontSize: scale(14),
                        color: '#6C746E'
                    }}>
                    Bắt đầu lúc 09:00 - 20.12.2021
                </Text>
            </View>
        </View>
    )
}

export default ComingExam
