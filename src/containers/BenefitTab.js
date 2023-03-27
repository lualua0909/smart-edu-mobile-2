import axios from 'app/Axios'
import { NoData } from 'app/atoms'
import { COLORS } from 'app/constants'
import { scale } from 'app/helpers/responsive'
import React, { useEffect, useState } from 'react'

import { View } from 'react-native'

import { CheckIcon, Text } from 'native-base'

const Benefit = ({ courseId }) => {
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

    if (!data) {
        return <NoData />
    }

    return data?.map((item, index) => (
        <View
            key={index}
            style={{
                flexDirection: 'row',
                marginTop: scale(8)
            }}>
            <CheckIcon
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
}

export default Benefit
