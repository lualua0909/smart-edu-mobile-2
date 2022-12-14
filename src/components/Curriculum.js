import React, { useState } from 'react'
import { View, Pressable } from 'react-native'
import { scale } from 'app/helpers/responsive'
import { animateNextTransition } from 'app/helpers/utils'
import { ChevronDownIcon, ChevronUpIcon, Text } from 'native-base'
import { useGlobalState } from 'app/Store'
import { CheckCircle } from 'react-native-feather'

const Curriculum = ({ data, navigateToLesson }) => {
    const [isExpand, setIsExpand] = useState(false)
    const [finishedLectures, setFinishedLectures] =
        useGlobalState('finishedLectures')

    const onSwitchExpand = () => {
        animateNextTransition()
        setIsExpand(!isExpand)
    }

    return (
        <View>
            <Pressable
                onPress={onSwitchExpand}
                style={{
                    paddingVertical: scale(9),
                    paddingHorizontal: scale(15),
                    backgroundColor: '#E6F4EA',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <Text
                    style={{
                        fontSize: scale(16),
                        flex: 1,
                        color: '#000',
                    }}
                >
                    {data?.name}
                </Text>
                {isExpand ? (
                    <ChevronUpIcon size="6" />
                ) : (
                    <ChevronDownIcon size="6" />
                )}
            </Pressable>
            {isExpand &&
                data?.lectures?.map((item, index) => {
                    const isFinished = finishedLectures?.find(
                        (i) => i?.id === item?.id
                    )
                    return (
                        <View
                            key={index}
                            style={{
                                paddingVertical: scale(9),
                                paddingHorizontal: scale(15),
                                backgroundColor: isFinished ? '#fff' : '#eee',
                            }}
                        >
                            <Pressable
                                onPress={
                                    isFinished
                                        ? () => navigateToLesson(item?.id)
                                        : null
                                }
                            >
                                <Text
                                    style={{
                                        fontSize: scale(16),
                                        color: isFinished ? '#000' : '#b6b6b6',
                                    }}
                                >
                                    {isFinished ? (
                                        <CheckCircle
                                            style={{
                                                color: '#007739',
                                            }}
                                            size={14}
                                        />
                                    ) : null}{' '}
                                    {item?.name}
                                </Text>
                            </Pressable>
                            <View
                                style={{
                                    width: '100%',
                                    height: 1,
                                    backgroundColor: '#F0F0F0',
                                    position: 'absolute',
                                    bottom: 0,
                                    left: scale(15),
                                }}
                            />
                        </View>
                    )
                })}
        </View>
    )
}

export default Curriculum
