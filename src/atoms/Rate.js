import { HStack } from 'app/atoms'
import { scale } from 'app/helpers/responsive'
import React, { useEffect, useState } from 'react'

import { Star } from 'react-native-feather'

const Rate = ({ rate = 5, size = 22 }) => {
    const [rates, setRates] = useState([1, 1, 1, 1, 1])

    useEffect(() => {
        const arr = [1, 1, 1, 1, 1]
        arr.fill(0, rate, 5)
        setRates(arr)
    }, [rate])

    return (
        <HStack space={1} justifyContent="center">
            {rates.map((rate, index) => (
                <Star
                    key={index}
                    stroke="orange"
                    fill={rate ? 'orange' : '#fff'}
                    width={scale(size)}
                    height={scale(size)}
                />
            ))}
        </HStack>
    )
}

export default Rate
