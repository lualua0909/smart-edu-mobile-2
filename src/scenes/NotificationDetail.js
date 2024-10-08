import axios from 'app/Axios'
import { Center, DetailSkeleton, Text } from 'app/atoms'
import { scale } from 'app/helpers/responsive'
import { toRelativeTime } from 'app/helpers/utils'
import React, { useEffect, useState } from 'react'

import LottieView from 'lottie-react-native'
import { ScrollView, View } from 'react-native'

import animationBanner from 'assets/animations/online-learning.json'

const NotificationDetail = ({ route }) => {
    const { notifyId } = route.params
    const [data, setData] = useState()
    const [loading, setLoading] = useState(true)

    const fetch = () => {
        setLoading(true)
        axios
            .get('notifies/get-info/' + notifyId)
            .then(res => {
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
            <ScrollView contentContainerStyle={{ paddingTop: scale(40) }}>
                <Center>
                    <LottieView
                        source={animationBanner}
                        autoPlay
                        loop
                        style={{
                            height: 150
                        }}
                    />
                </Center>
                <View style={{ paddingHorizontal: scale(16) }}>
                    <Text
                        bold
                        style={{
                            paddingTop: 40,
                            fontSize: scale(20),
                            color: '#6C746E'
                        }}>
                        {data?.title}
                    </Text>
                    <Text
                        style={{
                            marginTop: scale(8),
                            fontSize: scale(12),
                            color: '#6C746E'
                        }}>
                        {toRelativeTime(data?.created_at)}
                    </Text>
                </View>
                <View style={{ padding: scale(16) }}>
                    <Text
                        style={{
                            fontSize: scale(14),
                            color: '#222',
                            lineHeight: scale(20)
                        }}>
                        {data?.content}
                    </Text>
                    {/* {data?.link ? (
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'center',
                marginTop: scale(16),
              }}>
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
                  if (data?.link?.includes('course-details')) {
                    const courseId = data?.link?.split('/')[1];
                    if (courseId) {
                      navigation.navigate('CourseInfo', {
                        id: courseId,
                      });
                    }
                  }
                }}>
                <Text
                  style={{
                    fontSize: scale(14),
                    color: '#fff',
                    textAlign: 'center',
                  }}>
                  Truy cập vào khóa học
                </Text>
              </Pressable>
            </View>
          ) : null} */}
                </View>
            </ScrollView>
        </View>
    )
}

export default NotificationDetail
