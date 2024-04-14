import axios from 'app/Axios'
import { LoadingAnimation } from 'app/atoms'
import CourseItem from 'app/components/CourseItem'
import React from 'react'

import { FlatList, View } from 'react-native'

const Course12SkillList = () => {
    const [data, setData] = React.useState()
    const [isLoading, setIsLoading] = React.useState()
    const getData = () => {
        setIsLoading(true)
        axios
            .post(`public-courses/paging-by-filter/0`, {
                course_groups: [],
                order_by: 'asc',
                positions: [],
                search: '12 KHÓA HỌC KỸ NĂNG PHÁT TRIỂN SỰ NGHIỆP'
            })
            .then(res => {
                if (res.data.status === 200) {
                    const list = res.data?.data
                    setData(list)
                }
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    React.useEffect(() => {
        getData()
    }, [])
    // const { loading, error, data } = useQuery(GET_ROADMAP_PRETEST)
    if (isLoading)
        return (
            <LoadingAnimation
                style={{
                    marginTop: 20
                }}
            />
        )
    // if()
    // console.log('🚀 ~ Course12SkillList ~ data:', data.RoadmapPretest)
    return (
        <View>
            <FlatList
                data={data || []}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <CourseItem
                        isHorizontal
                        fullWidth
                        item={item}
                        index={index}
                    />
                )}
                contentContainerStyle={{
                    paddingLeft: 16,
                    paddingRight: 16,
                    paddingBottom: 50
                }}
                style={{ margin: 16 }}
                // onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
                initialNumToRender={10}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}

export default Course12SkillList
