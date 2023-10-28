import { scale } from 'app/helpers/responsive'
import React from 'react'

import Config from 'react-native-config'
import DeviceInfo from 'react-native-device-info'

import { Text, View } from 'native-base'

const Language = () => {
    const { result: deviceName } = DeviceInfo.useDeviceName()
    const systemVersion = DeviceInfo.getSystemVersion()
    const systemName = DeviceInfo.getSystemName()

    DeviceInfo.supportedAbis().then(abis => {
        console.log(abis)
    })

    return (
        <>
            <View style={{ backgroundColor: '#E5E5E5' }}>
                <View
                    style={{
                        backgroundColor: '#FFFFFF',
                        paddingHorizontal: scale(10),
                        paddingVertical: scale(10)
                    }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingHorizontal: scale(10)
                        }}>
                        <Text
                            style={{
                                color: '#333333',
                                fontSize: scale(16),
                                lineHeight: scale(20)
                            }}>
                            {`Phiên bản ứng dụng ${DeviceInfo.getReadableVersion()}\n${deviceName}\n${systemName} ${systemVersion} ${
                                Config.SERVER_CONFIG
                            }\n`}
                        </Text>
                    </View>
                    {/* <Pressable
                        style={{
                            borderRadius: 5,
                            paddingVertical: scale(10),
                            borderWidth: 1,
                            borderColor: '#E5E5E5',
                            marginVertical: scale(10),
                        }}
                        onPress={() => setLanguage('vn')}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                paddingHorizontal: scale(10),
                            }}
                        >
                            <Text
                                style={{
                                    color: '#333333',
                                    fontSize: scale(16),
                                }}
                            >
                                Tiếng Việt
                            </Text>
                            {language == 'vn' && (
                                <SvgXml
                                    xml={svgCheck}
                                    width={scale(20)}
                                    height={scale(20)}
                                    color="#4F4F4F"
                                />
                            )}
                        </View>
                    </Pressable>
                    <Pressable
                        style={{
                            borderRadius: 5,
                            paddingVertical: scale(10),
                            borderWidth: 1,
                            borderColor: '#E5E5E5',
                            marginVertical: scale(10),
                        }}
                        onPress={() => setLanguage('en')}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                paddingHorizontal: scale(10),
                            }}
                        >
                            <Text
                                style={{
                                    color: '#333333',
                                    fontSize: scale(16),
                                }}
                            >
                                Tiếng Anh
                            </Text>
                            {language == 'en' && (
                                <SvgXml
                                    xml={svgCheck}
                                    width={scale(20)}
                                    height={scale(20)}
                                    color="#4F4F4F"
                                />
                            )}
                        </View>
                    </Pressable> */}
                </View>
            </View>
        </>
    )
}

export default Language
