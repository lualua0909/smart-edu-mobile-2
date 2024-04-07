import { NoDataAnimation, Text } from 'app/atoms'
import CourseItem from 'app/components/CourseItem'
import { scale } from 'app/helpers/responsive'
import React from 'react'

import { View } from 'react-native'

const ComboTab = ({ data }) => {
    if (!data) {
        return <NoDataAnimation />
    }

    return (
        <>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: scale(16),
                    marginTop: scale(16)
                }}>
                <Text
                    style={{
                        fontSize: scale(16),
                        color: '#007839',
                        marginLeft: scale(10),
                        paddingTop: scale(2)
                    }}>
                    Đây là khóa học tổng hợp, vui lòng truy cập vào khóa học con
                    để bắt đầu học
                </Text>
            </View>
            <View style={{ margin: scale(14) }}>
                {data?.combo?.map((item, index) => (
                    <CourseItem item={item?.sub_course} index={index} />
                ))}
            </View>
        </>
    )
}

export default React.memo(ComboTab)
