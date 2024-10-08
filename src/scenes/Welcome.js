import { ROUTES } from 'app/constants'
import { scale } from 'app/helpers/responsive'
import { animateNextTransition } from 'app/helpers/utils'
import { Button, Text } from 'atoms'
import React, { useEffect, useRef, useState } from 'react'

import { Dimensions, Image, ScrollView, View } from 'react-native'

const { height, width } = Dimensions.get('window')

const DATA = [
    {
        image: require('assets/images/wireframe-1.webp'),
        title: 'Nội dung hấp dẫn',
        content:
            'Nội dung đa dạng, phong phú được biên soạn bởi các chuyên gia đầu ngành'
    },
    {
        image: require('assets/images/wireframe-2.webp'),
        title: 'Chất lượng hàng đầu',
        content:
            'Nội dung đa dạng, phong phú được biên soạn bởi các chuyên gia đầu ngành'
    },
    {
        image: require('assets/images/wireframe-3.webp'),
        title: 'Khen thưởng và quà tặng',
        content:
            'Nội dung đa dạng, phong phú được biên soạn bởi các chuyên gia đầu ngành'
    }
]

const Wireframe = ({ navigation }) => {
    const [pageIndex, setPageIndex] = useState(0)
    const scrollRef = useRef()

    useEffect(() => {
        animateNextTransition()
    }, [pageIndex])

    const onGoToPage = page => {
        if (page < DATA.length) {
            scrollRef?.current?.scrollTo({
                x: width * page,
                y: 0,
                animated: true
            })
        } else {
            navigation.navigate(ROUTES.Login)
        }
        setPageIndex(page)
    }

    const onMomentumScrollEnd = e => {
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
                paddingBottom: scale(30)
            }}>
            <ScrollView
                ref={scrollRef}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                bounces={false}
                onMomentumScrollEnd={onMomentumScrollEnd}
                onEndReachedThreshold={1}
                scrollEventThrottle={16}>
                <View style={{ width: width * DATA.length }}>
                    <Image
                        alt="wireframe.jpg"
                        source={require('assets/images/wireframe.webp')}
                        style={{
                            width: width * DATA.length + 20,
                            height: height * 0.5,
                            marginTop: -1,
                            marginLeft: -1
                        }}
                        resizeMode="stretch"
                    />
                    <View
                        style={{
                            flexDirection: 'row',
                            width: width * DATA.length
                        }}>
                        {DATA.map((i, ind) => (
                            <View key={ind} style={{ width }}>
                                <Image
                                    alt="welcome"
                                    source={i.image}
                                    style={{
                                        width,
                                        height: scale(300),
                                        marginTop: -scale(200)
                                    }}
                                    resizeMode="contain"
                                />
                                <View
                                    style={{
                                        paddingHorizontal: 20
                                    }}>
                                    <Text
                                        bold
                                        style={{
                                            fontSize: scale(20),
                                            color: '#095F2B',
                                            textAlign: 'center',
                                            paddingVertical: 20
                                        }}>
                                        {i.title}
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: scale(16),
                                            color: '#6C746E',
                                            marginTop: scale(16),
                                            textAlign: 'center',
                                            paddingVertical: 10
                                        }}>
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
                    justifyContent: 'space-around'
                }}>
                {pageIndex > 0 && (
                    <Button outlined onPress={() => onGoToPage(pageIndex - 1)}>
                        Quay lại
                    </Button>
                )}
                <Button shadow="3" onPress={() => onGoToPage(pageIndex + 1)}>
                    {pageIndex < DATA.length - 1 ? 'Tiếp tục' : 'Đăng nhập'}
                </Button>
                {/* <Modal isVisible={true} setVisible={() => {}} /> */}
            </View>
        </View>
    )
}

export default Wireframe
