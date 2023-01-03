import Axios from 'app/Axios'
import { NoData } from 'app/atoms'
import CommentCard from 'app/components/CommentCard'
import { scale } from 'app/helpers/responsive'
import React, { useEffect, useState } from 'react'

import { Pressable, View } from 'react-native'

import { ChevronDownIcon } from 'native-base'
import { Text } from 'native-base'

const RPP = 4

const CommentTab = ({ courseId }) => {
    const [data, setData] = useState()
    const [page, setPage] = useState(0)

    const fetchData = () => {
        Axios.get(`course-comment-ratings/${courseId}/${page * RPP}`)
            .then(res => {
                return res.data.data
            })
            .then(_data => {
                Array.isArray(data)
                    ? setData([...data, ..._data])
                    : setData(_data)
            })
    }

    useEffect(() => {
        if (courseId) {
            fetchData()
        }
    }, [courseId, page])

    if (data?.length === 0) {
        return <NoData />
    }

    return (
        <View>
            <View style={{ marginTop: scale(16) }}>
                {data?.map((item, index) => (
                    <CommentCard rate={5} hideReply data={item} key={index} />
                ))}
            </View>
            <Pressable
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    alignSelf: 'center',
                    marginTop: scale(24)
                }}
                onPress={() => setPage(page + 1)}>
                <Text
                    style={{
                        fontSize: scale(14),
                        color: '#52B553'
                    }}>
                    Xem thêm nhận xét
                </Text>
                <ChevronDownIcon
                    size={scale(24)}
                    style={{
                        marginLeft: scale(4),
                        color: '#52B553'
                    }}
                />
            </Pressable>
        </View>
    )
}

export default CommentTab
