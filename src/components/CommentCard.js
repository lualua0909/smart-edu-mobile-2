import { Avatar, Rate } from 'app/atoms'
import { scale } from 'app/helpers/responsive'
import { toRelativeTime } from 'app/helpers/utils'
import React, { useState } from 'react'

import LinearGradient from 'react-native-linear-gradient'

import { Box, HStack, Pressable, Spacer, Text, VStack, View } from 'native-base'

const CommentCard = ({ data, isReply, isTeacher }) => {
    const [readMore, setReadMore] = useState(false)

    const toggle = () => {
        setReadMore(!readMore)
    }

    const fullname = `${data?.first_name} ${data?.last_name}`
    return (
        <Box
            borderBottomWidth="1"
            _dark={{
                borderColor: 'muted.50'
            }}
            borderColor="muted.200"
            py="2">
            <VStack>
                <HStack space={[2, 3]} justifyContent="space-between">
                    <Avatar size={50} userId={data?.id} name={fullname} />
                    <VStack>
                        <Text
                            _dark={{
                                color: 'warmGray.50'
                            }}
                            color="coolGray.800"
                            bold>
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
                    <Spacer />
                    <Text
                        fontSize="2xs"
                        _dark={{
                            color: 'warmGray.50'
                        }}
                        color="coolGray.800"
                        alignSelf="flex-start">
                        {toRelativeTime(data?.rating_date)}
                    </Text>
                </HStack>

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
                                numberOfLines={readMore ? null : 2}
                                style={{
                                    marginTop: scale(8),
                                    fontSize: 14
                                }}
                                color="coolGray.600"
                                _dark={{
                                    color: 'warmGray.200'
                                }}>
                                {data?.rating_content}
                            </Text>
                        </Pressable>
                    </View>
                </View>
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
        </Box>
    )
}

export default CommentCard
