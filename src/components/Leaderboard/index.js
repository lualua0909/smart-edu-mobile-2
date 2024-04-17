import axios from 'app/Axios'
import { getGlobalState } from 'app/Store'
import { AbsoluteSpinner, NoDataAnimation as NoData } from 'app/atoms'
import { COLORS, STYLES } from 'app/constants'
import _ from 'lodash'
import React from 'react'

import { useNavigation } from '@react-navigation/native'
import {
    Animated,
    Dimensions,
    Image,
    ImageBackground,
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native'

import HeaderBack from 'app/components/header-back'
import HeaderTitle from 'app/components/header-title'

import AvatarImage from '../../atoms/Avatar'

const { width, height } = Dimensions.get('screen')

const SPACING = 20
const AVATAR_SIZE = 70
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3

const LeaderBoardComponent = () => {
    const [isLoading, setIsLoading] = React.useState(true)
    const [isDataUndefined, setIsDataUndefined] = React.useState(false)
    const [dataLeaderBoard, setDataLeaderBoard] = React.useState(null)
    const [currentLocation, setCurrentLocation] = React.useState(null)
    const navigation = useNavigation()

    const scrollY = React.useRef(new Animated.Value(0)).current
    const [userInfo, setUserInfo] = React.useState()
    const getDataInfo = () => {
        let userInfoState = getGlobalState('userInfo')
        if (userInfoState) {
            setUserInfo(userInfoState)
        }
    }

    const getDataLeaderBoard = () => {
        setIsLoading(true)
        axios
            .get(`courses/roadmap/leaderboard/162`)
            .then(res => {
                if (!res.data) return setIsDataUndefined(true)
                const leaderBoardList = res.data.users
                setDataLeaderBoard(leaderBoardList)
                const current = _.find(leaderBoardList, {
                    user_id: userInfo?.id
                })
                setCurrentLocation(current?.user_id)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }
    navigation.setOptions({
        headerTransparent: true,
        headerTitle: () => (
            <HeaderTitle
                color={isLoading ? '#000' : '#fff'}
                title={'Bảng xếp hạng'}
            />
        ),
        headerLeft: () => <HeaderBack white={!isLoading} />
    })
    React.useEffect(() => {
        getDataLeaderBoard()
        getDataInfo()
    }, [])
    // const inputRange = [-1, 0, ITEM_SIZE * i, ITEM_SIZE * (i + 2)]
    const scale = scrollY.interpolate({
        inputRange: [-1, 0, height / 8, height],
        outputRange: [1, 1, 1, 0]
    })

    function swap(array, index1, index2) {
        if (
            index1 < 0 ||
            index1 >= array.length ||
            index2 < 0 ||
            index2 >= array.length
        ) {
            return
        }

        var temp = array[index1]
        array[index1] = array[index2]
        array[index2] = temp
        return array
    }

    const myLocation = 5
    if (isLoading)
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                <AbsoluteSpinner
                    style={{
                        marginTop: 20
                    }}
                />
            </View>
        )
    if (isDataUndefined)
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                <NoData
                    style={{
                        marginTop: 20,
                        width: 800,
                        height: 300
                    }}
                />
            </View>
        )
    return (
        <ImageBackground
            source={require('assets/images/green-bg.jpg')}
            style={styles.backgroundImage}>
            <SafeAreaView style={styles.container}>
                <Animated.ScrollView
                    showsHorizontalScrollIndicator={false}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                        { useNativeDriver: true }
                    )}>
                    {currentLocation && (
                        <View
                            style={[styles.current_position, STYLES.boxShadow]}>
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
                    )}
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            marginTop: 20
                        }}>
                        {/* <View
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
                        </View> */}
                    </View>
                    {dataLeaderBoard && (
                        <>
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
                                    {swap(
                                        dataLeaderBoard?.slice(0, 3),
                                        0,
                                        1
                                    ).map((user, i) => {
                                        return (
                                            <View
                                                key={user.id}
                                                style={{
                                                    flexDirection: 'column',
                                                    alignItems: 'center'
                                                }}>
                                                <View
                                                    style={{
                                                        marginTop:
                                                            i === 0
                                                                ? 20
                                                                : i === 2
                                                                ? 40
                                                                : 0
                                                    }}>
                                                    <AvatarImage
                                                        userId={user?.user_id}
                                                    />
                                                </View>
                                                <Text
                                                    numberOfLines={1}
                                                    style={{
                                                        fontSize: 18,
                                                        color: COLORS.colorWhite,
                                                        textAlign: 'center',
                                                        fontWeight: '500',
                                                        maxWidth: width / 3 - 40
                                                    }}>
                                                    {user.user.full_name}
                                                </Text>
                                                <Text
                                                    style={{
                                                        fontSize: 15,
                                                        color: COLORS.colorWhite,
                                                        textAlign: 'center',
                                                        fontWeight: '500'
                                                    }}>
                                                    {user.points}
                                                </Text>
                                            </View>
                                        )
                                    })}
                                </View>
                                <Image
                                    source={require('assets/images/Podium.webp')}
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
                                {dataLeaderBoard.map((user, i) => {
                                    const scale2 = scrollY.interpolate({
                                        inputRange: [-1, 0, height / 3, height],
                                        outputRange: [0, 0, 1, 1]
                                    })
                                    const test3 = scrollY.interpolate({
                                        inputRange: [
                                            -300,
                                            0,
                                            height / 3,
                                            height
                                        ],
                                        outputRange: [0, -300, 1, 1]
                                    })
                                    return (
                                        <Animated.View
                                            style={[
                                                {
                                                    backgroundColor:
                                                        COLORS.colorGray,
                                                    borderColor:
                                                        currentLocation &&
                                                        currentLocation ===
                                                            user.user_id
                                                            ? COLORS.green
                                                            : COLORS.colorGray,
                                                    borderRadius: 10,
                                                    borderWidth: 1,
                                                    height: 80,
                                                    marginVertical: 10,
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    paddingHorizontal: 20
                                                },
                                                STYLES.boxShadow,
                                                i < 3
                                                    ? {
                                                          transform: [
                                                              { scale: scale2 }
                                                          ]
                                                      }
                                                    : {
                                                          transform: [
                                                              {
                                                                  translateY:
                                                                      test3
                                                              }
                                                          ]
                                                      }
                                            ]}
                                            key={i}>
                                            <Text
                                                style={{
                                                    fontSize: 20,
                                                    color: COLORS.colorBlack,
                                                    width: 33
                                                }}>
                                                {i + 1}.
                                            </Text>
                                            <AvatarImage
                                                size={50}
                                                userId={user?.user_id}
                                            />
                                            <View
                                                style={{
                                                    marginLeft: 20
                                                }}>
                                                <View
                                                    style={{
                                                        width: width / 2,
                                                        maxWidth: width / 2
                                                    }}>
                                                    <Text
                                                        numberOfLines={1}
                                                        style={{
                                                            fontSize: 18,
                                                            color: COLORS.colorBlack
                                                        }}>
                                                        {user.user.full_name}{' '}
                                                    </Text>
                                                </View>
                                                <Text
                                                    style={{
                                                        fontSize: 16,
                                                        color: COLORS.colorBlack
                                                    }}>
                                                    {user.points}
                                                </Text>
                                            </View>
                                        </Animated.View>
                                    )
                                })}
                            </View>
                        </>
                    )}
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
