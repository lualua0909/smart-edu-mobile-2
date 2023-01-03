import { scale } from 'app/helpers/responsive'
import React from 'react'

import { Pressable, StyleSheet, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import { Text } from 'native-base'

const BarChart = ({ data, selectCourse }) => {
    return (
        <View
            style={{ width: '100%', height: scale(300), marginTop: scale(30) }}>
            <View
                style={{ position: 'absolute', width: '100%', height: '100%' }}>
                <View
                    style={{
                        position: 'absolute',
                        width: '100%',
                        top: '0%',
                        justifyContent: 'center'
                    }}>
                    <Text style={[styles.textPercent, { top: -scale(25) }]}>
                        %
                    </Text>
                    <Text style={styles.textPercent}>100</Text>
                    {/*<Dash
                        style={{ flex: 1, height: 1 }}
                        dashColor="#1F1F1F20"
                        dashThickness={1}
                        dashLength={6}
                    />*/}
                </View>
                <View
                    style={{
                        position: 'absolute',
                        width: '100%',
                        top: '20%',
                        justifyContent: 'center'
                    }}>
                    <Text style={styles.textPercent}>80</Text>
                    {/*<Dash
                        style={{ flex: 1, height: 1 }}
                        dashColor="#1F1F1F20"
                        dashThickness={1}
                        dashLength={6}
                    />*/}
                </View>
                <View
                    style={{
                        position: 'absolute',
                        width: '100%',
                        top: '40%',
                        justifyContent: 'center'
                    }}>
                    <Text style={styles.textPercent}>60</Text>
                    {/*<Dash
                        style={{ flex: 1, height: 1 }}
                        dashColor="#1F1F1F20"
                        dashThickness={1}
                        dashLength={6}
                    />*/}
                </View>
                <View
                    style={{
                        position: 'absolute',
                        width: '100%',
                        top: '60%',
                        justifyContent: 'center'
                    }}>
                    <Text style={styles.textPercent}>40</Text>
                    {/*<Dash
                        style={{ flex: 1, height: 1 }}
                        dashColor="#1F1F1F20"
                        dashThickness={1}
                        dashLength={6}
                    />*/}
                </View>
                <View
                    style={{
                        position: 'absolute',
                        width: '100%',
                        top: '80%',
                        justifyContent: 'center'
                    }}>
                    <Text style={styles.textPercent}>20</Text>
                    {/*<Dash
                        style={{ flex: 1, height: 1 }}
                        dashColor="#1F1F1F20"
                        dashThickness={1}
                        dashLength={6}
                    />*/}
                </View>
                <View
                    style={{
                        position: 'absolute',
                        width: '100%',
                        top: '100%',
                        justifyContent: 'center'
                    }}>
                    <Text style={styles.textPercent}>0</Text>
                    <View
                        style={{
                            flex: 1,
                            height: 1,
                            backgroundColor: 'rgba(0, 0, 0, 0.25)'
                        }}
                    />
                </View>
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    height: '100%',
                    alignItems: 'flex-end',
                    paddingLeft: scale(30),
                    justifyContent: 'space-between'
                }}>
                {data?.map((item, index) => {
                    return (
                        <Pressable onPress={() => selectCourse(item)}>
                            <LinearGradient
                                key={index}
                                colors={['#0EBF46', '#087676']}
                                style={{
                                    width: scale(26),
                                    height: `${item?.process}%`
                                }}
                            />
                        </Pressable>
                    )
                })}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    textPercent: {
        backgroundColor: '#fff',
        position: 'absolute',
        zIndex: 1,

        fontSize: scale(12),
        color: '#1F1F1F'
    }
})

export default BarChart
