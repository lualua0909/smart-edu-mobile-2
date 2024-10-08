import axios from 'app/Axios'
import { Avatar, Center, NoDataAnimation, Text, VStack } from 'app/atoms'
import { scale } from 'app/helpers/responsive'
import { animateNextTransition } from 'app/helpers/utils'
import React, { useEffect, useState } from 'react'

import { Pressable, View } from 'react-native'
import {
    BookOpen,
    Bookmark,
    Briefcase,
    ChevronDown,
    ChevronUp
} from 'react-native-feather'

const TeacherTab = ({ mentorId, setTeacherName }) => {
    const [data, setData] = useState()

    useEffect(() => {
        if (mentorId) {
            axios
                .get(`users/get-mentor-info/${mentorId}`)
                .then(res => {
                    return res?.data
                })
                .then(data => {
                    setData(data)
                    setTeacherName(
                        `${data?.mentor?.first_name} ${data?.mentor?.last_name}`
                    )
                })
        }
    }, [mentorId])

    if (!data) {
        return <NoDataAnimation />
    }

    return (
        <>
            <Center style={{ marginTop: scale(10) }}>
                <Avatar
                    size={100}
                    userId={mentorId}
                    name={`${data?.mentor?.first_name} ${data?.mentor?.last_name}`}
                />
            </Center>
            <View
                style={{
                    marginTop: scale(10),
                    alignSelf: 'center'
                }}>
                <Text
                    bold
                    style={{
                        fontSize: scale(24),
                        color: '#0E564D',
                        alignSelf: 'center',
                        paddingVertical: scale(10)
                    }}>
                    {`${data?.mentor?.first_name} ${data?.mentor?.last_name}`}
                </Text>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: scale(10),
                        width: '85%'
                    }}>
                    <Briefcase
                        stroke="#1f1f1f"
                        width={scale(16)}
                        height={scale(16)}
                    />
                    <Text
                        style={{
                            marginLeft: scale(10),
                            fontSize: scale(14),
                            color: '#202020'
                        }}>
                        {data?.mentor?.position}
                    </Text>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: scale(8)
                    }}>
                    <Bookmark
                        stroke="#1f1f1f"
                        width={scale(16)}
                        height={scale(16)}
                    />
                    <Text
                        style={{
                            marginLeft: scale(10),
                            fontSize: scale(14),
                            color: '#202020'
                        }}>
                        {data?.mentor?.department}
                    </Text>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: scale(8)
                    }}>
                    <BookOpen
                        stroke="#1f1f1f"
                        width={scale(16)}
                        height={scale(16)}
                    />
                    <Text
                        style={{
                            marginLeft: scale(10),
                            fontSize: scale(14),
                            color: '#202020'
                        }}>
                        {data?.mentor?.courses?.length || 0} khóa học
                    </Text>
                </View>
            </View>
            <View style={{ marginTop: scale(10) }}>
                <ExperienceItem
                    title="Trình độ chuyên môn"
                    data={data?.qualifications}
                />
                <ExperienceItem
                    title="Kinh nghiệm làm việc"
                    data={data?.workExperience}
                />
                <ExperienceItem
                    title="Kinh nghiệm giảng dạy"
                    data={data?.teachingExperience}
                />
            </View>
        </>
    )
}

export default TeacherTab

const ExperienceItem = ({ title, data }) => {
    const [isExpand, setIsExpand] = useState(false)

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
                        fontSize: scale(14),
                        flex: 1,
                        color: '#000'
                    }}>
                    {title}
                </Text>
                {isExpand ? (
                    <ChevronUp color="gray" />
                ) : (
                    <ChevronDown color="gray" />
                )}
            </Pressable>
            <VStack space={4} style={{ padding: isExpand ? scale(15) : 1 }}>
                {isExpand &&
                    data?.map((item, index) => (
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                            <View
                                style={{
                                    width: scale(6),
                                    height: scale(6),
                                    borderRadius: scale(6),
                                    backgroundColor: '#52B553',
                                    marginRight: scale(5)
                                }}
                            />
                            <Text
                                style={{
                                    fontSize: scale(16),
                                    lineHeight: scale(20),
                                    color: '#6C746E'
                                }}>
                                {item.content}
                            </Text>
                        </View>
                    ))}
            </VStack>
        </View>
    )
}
