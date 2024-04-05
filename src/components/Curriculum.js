import { useGlobalState } from 'app/Store'
import { Text } from 'app/atoms'
import { scale } from 'app/helpers/responsive'
import { animateNextTransition } from 'app/helpers/utils'
import React, { useState } from 'react'

import { Pressable, View } from 'react-native'
import { CheckCircle } from 'react-native-feather'

import { Badge, ChevronDownIcon, ChevronUpIcon } from 'native-base'

const Curriculum = ({ data, navigateToLesson }) => {
    const [isExpand, setIsExpand] = useState(false)
    const [finishedLectures] = useGlobalState('finishedLectures')
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
                    justifyContent: 'space-between'
                }}>
                <Text
                    style={{
                        fontSize: scale(13),
                        flex: 1,
                        color: '#000'
                    }}>
                    {data?.name}
                </Text>
                {isExpand ? (
                    <ChevronUpIcon size="3" />
                ) : (
                    <ChevronDownIcon size="3" />
                )}
            </Pressable>
            {isExpand &&
                data?.lectures?.map((item, index) => {
                    const isFinished = finishedLectures?.find(
                        i => i?.id === item?.id
                    )
                    return (
                        <View
                            key={index}
                            style={{
                                paddingVertical: scale(9),
                                paddingHorizontal: scale(15),
                                backgroundColor: isFinished ? '#fff' : '#eee'
                            }}>
                            <Pressable
                                onPress={
                                    isFinished
                                        ? () => navigateToLesson(item?.id)
                                        : null
                                }>
                                <Text
                                    style={{
                                        fontSize: scale(13),
                                        color: isFinished ? '#000' : '#b6b6b6'
                                    }}>
                                    {isFinished ? (
                                        <CheckCircle
                                            stroke="#007739"
                                            width={14}
                                            height={14}
                                        />
                                    ) : null}{' '}
                                    {item?.name}{' '}
                                    {item?.trial ? (
                                        <Badge
                                            colorScheme="success"
                                            variant="outline">
                                            Học thử
                                        </Badge>
                                    ) : null}
                                </Text>
                            </Pressable>
                            <View
                                style={{
                                    width: '100%',
                                    height: 1,
                                    backgroundColor: '#F0F0F0',
                                    position: 'absolute',
                                    bottom: 0,
                                    left: scale(15)
                                }}
                            />
                        </View>
                    )
                })}
        </View>
    )
}

export default Curriculum
