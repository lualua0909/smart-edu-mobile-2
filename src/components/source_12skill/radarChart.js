import React from 'react'

import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native'

import { COLORS } from '../../constants'
import { RadarChart } from '../radarChart'
import { RenderColorStage } from './renderColorRestult'

const { width } = Dimensions.get('screen')

const ChartsComponent = ({ route }) => {
    const { data } = route.params
    console.log('🚀 ~ ChartsComponent ~ data:', data)
    const [dataChart, setDataChart] = React.useState(null)
    const [noteState, setNoteState] = React.useState(null)
    const convertToDecimal = value => value / 100
    const formatChartData = () => {
        if (!data) return
        let newArrBefore = {}
        // let newArrAfter = {}
        const noteArr = []
        data.map((item, index) => {
            const { process, name_stage } = item
            newArrBefore[`Năng lực ${index + 1}`] = convertToDecimal(process)
            // newArrAfter[`Năng lực ${id}`] = convertToDecimal(processAfter)
            noteArr.push({
                title: `Năng lực  ${index + 1}`,
                name: name_stage
            })
        })
        setNoteState(noteArr)
        setDataChart([{ ...newArrBefore }])
    }

    React.useEffect(() => {
        formatChartData()
    }, [])

    return (
        <View style={styles.container}>
            <View
                style={{
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                {dataChart && (
                    <RadarChart
                        graphSize={width}
                        scaleCount={10}
                        numberInterval={2}
                        data={dataChart}
                        backgroundColor="black"
                        options={{
                            graphShape: 1,
                            showAxis: true,
                            colorList: ['#04CE01', '#99FF98'],
                            backgroundColorList: ['#04CE01', '#99FF98'],
                            dotList: [false, false]
                        }}
                    />
                )}
            </View>
            <View style={{ paddingHorizontal: 20 }}>
                <Text
                    style={[
                        styles.text_color,
                        { fontSize: 18, fontWeight: '600' }
                    ]}>
                    Ghi chú:
                </Text>
                <FlatList
                    data={noteState || []}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => {
                        const color = RenderColorStage(index + 1)
                        return (
                            <View
                                style={{
                                    flexDirection: 'row',
                                    paddingHorizontal: 15,
                                    paddingVertical: 10,
                                    backgroundColor: color,
                                    borderRadius: 10,
                                    marginVertical: 5
                                }}>
                                <Text
                                    style={[
                                        styles.text_color,
                                        {
                                            fontSize: 14,
                                            fontWeight: '500'
                                        }
                                    ]}>
                                    {item.title}:
                                </Text>
                                <View style={{ width: '80%' }}>
                                    <Text
                                        style={[
                                            styles.text_color,
                                            {
                                                lineHeight: 20,
                                                marginLeft: 10,
                                                fontSize: 14,
                                                fontWeight: '500'
                                            }
                                        ]}>
                                        {item.name}
                                    </Text>
                                </View>
                            </View>
                        )
                    }}
                />

                {/* {noteState?.map((item, index) => {})} */}
            </View>
        </View>
    )
}

export default ChartsComponent

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    text_color: {
        color: COLORS.colorWhite
    }
})
