import { scale } from 'app/helpers/responsive'
import React from 'react'

import { useNavigation } from '@react-navigation/native'
import { View } from 'react-native'

import { FlatList, Image, Pressable, Text } from 'native-base'

const FlatListCredits = ({ data, userId }) => {
    const navigation = useNavigation()

    const dataLength = data.length
    const widthView = dataLength === 1 ? scale(356) : scale(180)
    const imageHeight = dataLength === 1 ? scale(240) : scale(120)
    const paddingHor = dataLength === 1 ? scale(20) : scale(10)

    return (
        <>
            <View
                style={{
                    width: '100%'
                }}>
                <View
                    style={{
                        paddingHorizontal: scale(16),
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                        <Text
                            style={{
                                fontSize: 16,
                                fontWeight: 'bold',
                                color: '#0E564D',
                                marginLeft: scale(8),
                                textTransform: 'uppercase'
                            }}>
                            Chứng chỉ
                        </Text>
                    </View>
                    <Pressable
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}
                        onPress={() =>
                            navigation.navigate('MyCertificates', {
                                userId
                            })
                        }>
                        <Text
                            style={{
                                color: '#A3A3A3'
                            }}>
                            Tất cả
                        </Text>
                    </Pressable>
                </View>

                <FlatList
                    data={data.slice(0, 2)}
                    keyExtractor={(_, index) => index.toString()}
                    contentContainerStyle={{ margin: scale(10) }}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    renderItem={({ item, index }) => (
                        <View
                            style={[
                                {
                                    paddingTop: scale(7),
                                    paddingHorizontal: paddingHor,
                                    width: widthView
                                }
                            ]}
                            key={index}>
                            <Image
                                alt="chung-chi-SE.png"
                                source={require('assets/images/chung-chi-SE.png')}
                                resizeMode="cover"
                                style={{
                                    width: '100%',
                                    height: imageHeight
                                }}
                            />
                            <Text
                                style={{
                                    fontSize: scale(14),
                                    color: '#000000',
                                    paddingTop: scale(8)
                                }}>
                                {item.name}
                            </Text>
                        </View>
                    )}
                />
            </View>
        </>
    )
}

export default FlatListCredits
