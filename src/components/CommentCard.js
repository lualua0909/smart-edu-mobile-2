import { Avatar, Rate } from 'app/atoms'
import { scale } from 'app/helpers/responsive'
import { toRelativeTime } from 'app/helpers/utils'
import { svgReply } from 'assets/svg'
import React, { useState } from 'react'

import { Pressable, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { SvgXml } from 'react-native-svg'

import { Text } from 'native-base'
import { HStack } from 'native-base'

const CommentCard = ({ data, isReply, isTeacher, hideReply, index }) => {
    const [readMore, setReadMore] = useState(false)

    const toggle = () => {
        setReadMore(!readMore)
    }

    const fullname = `${data?.first_name} ${data?.last_name}`

    return (
        <View style={{ paddingLeft: scale(isReply ? 8 : 0) }} key={index}>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                <Avatar size={50} userId={data?.id} name={fullname} />
                <View
                    style={{
                        marginLeft: scale(16),
                        flex: 1
                    }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                        <Text
                            style={{
                                fontSize: scale(16),
                                color: '#202020'
                            }}>
                            {fullname}
                        </Text>
                        {isTeacher && (
                            <LinearGradient
                                colors={['#079A96', '#00BD67']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={{
                                    marginLeft: 16,
                                    paddingVertical: scale(2),
                                    paddingHorizontal: scale(4),
                                    borderTopLeftRadius: scale(10),
                                    borderBottomRightRadius: scale(10)
                                }}>
                                <Text
                                    style={{
                                        fontSize: scale(12),
                                        color: '#F4F5F7'
                                    }}>
                                    Giảng viên
                                </Text>
                            </LinearGradient>
                        )}
                    </View>
                    <HStack
                        space={3}
                        style={{
                            marginTop: scale(8)
                        }}>
                        {data?.rate && <Rate rate={data?.rate} />}
                        <Text
                            style={{
                                fontSize: scale(13),
                                color: '#7B7B7B'
                            }}>
                            {toRelativeTime(data?.created_at)}
                        </Text>
                    </HStack>
                </View>
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                {isReply && <View style={{ width: scale(50) }} />}
                <View
                    style={{
                        flex: 1
                    }}>
                    <Pressable onPress={toggle}>
                        <Text
                            numberOfLines={readMore ? null : 3}
                            style={{
                                marginTop: scale(8),

                                fontSize: scale(16),
                                color: '#202020'
                            }}>
                            {data?.rating_content}
                        </Text>
                    </Pressable>
                </View>
            </View>
            {hideReply ||
                (!isReply && (
                    <Pressable
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: scale(10)
                        }}>
                        <SvgXml
                            xml={svgReply}
                            width={scale(24)}
                            height={scale(24)}
                        />
                        <Text
                            style={{
                                marginLeft: scale(8),

                                fontSize: scale(14),
                                color: '#0075FF'
                            }}>
                            Trả lời
                        </Text>
                    </Pressable>
                ))}
        </View>
    )
}

export default CommentCard
