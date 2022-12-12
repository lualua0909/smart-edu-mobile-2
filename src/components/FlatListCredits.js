import React from 'react'
import { View, Text, Pressable, Image, FlatList } from 'react-native'
import { scale } from 'app/helpers/responsive'
import { ChevronRightIcon } from 'native-base'
import { FONTS, COLORS, ROUTES } from 'app/constants'
import { useNavigation } from '@react-navigation/native'

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
                    borderTopWidth: scale(8),
                    borderTopColor: COLORS.borderGrey,
                    paddingTop: scale(16),
                    width: '100%',
                    marginTop: scale(16),
                }}
            >
                <View
                    style={{
                        paddingHorizontal: scale(16),
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
                        <Text
                            style={{
                                fontFamily: FONTS.MulishBold,
                                fontSize: scale(16),
                                color: '#0E564D',
                                marginLeft: scale(8),
                                textTransform: 'uppercase',
                            }}
                        >
                            Chứng chỉ
                        </Text>
                    </View>
                    <Pressable
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                        onPress={() =>
                            navigation.navigate(ROUTES.CertificateList, {
                                userId,
                            })
                        }
                    >
                        <Text
                            style={{
                                fontFamily: FONTS.Mulish,
                                fontSize: scale(16),
                                color: '#A3A3A3',
                            }}
                        >
                            Tất cả
                        </Text>
                        <ChevronRightIcon size={scale(24)} />
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
                                    width: widthView,
                                },
                            ]}
                            key={index}
                        >
                            <Image
                                source={require('assets/images/chung-chi-SE.png')}
                                resizeMode="stretch"
                                style={{
                                    width: '100%',
                                    height: imageHeight,
                                }}
                            />
                            <Text
                                style={{
                                    fontFamily: FONTS.MulishBold,
                                    fontSize: scale(14),
                                    color: '#000000',
                                    paddingTop: scale(8),
                                }}
                            >
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
