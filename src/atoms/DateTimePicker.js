import { Input } from 'app/atoms'
import dayjs from 'dayjs'
import React, { useState } from 'react'

import DateTimePicker from '@react-native-community/datetimepicker'
import { Pressable } from 'react-native'

const CustomDateTimePicker = ({
    date = new Date(),
    mode = 'date',
    onChange,
    inputProps
}) => {
    const [show, setShow] = useState(false)

    const showDatepicker = () => {
        setShow(true)
    }

    return (
        <>
            <Pressable onPress={showDatepicker}>
                <Input
                    w="100%"
                    value={dayjs(date).format('DD/MM/YYYY')}
                    // InputRightElement={
                    //     <Icon
                    //         as={<Ionicons name="ios-calendar-outline" />}
                    //         size={5}
                    //         mr="2"
                    //         color="muted.400"
                    //     />
                    // }
                    {...inputProps}
                />
            </Pressable>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    onChange={(event, selectedDate) => {
                        setShow(false)
                        onChange(event, selectedDate)
                    }}
                />
            )}
        </>
    )
}

export default React.memo(CustomDateTimePicker)
