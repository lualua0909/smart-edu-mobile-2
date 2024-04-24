import axios from 'app/Axios'
import { NoData, Text } from 'app/atoms'
import { COLORS } from 'app/constants'
import { scale } from 'app/helpers/responsive'
import React, { useEffect, useState } from 'react'

import { View } from 'react-native'
import { Check } from 'react-native-feather'

const Benefit = ({ courseId, longDes }) => {
    const [data, setData] = useState()

    useEffect(() => {
        if (courseId) {
            axios
                .get(`course-benefits/${courseId}`)
                .then(res => {
                    return res.data
                })
                .then(data => {
                    setData(data)
                })
        }
    }, [courseId])

    return (
        <View style={{ marginTop: 10 }}>
            {longDes?.map((text, index) => (
                <View
                    style={{
                        marginHorizontal: 10,
                        flexDirection: 'row'
                    }}
                    key={index}>
                    <Text
                        style={{
                            flex: 1,
                            fontSize: scale(16),
                            color: '#6C746E'
                        }}>
                        {text?.replace(/<[^>]*>?/gm, '')}
                    </Text>
                </View>
            ))}
            {data ? (
                data?.map((item, index) => (
                    <View
                        key={index}
                        style={{
                            flexDirection: 'row',
                            marginTop: scale(8)
                        }}>
                        <Check
                            size={scale(16)}
                            style={{
                                marginHorizontal: 10,
                                marginVertical: 5,
                                color: COLORS.green
                            }}
                        />
                        <Text
                            style={{
                                flex: 1,
                                fontSize: scale(16),
                                paddingTop: scale(2),
                                lineHeight: scale(20),
                                color: '#6C746E'
                            }}>
                            {item?.name}
                        </Text>
                    </View>
                ))
            ) : (
                <NoData />
            )}
        </View>
    )
}

export default Benefit
