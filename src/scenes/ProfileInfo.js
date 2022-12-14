import React, { useState, useEffect } from 'react'
import { View, Pressable, TextInput, ScrollView } from 'react-native'
import { scale } from 'app/helpers/responsive'
import { SvgXml } from 'react-native-svg'
import {
    svgCompany,
    svgBirth,
    svgDeparment,
    svgClipBoard,
    svgLocation,
    svgGender,
} from 'assets/svg'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ChevronLeftIcon, Text } from 'native-base'
import Axios from 'app/Axios'
import { DetailSkeleton, Avatar } from 'app/atoms'
import { useGlobalState } from 'app/Store'

const ProfileInfo = ({ navigation, route }) => {
    const [userInfo, setUserState] = useGlobalState('userInfo')
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState(null)

    useEffect(() => {
        setLoading(true)
        Axios.get(`get-user-info/${route?.params?.userId || userInfo?.id}`)
            .then((res) => {
                if (res.data.status === 200) {
                    const data = res.data.data
                    setData(data)
                    console.log('get-user-info', data)
                }
            })
            .finally(() => setLoading(false))
    }, [route?.params])

    if (loading || !data) {
        return <DetailSkeleton />
    }

    return (
        <>
            <View style={{ paddingVertical: scale(10) }}>
                <SafeAreaView
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                    edges={['top']}
                >
                    <Pressable
                        hitSlop={15}
                        onPress={() => navigation.goBack()}
                        style={{ paddingHorizontal: scale(16) }}
                    >
                        <ChevronLeftIcon size={scale(36)} />
                    </Pressable>
                    <Text
                        style={{
                            fontSize: scale(16),
                            color: '#4F4F4F',
                        }}
                    >
                        THÔNG TIN CÁ NHÂN
                    </Text>
                    <View></View>
                    <View></View>
                </SafeAreaView>
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                stickyHeaderIndices={[1]}
            >
                <View style={{ backgroundColor: '#E5E5E5', height: '100%' }}>
                    <View
                        style={{
                            backgroundColor: '#FFFFFF',
                        }}
                    >
                        <View
                            style={{
                                marginTop: scale(8),
                                flexDirection: 'row',
                                justifyContent: 'center',
                                paddingVertical: scale(20),
                            }}
                        >
                            {/* <QRCode value="http://awesome.link.qr" size={200} /> */}
                        </View>

                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'flex-start',
                                paddingHorizontal: scale(10),
                                paddingVertical: scale(7),
                            }}
                        >
                            <SvgXml
                                xml={svgBirth}
                                width={scale(24)}
                                height={scale(24)}
                                color="#6C746E"
                            />

                            <Text
                                style={{
                                    fontSize: scale(16),
                                    color: '#363E57',
                                    marginLeft: scale(8),
                                    width: '30%',
                                }}
                            >
                                Ngày sinh
                            </Text>
                            <TextInput
                                style={{
                                    fontSize: scale(16),
                                    color: '#1F1F1F',
                                    width: '60%',
                                }}
                                value={data?.birthday}
                                editable={false}
                            />
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'flex-start',
                                paddingHorizontal: scale(10),
                                paddingVertical: scale(7),
                            }}
                        >
                            <SvgXml
                                xml={svgGender}
                                width={scale(24)}
                                height={scale(24)}
                                color="#6C746E"
                            />

                            <Text
                                style={{
                                    fontSize: scale(16),
                                    color: '#363E57',
                                    marginLeft: scale(8),
                                    width: '30%',
                                }}
                            >
                                Giới tính
                            </Text>
                            <TextInput
                                style={{
                                    fontSize: scale(16),
                                    color: '#1F1F1F',
                                    width: '60%',
                                }}
                                value={data?.gender === 2 ? 'Nữ' : 'Nam'}
                                editable={false}
                            />
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'flex-start',
                                paddingHorizontal: scale(10),
                                paddingVertical: scale(7),
                            }}
                        >
                            <SvgXml
                                xml={svgLocation}
                                width={scale(24)}
                                height={scale(24)}
                                color="#6C746E"
                            />

                            <Text
                                style={{
                                    fontSize: scale(16),
                                    color: '#363E57',
                                    marginLeft: scale(8),
                                    width: '30%',
                                }}
                            >
                                Sống tại
                            </Text>
                            <TextInput
                                style={{
                                    fontSize: scale(16),
                                    color: '#1F1F1F',
                                    width: '60%',
                                }}
                                numberOfLines={2}
                                multiline={true}
                                value={data?.address}
                                editable={false}
                            />
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'flex-start',
                                paddingHorizontal: scale(10),
                                paddingVertical: scale(7),
                            }}
                        >
                            <SvgXml
                                xml={svgClipBoard}
                                width={scale(24)}
                                height={scale(24)}
                                color="#6C746E"
                            />

                            <Text
                                style={{
                                    fontSize: scale(16),
                                    color: '#363E57',
                                    marginLeft: scale(8),
                                    width: '30%',
                                }}
                            >
                                Chức vụ
                            </Text>
                            <TextInput
                                style={{
                                    fontSize: scale(16),
                                    color: '#1F1F1F',
                                    width: '60%',
                                }}
                                numberOfLines={2}
                                multiline={true}
                                value={data?.position}
                                editable={false}
                            />
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'flex-start',
                                paddingHorizontal: scale(10),
                                paddingVertical: scale(7),
                            }}
                        >
                            <SvgXml
                                xml={svgDeparment}
                                width={scale(24)}
                                height={scale(24)}
                                color="#6C746E"
                            />

                            <Text
                                style={{
                                    fontSize: scale(16),
                                    color: '#363E57',
                                    marginLeft: scale(8),
                                    width: '30%',
                                }}
                            >
                                Bộ phận
                            </Text>

                            <TextInput
                                style={{
                                    fontSize: scale(16),
                                    color: '#1F1F1F',
                                    width: '60%',
                                }}
                                numberOfLines={2}
                                multiline={true}
                                value={data?.department}
                                editable={false}
                            />
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'flex-start',
                                paddingHorizontal: scale(10),
                                paddingVertical: scale(7),
                            }}
                        >
                            <SvgXml
                                xml={svgCompany}
                                width={scale(24)}
                                height={scale(24)}
                                color="#6C746E"
                            />

                            <Text
                                style={{
                                    fontSize: scale(16),
                                    color: '#363E57',
                                    marginLeft: scale(8),
                                    width: '30%',
                                }}
                            >
                                Công ty
                            </Text>
                            <TextInput
                                style={{
                                    fontSize: scale(16),
                                    color: '#1F1F1F',
                                    width: '60%',
                                }}
                                numberOfLines={2}
                                multiline={true}
                                value={data?.partner}
                                editable={false}
                            />
                        </View>
                        {/* <Pressable
                            style={{
                                borderWidth: 1,
                                padding: scale(10),
                                marginHorizontal: scale(20),
                                borderRadius: scale(8),
                                alignContent: 'center',
                                alignItems: 'center',
                                marginVertical: scale(10),
                                borderColor: '#E5E5E5',
                                flexDirection: 'row',
                                justifyContent: 'center',
                            }}
                        >
                            <Text
                                style={{
                                    color: '#1F1F1F',
                                    
                                    fontSize: scale(16),
                                }}
                            >
                                Nhấn để copy link
                            </Text>
                            <SvgXml
                                xml={svgCopy}
                                width={scale(20)}
                                height={scale(20)}
                                color="#6C746E"
                                style={{ marginLeft: scale(5) }}
                            />
                        </Pressable> */}
                        {/* <Pressable
                            style={{
                                borderWidth: 1,
                                padding: scale(10),
                                marginHorizontal: scale(20),
                                borderRadius: scale(8),
                                alignContent: 'center',
                                alignItems: 'center',
                                marginVertical: scale(20),
                                color: '#FFFFFF',
                                borderColor: '#E5E5E5',
                                backgroundColor: '#52B553',
                                flexDirection: 'row',
                                justifyContent: 'center',
                            }}
                            onPress={() =>
                                navigation.navigate(ROUTES.EditProfile)
                            }
                        >
                            <SvgXml
                                xml={svgEdit_1}
                                width={scale(20)}
                                height={scale(20)}
                                color="#FFFFFF"
                                style={{ marginRight: scale(5) }}
                            />
                            <Text
                                style={{
                                    color: '#FFFFFF',
                                    
                                    fontSize: scale(16),
                                }}
                            >
                                Sửa thông tin
                            </Text>
                        </Pressable> */}
                    </View>
                </View>
            </ScrollView>
        </>
    )
}

export default ProfileInfo
