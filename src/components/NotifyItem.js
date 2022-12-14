import React from 'react'
import { View, Pressable } from 'react-native'
import { SvgXml } from 'react-native-svg'
import { scale } from 'app/helpers/responsive'
import { svgWhiteBook, svgRedDelete } from 'assets/svg'
import { ROUTES } from 'app/constants'
import Swipeout from 'app/components/SwipeOut'
import { useNavigation } from '@react-navigation/native'
import { Avatar, Box } from 'native-base'
import { toRelativeTime } from 'app/helpers/utils'
import { Text } from 'native-base'

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
                marginRight: scale(16),
            }}
            onPress={() => removeNotify(data?.id)}
        >
            <SvgXml xml={svgRedDelete} width={scale(28)} height={scale(28)} />
        </Pressable>,
    ]

    return (
        <Box
            style={{
                marginBottom: scale(8),
            }}
            key={index}
        >
            <Swipeout arrayButton={arrayButton} buttonWidth={scale(80)}>
                <Pressable
                    onPress={() =>
                        navigation.navigate(ROUTES.NotificationDetail, {
                            notifyId: data?.id,
                        })
                    }
                    style={{
                        paddingHorizontal: scale(16),
                    }}
                >
                    <Box
                        style={{
                            padding: scale(16),
                            borderColor: '#eee',
                            borderRadius: 12,
                            flexDirection: 'row',
                            alignItems: 'center',
                            backgroundColor: '#f6f6f6',
                        }}
                    >
                        <Avatar bg="amber.400">
                            <SvgXml
                                xml={svgWhiteBook}
                                width={scale(27)}
                                height={scale(27)}
                            />
                            {!data?.status && <Avatar.Badge />}
                        </Avatar>
                        <View style={{ flex: 1, marginLeft: scale(12) }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: scale(16),
                                        color: '#1F1F1F',
                                        flex: 1,
                                    }}
                                >
                                    {data?.title}
                                </Text>
                                <Text
                                    style={{
                                        fontSize: scale(13),
                                        color: '#1F1F1F',
                                    }}
                                >
                                    {toRelativeTime(data?.created_at)}
                                </Text>
                            </View>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginTop: scale(8),
                                }}
                            >
                                <Text
                                    style={{
                                        flex: 1,
                                        marginLeft: scale(8),

                                        color: '#6C746E',
                                        fontSize: scale(14),
                                    }}
                                    numberOfLines={2}
                                >
                                    {data?.content}
                                </Text>
                            </View>
                        </View>
                    </Box>
                </Pressable>
            </Swipeout>
        </Box>
    )
}

export default NotiItem
