import React from 'react'
import { View, FlatList } from 'react-native'
import { scale } from 'app/helpers/responsive'
import HistoryItem from 'app/components/HistoryItem'

const ConnectInstructorHistory = () => {
    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <FlatList
                data={[0, 1]}
                renderItem={({ item, index }) => {
                    return <HistoryItem key={index} />
                }}
                keyExtractor={(item) => item.id}
                style={{
                    paddingHorizontal: scale(16),
                    zIndex: 1,
                    paddingTop: scale(10),
                }}
            />
        </View>
    )
}

export default ConnectInstructorHistory
