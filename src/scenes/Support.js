import { Text } from 'app/atoms'
import { scale } from 'app/helpers/responsive'
import { isIOS } from 'app/helpers/utils'
import { svgIconFB, svgIconYoutube } from 'assets/svg'
import React from 'react'

import { Linking, Platform, Pressable, View } from 'react-native'
import { SvgXml } from 'react-native-svg'

const Support = () => {
    const openMap = (latitude, longitude, label = '') => {
        const scheme = `${isIOS ? 'maps' : 'geo'}:0,0?q=`
        const link = Platform.select({
            ios: `${scheme}${label}@${latitude},${longitude}`,
            android: `${scheme}${latitude},${longitude}(${label})`
        })
        Linking.openURL(link)
    }
    return (
        <View
            style={{
                paddingTop: scale(10),
                marginVertical: scale(20),
                marginHorizontal: scale(20)
            }}>
            <Text
                style={{
                    fontSize: scale(20),
                    lineHeight: scale(20),
                    color: '#6C746E'
                }}>
                Liên hệ với chúng tôi qua
            </Text>
            <Text
                style={{
                    fontSize: scale(14),
                    lineHeight: scale(20),
                    fontStyle: 'italic',
                    color: '#6C746E'
                }}>
                Chúng tôi luôn sẵn sàng lắng nghe
            </Text>
            <View style={{ paddingVertical: scale(10) }}>
                <Text
                    style={{
                        fontSize: scale(16),
                        lineHeight: scale(20),
                        color: '#6C746E'
                    }}>
                    Trụ sở chính:{' '}
                </Text>
                <Pressable
                    onPress={() =>
                        openMap(
                            '106.6969134,17',
                            '10.7903701',
                            '60 Nguyễn Văn Thủ, Phường Đakao, Quận 1, TP.HCM'
                        )
                    }>
                    <Text
                        style={{
                            fontSize: scale(16),
                            lineHeight: scale(20),
                            color: '#6C746E'
                        }}>
                        60 Nguyễn Văn Thủ, Phường Đakao, Quận 1, TP.HCM
                    </Text>
                </Pressable>
            </View>
            <View style={{ paddingVertical: scale(10) }}>
                <Text
                    style={{
                        fontSize: scale(16),
                        lineHeight: scale(20),
                        color: '#6C746E'
                    }}>
                    Trung tâm đào tạo:{' '}
                </Text>
                <Pressable
                    onPress={() =>
                        openMap(
                            '106.6641902,17',
                            '10.8063076',
                            '5B Phổ Quang, phường 2, quận Tân Bình, TP.HCM'
                        )
                    }>
                    <Text
                        style={{
                            fontSize: scale(16),
                            lineHeight: scale(20),
                            color: '#6C746E'
                        }}>
                        5B Phổ Quang, phường 2, quận Tân Bình, TP.HCM
                    </Text>
                </Pressable>
            </View>
            <View
                style={{
                    paddingVertical: scale(10),
                    display: 'flex',
                    flexDirection: 'row'
                }}>
                <Text
                    style={{
                        fontSize: scale(16),
                        lineHeight: scale(20),
                        color: '#6C746E'
                    }}>
                    Email:{' '}
                </Text>
                <Pressable
                    onPress={() =>
                        Linking.openURL(
                            'mailto:training.smartedu@gmail.com?subject=Liên hệ từ ứng dụng Smart Training&body=Vấn đề cần hỗ trợ: '
                        )
                    }>
                    <Text
                        style={{
                            fontSize: scale(16),
                            lineHeight: scale(20),
                            color: '#6C746E'
                        }}>
                        training.smartedu@gmail.com
                    </Text>
                </Pressable>
            </View>
            <View
                style={{
                    paddingVertical: scale(10),
                    display: 'flex',
                    flexDirection: 'row'
                }}>
                <Text
                    style={{
                        fontSize: scale(16),
                        lineHeight: scale(20),
                        color: '#6C746E'
                    }}>
                    Hotline:{' '}
                </Text>
                <Pressable onPress={() => Linking.openURL(`tel:0942668182`)}>
                    <Text
                        style={{
                            fontSize: scale(16),
                            lineHeight: scale(20),
                            color: '#6C746E'
                        }}>
                        0942668182
                    </Text>
                </Pressable>
            </View>
            <View
                style={{
                    paddingVertical: scale(10),
                    display: 'flex',
                    flexDirection: 'row'
                }}>
                <Text
                    style={{
                        fontSize: scale(16),
                        lineHeight: scale(20),
                        color: '#6C746E'
                    }}>
                    Điện thoại:{' '}
                </Text>
                <Pressable onPress={() => Linking.openURL(`tel:02866814320`)}>
                    <Text
                        style={{
                            fontSize: scale(16),
                            lineHeight: scale(20),
                            color: '#6C746E'
                        }}>
                        02866814320
                    </Text>
                </Pressable>
            </View>
            <Pressable
                style={{
                    borderWidth: 1,
                    borderColor: '#52B553',
                    padding: scale(10),
                    borderRadius: scale(20),
                    marginVertical: scale(20)
                }}
                onPress={() => Linking.openURL(`tel:0942668182`)}>
                <Text
                    style={{
                        textAlign: 'center',
                        color: '#52B553',
                        fontSize: scale(14)
                    }}>
                    Gọi ngay: 0942668182
                </Text>
            </Pressable>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Pressable
                    onPress={() =>
                        Linking.openURL('fb://page/109853334686921')
                    }>
                    <SvgXml
                        style={{
                            marginHorizontal: scale(10)
                        }}
                        xml={svgIconFB}
                        width={scale(35)}
                        color="#6C746E"
                    />
                </Pressable>
                <Pressable
                    onPress={() =>
                        Linking.openURL(
                            'https://www.youtube.com/channel/UCwwh1wgTiSKqCExAKdNDezA'
                        )
                    }>
                    <SvgXml
                        style={{
                            marginHorizontal: scale(10)
                        }}
                        xml={svgIconYoutube}
                        width={scale(45)}
                        color="#6C746E"
                    />
                </Pressable>
            </View>
        </View>
    )
}

export default Support
