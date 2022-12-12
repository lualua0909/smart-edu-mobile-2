import React, { useEffect, useRef, useState } from 'react'
import {
    View,
    Text,
    Image,
    Pressable,
    Dimensions,
    ScrollView,
} from 'react-native'
import { scale } from 'app/helpers/responsive'
import { animateNextTransition } from 'app/helpers/utils'
import { FONTS, ROUTES } from 'app/constants'

const { height, width } = Dimensions.get('window')

const DATA = [
    {
        image: require('assets/images/wireframe-1.png'),
        title: 'Nội dung hấp dẫn',
        content:
            'Nội dung đa dạng, phong phú được biên soạn bởi các chuyên gia đầu ngành',
    },
    {
        image: require('assets/images/wireframe-2.png'),
        title: 'Chất lượng hàng đầu',
        content:
            'Nội dung đa dạng, phong phú được biên soạn bởi các chuyên gia đầu ngành',
    },
    {
        image: require('assets/images/wireframe-3.png'),
        title: 'Khen thưởng và quà tặng',
        content:
            'Nội dung đa dạng, phong phú được biên soạn bởi các chuyên gia đầu ngành',
    },
]

const Wireframe = ({ navigation }) => {
    const [pageIndex, setPageIndex] = useState(0)
    const [display, setDisplay] = useState(true)
    const scrollRef = useRef()
    const timerRef = useRef(null)

    useEffect(() => {
        if (display) {
            clearTimeout(timerRef.current)

            timerRef.current = setTimeout(() => {
                setDisplay(false)
                console.log('On BLurrr')
            }, 10000)
        }

        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current)
            }
        }
    }, [display])

    useEffect(() => {
        animateNextTransition()
    }, [pageIndex])

    const onGoToPage = (page) => {
        if (page < DATA.length) {
            scrollRef.current.scrollTo({
                x: width * page,
                y: 0,
                animated: true,
            })
        } else {
            navigation.navigate(ROUTES.Login)
        }
        setPageIndex(page)
    }

    const onMomentumScrollEnd = (e) => {
        const index = Math.round(
            parseFloat(e.nativeEvent.contentOffset.x / width)
        )
        setPageIndex(index)
    }

    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'space-between',
                paddingBottom: scale(74),
            }}
        >
            {/* <SafeAreaView
                style={{
                    position: 'absolute',
                    top: scale(10),
                    right: scale(20),
                    zIndex: 1,
                }}
            >
                <Pressable hitSlop={20}>
                    <Text style={{ color: '#fff' }}>Khám phá ngay</Text>
                </Pressable>
            </SafeAreaView> */}
            <ScrollView
                ref={scrollRef}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                bounces={false}
                onMomentumScrollEnd={onMomentumScrollEnd}
                onEndReachedThreshold={1}
                scrollEventThrottle={16}
            >
                <View style={{ width: width * DATA.length }}>
                    <Image
                        source={require('assets/images/wireframe.jpg')}
                        style={{
                            width: width * DATA.length + 20,
                            height: height * 0.5,
                            marginTop: -1,
                            marginLeft: -1,
                        }}
                        resizeMode="stretch"
                    />
                    <View
                        style={{
                            flexDirection: 'row',
                            width: width * DATA.length,
                        }}
                    >
                        {DATA.map((i, ind) => (
                            <View key={ind} style={{ width }}>
                                <Image
                                    source={i.image}
                                    style={{
                                        width,
                                        height: scale(300),
                                        marginTop: -scale(200),
                                    }}
                                />
                                <View style={{ paddingHorizontal: scale(16) }}>
                                    <Text
                                        style={{
                                            fontFamily: FONTS.MulishBold,
                                            fontWeight: '900',
                                            fontSize: scale(24),
                                            color: '#095F2B',
                                            textAlign: 'center',
                                        }}
                                    >
                                        {i.title}
                                    </Text>
                                    <Text
                                        style={{
                                            fontFamily: FONTS.Mulish,
                                            fontSize: scale(16),
                                            color: '#6C746E',
                                            marginTop: scale(16),
                                            textAlign: 'center',
                                        }}
                                    >
                                        {i.content}
                                    </Text>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                }}
            >
                {pageIndex > 0 && (
                    <Pressable
                        onPress={() => onGoToPage(pageIndex - 1)}
                        style={{
                            paddingVertical: scale(12),
                            paddingHorizontal: scale(48),
                        }}
                    >
                        <Text
                            style={{
                                fontFamily: FONTS.MulishSemiBold,
                                color: '#52B553',
                            }}
                        >
                            Quay lại
                        </Text>
                    </Pressable>
                )}
                <Pressable
                    onPress={() => onGoToPage(pageIndex + 1)}
                    style={{
                        paddingVertical: scale(12),
                        paddingHorizontal: scale(48),
                        borderRadius: scale(10),
                        backgroundColor: '#0EBF46',
                    }}
                >
                    <Text
                        style={{
                            fontFamily: FONTS.MulishSemiBold,
                            color: '#fff',
                        }}
                    >
                        {pageIndex < DATA.length - 1 ? 'Tiếp tục' : 'Đăng nhập'}
                    </Text>
                </Pressable>
            </View>
        </View>
    )
}

export default Wireframe
