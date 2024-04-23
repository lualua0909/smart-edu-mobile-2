import { Text } from 'app/atoms'
import Swipeout from 'app/components/SwipeOut'
import { ROUTES, STYLES } from 'app/constants'
import { scale } from 'app/helpers/responsive'
import { toRelativeTime } from 'app/helpers/utils'
import { svgRedDelete } from 'assets/svg'
import React from 'react'

import { useNavigation } from '@react-navigation/native'
import { Pressable, View } from 'react-native'
import { SvgXml } from 'react-native-svg'

const NotiItem = ({ data, index, removeNotify }) => {
    const navigation = useNavigation()

    const arrayButton = [
        <Pressable
            style={{
                width: scale(76),
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#fff',
                borderRadius: scale(16),
                marginRight: scale(16)
            }}
            onPress={() => removeNotify(data?.id)}>
            <SvgXml xml={svgRedDelete} width={scale(28)} height={scale(28)} />
        </Pressable>
    ]

    return (
        <View
            style={{
                marginBottom: scale(8)
            }}
            key={index}>
            <Swipeout arrayButton={arrayButton} buttonWidth={scale(80)}>
                <Pressable
                    onPress={() =>
                        navigation.navigate(ROUTES.NotificationDetail, {
                            notifyId: data?._id
                        })
                    }
                    style={{
                        paddingHorizontal: scale(8)
                    }}>
                    <View
                        style={[
                            STYLES.boxShadow,
                            { marginBottom: scale(10) },
                            {
                                padding: scale(8),
                                borderColor: '#eee',
                                borderRadius: 12,
                                flexDirection: 'row',
                                alignItems: 'center'
                                // backgroundColor: '#f6f6f6'
                            }
                        ]}>
                        {/* <Avatar bg="amber.400">
                            {!data?.status && <Avatar.Badge />}
                        </Avatar> */}
                        <View style={{ flex: 1, marginLeft: scale(12) }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}>
                                <Text
                                    bold
                                    style={{
                                        fontSize: scale(14),
                                        color: '#6C746E',
                                        flex: 1
                                    }}>
                                    {data?.title}
                                </Text>
                                <Text
                                    style={{
                                        fontSize: scale(11),
                                        color: '#6C746E'
                                    }}>
                                    {toRelativeTime(data?.created_at)}
                                </Text>
                            </View>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginTop: scale(8)
                                }}>
                                <Text
                                    style={{
                                        flex: 1,
                                        marginLeft: scale(8),
                                        lineHeight: scale(20),
                                        color: '#6C746E',
                                        fontSize: scale(12)
                                    }}
                                    numberOfLines={2}>
                                    {data?.content}
                                </Text>
                            </View>
                        </View>
                    </View>
                </Pressable>
            </Swipeout>
        </View>
    )
}

export default NotiItem
