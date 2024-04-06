import CourseItem from 'app/components/CourseItem'
import { DATA_FAKE_12_SKILL } from 'app/constants'
import React from 'react'

import { FlatList, Text, TouchableOpacity, View } from 'react-native'

const Course12SkillList = () => {
    const data = DATA_FAKE_12_SKILL
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
