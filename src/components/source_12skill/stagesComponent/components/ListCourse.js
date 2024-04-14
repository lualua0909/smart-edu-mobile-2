import { showToast } from 'app/atoms'
import { COLORS, ROUTES } from 'app/constants'
import React from 'react'

import { useNavigation } from '@react-navigation/native'
import {
    Dimensions,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native'

import { RenderColorStage } from '../../renderColorRestult'

const { width } = Dimensions.get('screen')

const ListCourse = ({ dataStage }) => {
    const navigation = useNavigation()

    const handleClickCourse = (item, isOpen) => {
        console.log('item.sub_course.id = ', item.sub_course.id)
        if (!isOpen)
            return showToast({
                title: 'Vui lòng hoàn thành khóa học trước đó',
                placement: 'top'
            })

        navigation.navigate(ROUTES.CourseInfo2, { id: item.sub_course.id })
    }

    const renderItem = ({ item, index }) => {
        let isOpen = true
        if (index > 0) {
            isOpen = dataStage.children[index - 1].sub_course.process === 100
        }

        return (
            <TouchableOpacity
                key={item.id}
                onPress={() => handleClickCourse(item, isOpen)}
                style={[
                    styles.view_item,
                    {
                        backgroundColor: isOpen
                            ? RenderColorStage(dataStage.id)
                            : 'rgba(224, 244, 244, 0.4)'
                    }
                ]}>
                <Text
                    style={[
                        styles.text_item,
                        {
                            color: isOpen
                                ? COLORS.colorWhite
                                : COLORS.colorBlack
                        }
                    ]}>
                    {item.sub_course.title}
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
        paddingVertical: 15,
        paddingHorizontal: 15,
        marginVertical: 10,
        backgroundColor: 'red',
        width: width - 40,
        borderRadius: 10
    },
    text_item: {
        color: COLORS.colorWhite,
        fontSize: 15,
        fontWeight: '500'
    }
})
