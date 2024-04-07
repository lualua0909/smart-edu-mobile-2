import { Text } from 'app/atoms'
import { COLORS, EXCERTIFICATE_IMG_PATH } from 'app/constants'
import { scale } from 'app/helpers/responsive'
import { toRelativeTime } from 'app/helpers/utils'
import React from 'react'

import { Image, View } from 'react-native'

import chungchiSE from 'assets/images/chung-chi-SE.png'

const CourseItem = ({ data, index }) => {
    return (
        <View
            key={index}
            style={{
                width: '100%',
                borderWidth: 1,
                borderColor: '#d9d9d9',
                borderRadius: scale(5),
                borderBottomWidth: scale(6),
                borderBottomColor: COLORS.green,
                marginBottom: 10
            }}>
            <Image
                resizeMode="contain"
                source={{
                    uri: `${EXCERTIFICATE_IMG_PATH}${data?.id}.webp`
                }}
                fallbackSource={chungchiSE}
                style={{
                    width: '100%',
                    height: 164,
                    backgroundColor: '#f5f5f5'
                }}
                alt="image"
            />
            <View
                style={{
                    paddingHorizontal: scale(15),
                    paddingVertical: scale(15)
                }}>
                <Text
                    numberOfLines={3}
                    style={{
                        fontSize: scale(18),
                        color: '#333'
                    }}>
                    {data?.title}
                </Text>
                <Text
                    numberOfLines={1}
                    style={{
                        fontSize: scale(12),
                        color: '#333'
                    }}>
                    {toRelativeTime(data?.release_date)}
                </Text>
            </View>
        </View>
    )
}

export default CourseItem
