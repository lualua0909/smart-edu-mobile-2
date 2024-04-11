import {
    DraxList,
    DraxProvider,
    DraxViewDragStatus
} from 'app/components/dragdrop'
import { COLORS, DATA_FAKE_12_SKILL, ROUTES } from 'app/constants'
import { svgAdjust } from 'assets/svg'
import _ from 'lodash'
import React from 'react'

import { Dimensions, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { SvgXml } from 'react-native-svg'

const { width, height } = Dimensions.get('screen')
const DragDrop = ({ item: defaultData, setItem, idStages, dataAll }) => {
    const listRef = React.useRef(null)
    return (
        <DraxProvider>
            <View>
                <DraxList
                    ref={listRef}
                    data={defaultData}
                    keyExtractor={item => item.id}
                    horizontal={false}
                    renderItemContent={({ item }, { viewState, hover }) => {
                        return (
                            <View
                                style={[
                                    styles.view_content_children_timeline,
                                    viewState?.dragStatus ===
                                        DraxViewDragStatus.Dragging && hover
                                        ? styles.hover
                                        : undefined
                                ]}>
                                <View style={{ marginRight: 10 }}>
                                    <SvgXml
                                        xml={svgAdjust}
                                        width={20}
                                        height={20}
                                    />
                                </View>

                                <Text
                                    style={[
                                        styles.color_content_timeline,
                                        styles.title_children_timeline
                                    ]}
                                    numberOfLines={2}>
                                    {item.title}
                                </Text>
                            </View>
                        )
                    }}
                    onItemReorder={({ fromIndex, toIndex }) => {
                        const fromOrder = defaultData[fromIndex].order
                        const toOrder = defaultData[toIndex].order
                        const newData = defaultData
                        newData[fromIndex].order = toOrder
                        newData[toIndex].order = fromOrder
                        const indexStages = _.findIndex(dataAll, {
                            id: idStages
                        })
                        dataAll[indexStages].children = newData

                        setItem(dataAll)
                    }}
                    onItemDragStart={({ index, item }) => {
                        console.log(`Item #${index} (${item}) drag start`)
                    }}
                    onItemDragPositionChange={({
                        index,
                        item,
                        toIndex,
                        previousIndex
                    }) => {
                        console.log(
                            `Item #${index} (${item}) dragged to index ${toIndex} (previous: ${previousIndex})`
                        )
                    }}
                    onItemDragEnd={({ index, item, toIndex, toItem }) => {
                        console.log(
                            `Item #${index} (${item}) drag ended at index ${toIndex} (${toItem})`
                        )
                    }}
                />
            </View>
        </DraxProvider>
    )
}

export default DragDrop

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    view_content_children_timeline: {
        flexDirection: 'row',
        paddingVertical: 5,
        alignItems: 'flex-start',
        paddingHorizontal: 10,
        flex: 1
    },
    color_content_timeline: {
        color: COLORS.colorWhite
    },
    title_children_timeline: {
        fontSize: 14,
        fontWeight: '500',
        width: '90%'
    },
    hover: {
        borderColor: 'rgba(224, 244, 244, 1)',
        borderWidth: 2,
        borderRadius: 10
    },
    no_hover: {
        backgroundColor: 'rgba(224, 244, 244, 0.4)'
    }
})
