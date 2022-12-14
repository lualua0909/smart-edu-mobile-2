import React, { useState, useEffect } from 'react'
import { View, Pressable, ScrollView } from 'react-native'
import { Text } from 'native-base'
import { SvgXml } from 'react-native-svg'
import { scale } from 'app/helpers/responsive'
import { toRelativeTime } from 'app/helpers/utils'
import { svgWhiteBook } from 'assets/svg'
import Axios from 'app/Axios'
import { DetailSkeleton } from 'app/atoms'

const NotificationDetail = ({ route, navigation }) => {
    const { notifyId } = route.params
    const [data, setData] = useState()
    const [loading, setLoading] = useState(true)

    const fetch = () => {
        setLoading(true)
        Axios.get('notifies/get-info/' + notifyId)
            .then((res) => {
                if (res.data.status === 200) {
                    setData(res.data.data)
                }
            })
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        if (notifyId) {
            fetch()
        }
    }, [notifyId])

    if (loading) {
        return <DetailSkeleton />
    }

    return (
        <View style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ paddingTop: scale(24) }}>
                <View
                    style={{
                        width: scale(48),
                        height: scale(48),
                        borderRadius: scale(48),
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#52B553',
                        alignSelf: 'center',
                    }}
                >
                    <SvgXml
                        xml={svgWhiteBook}
                        width={scale(27)}
                        height={scale(27)}
                    />
                </View>
                <View style={{ paddingHorizontal: scale(16) }}>
                    <Text
                        style={{
                            marginTop: scale(16),

                            fontSize: scale(28),
                            color: '#1D1D1D',
                        }}
                    >
                        {data?.title}
                    </Text>
                    <Text
                        style={{
                            marginTop: scale(8),

                            fontSize: scale(14),
                            color: '#6C746E',
                        }}
                    >
                        {toRelativeTime(data?.created_at)}
                    </Text>
                </View>
                <View style={{ padding: scale(16) }}>
                    <Text
                        style={{
                            fontSize: scale(16),
                            color: '#222',
                        }}
                    >
                        {data?.content}
                    </Text>
                    {data?.link ? (
                        <View
                            style={{
                                flexDirection: 'row',
                                alignSelf: 'center',
                                marginTop: scale(16),
                            }}
                        >
                            <Pressable
                                style={{
                                    paddingVertical: scale(10),
                                    borderWidth: 1,
                                    borderColor: '#52B553',
                                    backgroundColor: '#52B553',
                                    borderRadius: scale(10),
                                    paddingHorizontal: scale(13),
                                }}
                                onPress={() => {
                                    if (
                                        data?.link?.includes('course-details')
                                    ) {
                                        const courseId =
                                            data?.link?.split('/')[1]
                                        if (courseId) {
                                            navigation.navigate('CourseInfo', {
                                                id: courseId,
                                            })
                                        }
                                    }
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: scale(14),
                                        color: '#fff',
                                        textAlign: 'center',
                                    }}
                                >
                                    Truy cập vào khóa học
                                </Text>
                            </Pressable>
                        </View>
                    ) : null}
                </View>
            </ScrollView>
        </View>
    )
}

export default NotificationDetail
