import { Avatar, Card, HStack, Rate, Text, VStack } from 'app/atoms'
import { scale } from 'app/helpers/responsive'
import { toRelativeTime } from 'app/helpers/utils'
import React, { useState } from 'react'

import { Pressable, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

const CommentCard = ({ data, isReply, isTeacher }) => {
    const [readMore, setReadMore] = useState(false)

    const toggle = () => {
        setReadMore(!readMore)
    }

    const fullname = `${data?.first_name} ${data?.last_name}`
    return (
        <VStack space={3} style={{ marginBottom: 10 }}>
            <HStack space={10}>
                <Avatar size={50} userId={data?.id} />
                <VStack>
                    <Text bold>
                        {fullname}
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
                    </Text>
                    {data?.rate && <Rate rate={data?.rate} size={16} />}
                </VStack>
                <Text>{toRelativeTime(data?.rating_date)}</Text>
            </HStack>

            <Card
                shadow
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 10
                }}>
                {/* {isReply && <View style={{ width: scale(50) }} />} */}
                <View
                    style={{
                        flex: 1
                    }}>
                    <Pressable onPress={toggle}>
                        <Text
                            style={{
                                marginTop: scale(8),
                                fontSize: 14
                            }}>
                            {data?.rating_content}
                        </Text>
                    </Pressable>
                </View>
            </Card>
            {/* <Pressable
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
                </Pressable> */}
        </VStack>
    )
}

export default CommentCard
