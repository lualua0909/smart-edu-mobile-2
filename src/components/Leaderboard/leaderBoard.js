import { COLORS, STYLES } from 'app/constants'
import { svgClock } from 'assets/svg'
import React from 'react'

import { useNavigation } from '@react-navigation/native'
import {
    Animated,
    Dimensions,
    Image,
    ImageBackground,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native'
import { SvgXml } from 'react-native-svg'

import HeaderBack from 'app/components/header-back'
import HeaderTitle from 'app/components/header-title'

const { width, height } = Dimensions.get('screen')

const SPACING = 20
const AVATAR_SIZE = 70
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3

const LeaderBoardComponent = () => {
    const navigation = useNavigation()
    const scrollY = React.useRef(new Animated.Value(0)).current

    React.useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTintColor: '#fff'
        })
    }, [])
    // const inputRange = [-1, 0, ITEM_SIZE * i, ITEM_SIZE * (i + 2)]
    const scale = scrollY.interpolate({
        inputRange: [-1, 0, height / 8, height],
        outputRange: [1, 1, 1, 0]
    })
    const myLocation = 5
    return (
        <ImageBackground
            source={require('assets/images/leaderboard-bg.png')}
            style={styles.backgroundImage}>
            <SafeAreaView style={styles.container}>
                <Animated.ScrollView
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                        { useNativeDriver: true }
                    )}>
                    <View style={[styles.current_position, STYLES.boxShadow]}>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-around'
                            }}>
                            <View>
                                <Text
                                    style={{
                                        fontSize: 18,
                                        color: COLORS.green,
                                        fontWeight: '400'
                                    }}>
                                    Vị trí hiện tại của bạn
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 15,

                                        color: COLORS.colorBlack
                                    }}>
                                    Điểm:{' '}
                                    <Text
                                        style={{
                                            fontSize: 17,
                                            fontWeight: '500',
                                            color: COLORS.green
                                        }}>
                                        1000
                                    </Text>
                                </Text>
                            </View>
                            <View style={styles.view_number_current}>
                                <Text
                                    style={{
                                        textAlign: 'center',
                                        fontSize: 20,
                                        color: COLORS.colorWhite
                                    }}>
                                    #{myLocation}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            marginTop: 20
                        }}>
                        <View
                            style={{
                                backgroundColor: COLORS.colorGray,
                                paddingHorizontal: 5,
                                paddingVertical: 10,
                                width: 150,
                                borderRadius: 10,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                            <SvgXml xml={svgClock} width={20} height={20} />
                            <Text
                                style={{
                                    color: COLORS.colorWhite,
                                    fontSize: 16
                                }}>
                                20d 12h 22m
                            </Text>
                        </View>
                    </View>
                    <Animated.View
                        style={{
                            height: height / 2,
                            marginVertical: 10,
                            marginTop: 50,
                            transform: [{ scale }]
                        }}>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-around'
                            }}>
                            {[...Array(3).keys()].map((_, i) => {
                                return (
                                    <View>
                                        <View
                                            style={{
                                                backgroundColor:
                                                    COLORS.borderGrey,
                                                width: 80,
                                                height: 80,
                                                borderRadius: 50,
                                                marginTop:
                                                    i === 0
                                                        ? 20
                                                        : i === 2
                                                        ? 40
                                                        : 0
                                            }}></View>
                                        <Text
                                            style={{
                                                fontSize: 18,
                                                color: COLORS.colorWhite,
                                                textAlign: 'center',
                                                fontWeight: '500'
                                            }}>
                                            Name
                                        </Text>
                                        <Text
                                            style={{
                                                fontSize: 15,
                                                color: COLORS.colorWhite,
                                                textAlign: 'center',
                                                fontWeight: '500'
                                            }}>
                                            1000
                                        </Text>
                                    </View>
                                )
                            })}
                        </View>
                        <Image
                            source={require('assets/images/Podium.png')}
                            style={{
                                width: width - 40,
                                height: height / 3
                            }}></Image>
                    </Animated.View>
                    <View
                        style={{
                            backgroundColor: COLORS.colorWhite,
                            marginTop: -100,
                            paddingHorizontal: 15,
                            paddingVertical: 20,
                            borderRadius: 10
                        }}>
                        {[...Array(30).keys()].map((_, i) => {
                            const scale2 = scrollY.interpolate({
                                inputRange: [-1, 0, height / 3, height],
                                outputRange: [0, 0, 1, 1]
                            })
                            const test3 = scrollY.interpolate({
                                inputRange: [-300, 0, height / 3, height],
                                outputRange: [0, -300, 1, 1]
                            })
                            return (
                                <Animated.View
                                    style={[
                                        {
                                            backgroundColor: COLORS.colorGray,
                                            borderColor:
                                                myLocation === i + 1
                                                    ? COLORS.green
                                                    : COLORS.colorGray,
                                            borderRadius: 10,
                                            borderWidth: 1,
                                            height: 80,
                                            marginVertical: 10,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            paddingHorizontal: 15
                                        },
                                        STYLES.boxShadow,
                                        i < 3
                                            ? { transform: [{ scale: scale2 }] }
                                            : {
                                                  transform: [
                                                      { translateY: test3 }
                                                  ]
                                              }
                                    ]}
                                    key={i}>
                                    <Text
                                        style={{
                                            fontSize: 20,
                                            color: COLORS.colorBlack,
                                            marginRight: 20
                                        }}>
                                        {i + 1}.
                                    </Text>
                                    <View
                                        style={{
                                            backgroundColor: COLORS.borderGrey,
                                            width: 50,
                                            height: 50,
                                            borderRadius: 50
                                        }}></View>
                                    <View style={{ marginLeft: 20 }}>
                                        <Text
                                            style={{
                                                fontSize: 18,
                                                color: COLORS.colorBlack
                                            }}>
                                            Full Name
                                        </Text>
                                        <Text
                                            style={{
                                                fontSize: 16,
                                                color: COLORS.colorBlack
                                            }}>
                                            Điểm
                                        </Text>
                                    </View>
                                </Animated.View>
                            )
                        })}
                    </View>
                </Animated.ScrollView>
            </SafeAreaView>
        </ImageBackground>
    )
}

export default LeaderBoardComponent

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        paddingHorizontal: 20
    },
    backgroundImage: {
        flex: 1,
        width: width,
        height: height
    },
    current_position: {
        backgroundColor: '#99FF98',
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderRadius: 10
    },
    view_number_current: {
        backgroundColor: COLORS.green,
        padding: 8,
        borderRadius: 10,
        width: 50
    }
})
