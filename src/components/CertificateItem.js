import React from 'react'
import { View } from 'react-native'
import { scale } from 'app/helpers/responsive'
import { COLORS, EXCERTIFICATE_IMG_PATH } from 'app/constants'

import { Text, Image } from 'native-base'
import chungchiSE from 'assets/images/chung-chi-SE.png'
import { toRelativeTime } from 'app/helpers/utils'

const CourseItem = ({ data, index }) => {
    return (
        <View
            key={index}
            style={{
                width: '100%',
                borderWidth: 1,
                borderColor: '#d9d9d9',
                borderRadius: scale(10),
                borderBottomWidth: scale(6),
                borderBottomColor: COLORS.green,
                marginBottom: 10,
            }}
        >
            <Image
                resizeMode="contain"
                source={{
                    uri: `${EXCERTIFICATE_IMG_PATH}${data?.id}.webp`,
                }}
                fallbackSource={chungchiSE}
                style={{
                    width: '100%',
                    height: scale(150),
                    borderTopLeftRadius: scale(10),
                    borderTopRightRadius: scale(10),
                }}
                defaultSource={require('assets/images/chung-chi-SE.png')}
            />
            <View
                style={{
                    paddingHorizontal: scale(15),
                    paddingVertical: scale(24),
                }}
            >
                <Text
                    numberOfLines={3}
                    style={{
                        fontSize: scale(18),
                        color: '#333',
                    }}
                >
                    {data?.title}
                </Text>
                <Text
                    numberOfLines={1}
                    style={{
                        fontSize: scale(12),
                        color: '#333',
                        marginTop: 10,
                    }}
                >
                    {toRelativeTime(data?.release_date)}
                </Text>
            </View>
        </View>
    )
}

export default CourseItem
