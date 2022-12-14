import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { scale } from 'app/helpers/responsive'
import { COLORS } from 'app/constants'
import { CheckIcon } from 'native-base'
import Axios from 'app/Axios'
import { NoData } from 'app/atoms'

const Benefit = ({ courseId }) => {
    const [data, setData] = useState()

    useEffect(() => {
        if (courseId) {
            Axios.get(`course-benefits/${courseId}`)
                .then((res) => {
                    return res.data
                })
                .then((data) => {
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
                marginTop: scale(8),
            }}
        >
            <CheckIcon
                size={scale(16)}
                style={{
                    marginHorizontal: 10,
                    marginVertical: 5,
                    color: COLORS.green,
                }}
            />
            <Text
                style={{
                    flex: 1,

                    color: '#202020',
                    fontSize: scale(16),
                }}
            >
                {item?.name}
            </Text>
        </View>
    ))
}

export default Benefit
