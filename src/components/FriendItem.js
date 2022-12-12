import React from 'react'
import { View, Text, Pressable } from 'react-native'
import { scale } from 'app/helpers/responsive'
import { FONTS, ROUTES } from 'app/constants'
import { Avatar } from 'app/atoms'
import { useNavigation } from '@react-navigation/native'

const FriendItem = ({ item, index }) => {
    const navigation = useNavigation()
    // const color = isOnline ? '#0EBF46' : '#6C6C6C'
    const name = `${item.first_name} ${item.last_name}`

    return (
        <Pressable
            onPress={() =>
                navigation.navigate(ROUTES.ProfileOverview, {
                    userId: item?.id,
                })
            }
        >
            <View
                key={index}
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: scale(8),
                }}
            >
                <Avatar size={scale(48)} userId={item?.id} name={name} />
                <View style={{ flex: 1, marginLeft: scale(8) }}>
                    <Text
                        style={{
                            fontFamily: FONTS.MulishSemiBold,
                            fontSize: scale(16),
                            color: '#1F1F1F',
                        }}
                    >
                        {name}
                    </Text>
                    {/* <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: scale(4),
                    }}
                >
                    <View
                        style={{
                            width: scale(10),
                            height: scale(10),
                            borderRadius: scale(10),
                            backgroundColor: color,
                        }}
                    />
                    <Text
                        style={{
                            fontFamily: FONTS.Mulish,
                            fontSize: scale(12),
                            color,
                            marginLeft: scale(4),
                        }}
                    >
                        {isOnline ? 'Online' : 'Offline'}
                    </Text>
                </View> */}
                </View>
            </View>
        </Pressable>
    )
}

export default FriendItem
