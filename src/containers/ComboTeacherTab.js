import { Avatar, Center, NoDataAnimation, Text } from 'app/atoms'
import { scale } from 'app/helpers/responsive'
import React from 'react'

import { View } from 'react-native'
import { Bookmark, Briefcase } from 'react-native-feather'

const ComboTeacherTab = ({ list }) => {
    if (!list?.length) {
        return <NoDataAnimation />
    }

    return (
        <Center style={{ marginTop: scale(10) }}>
            {list?.map(data => (
                <>
                    <Center style={{ marginTop: scale(10) }}>
                        <Avatar
                            size={100}
                            userId={data?.id}
                            name={`${data?.full_name}`}
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
                            {`${data?.first_name} ${data?.last_name}`}
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
                                {data?.position}
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
                                {data?.job}
                            </Text>
                        </View>
                    </View>
                </>
            ))}
        </Center>
    )
}

export default ComboTeacherTab
