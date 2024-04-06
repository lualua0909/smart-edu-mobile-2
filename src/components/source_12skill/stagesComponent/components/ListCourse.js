import { showToast } from 'app/atoms'
import { COLORS, DATA_FAKE_12_SKILL, ROUTES } from 'app/constants'
import React from 'react'

import { useNavigation } from '@react-navigation/native'
import { Dimensions, FlatList, TouchableOpacity } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'

import { RenderColorStage } from '../../renderColorRestult'

const { width, height } = Dimensions.get('screen')

const ListCourse = ({ dataStage }) => {
    const navigation = useNavigation()
    const handleClickCourse = item => {
        if (!item.isOpen)
            return showToast({
                title: 'Vui lòng hoàn thành khóa học trước đó',
                placement: 'top'
            })
        navigation.navigate(ROUTES.CourseInfo2, { id: 149 })
    }
    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                key={item.id}
                onPress={() => handleClickCourse(item)}
                style={[
                    styles.view_item,
                    {
                        backgroundColor: item.isOpen
                            ? RenderColorStage(dataStage.id)
                            : 'rgba(224, 244, 244, 0.4)'
                    }
                ]}>
                <Text
                    style={[
                        styles.text_item,
                        {
                            color: item.isOpen
                                ? COLORS.colorWhite
                                : COLORS.colorBlack
                        }
                    ]}>
                    {item.title}
                </Text>
            </TouchableOpacity>
        )
    }
    return (
        <View style={styles.container}>
            <FlatList
                keyExtractor={(_, index) => index.toString()}
                data={dataStage?.children || []}
                renderItem={renderItem}
                onEndReachedThreshold={0.5}
                initialNumToRender={10}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}

export default ListCourse

const styles = StyleSheet.create({
    container: {
        width: width,
        paddingHorizontal: 20,
        paddingVertical: 50
    },
    view_item: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginVertical: 10,
        backgroundColor: 'red',
        width: width - 40,
        borderRadius: 15
    },
    text_item: {
        color: COLORS.colorWhite,
        fontSize: 15,
        fontWeight: '500'
    }
})
