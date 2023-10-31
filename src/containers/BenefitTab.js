import axios from 'app/Axios'
import { NoData } from 'app/atoms'
import { COLORS } from 'app/constants'
import { scale } from 'app/helpers/responsive'
import React, { useEffect, useState } from 'react'

import { Check } from 'react-native-feather'

import { Text, View } from 'native-base'

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
            {longDes?.map(text => (
                <View
                    style={{
                        marginHorizontal: 10,
                        flexDirection: 'row'
                    }}>
                    <Text
                        style={{
                            flex: 1,
                            fontSize: scale(16)
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
                                lineHeight: scale(20)
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
