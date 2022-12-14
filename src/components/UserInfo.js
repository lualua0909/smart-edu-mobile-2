import React from 'react'
import { View, Pressable, TextInput } from 'react-native'
import { scale } from 'app/helpers/responsive'
import { SvgXml } from 'react-native-svg'
import {
    svgCompany,
    svgBirth,
    svgEmail,
    svgPhone,
    svgEdit_3,
    svgGender,
} from 'assets/svg'
import { Text } from 'native-base'

const UserInfo = ({ onEditBirthday, onEditGender, onEditPhone }) => {
    return (
        <View
            style={{
                marginTop: scale(6),
                backgroundColor: '#FFFFFF',
                paddingHorizontal: scale(20),
                paddingVertical: scale(10),
            }}
        >
            <Text
                style={{
                    color: '#1F1F1F',
                    fontSize: scale(18),

                    paddingHorizontal: scale(10),
                    paddingVertical: scale(7),
                }}
            >
                Thông tin cá nhân
            </Text>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    paddingHorizontal: scale(20),
                    paddingVertical: scale(10),
                }}
            >
                <SvgXml
                    xml={svgGender}
                    width={scale(24)}
                    height={scale(24)}
                    color="#6C746E"
                    style={{ marginTop: scale(6) }}
                />

                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: '100%',
                    }}
                >
                    <View
                        style={{
                            marginLeft: scale(20),
                        }}
                    >
                        <TextInput
                            style={{
                                fontSize: scale(16),
                                color: '#1F1F1F',
                            }}
                            value="Nam"
                            editable={false}
                            multiline={true}
                            numberOfLines={2}
                        />
                        <Text
                            style={{
                                fontSize: scale(16),
                                color: '#363E57',
                            }}
                        >
                            Giới tính
                        </Text>
                    </View>
                    <Pressable onPress={() => onEditGender()}>
                        <SvgXml
                            xml={svgEdit_3}
                            width={scale(20)}
                            height={scale(20)}
                            color="#6C746E"
                            style={{ marginTop: scale(6) }}
                        />
                    </Pressable>
                </View>
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    paddingHorizontal: scale(20),
                    paddingVertical: scale(10),
                }}
            >
                <SvgXml
                    xml={svgBirth}
                    width={scale(24)}
                    height={scale(24)}
                    color="#6C746E"
                    style={{ marginTop: scale(6) }}
                />

                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: '100%',
                    }}
                >
                    <View
                        style={{
                            marginLeft: scale(20),
                        }}
                    >
                        <TextInput
                            style={{
                                fontSize: scale(16),
                                color: '#1F1F1F',
                            }}
                            value="02/09/1998"
                            editable={false}
                            multiline={true}
                            numberOfLines={2}
                        />
                        <Text
                            style={{
                                fontSize: scale(16),
                                color: '#363E57',
                            }}
                        >
                            Ngày sinh
                        </Text>
                    </View>
                    <Pressable onPress={() => onEditBirthday()}>
                        <SvgXml
                            xml={svgEdit_3}
                            width={scale(20)}
                            height={scale(20)}
                            color="#6C746E"
                            style={{ marginTop: scale(6) }}
                        />
                    </Pressable>
                </View>
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    paddingHorizontal: scale(20),
                    paddingVertical: scale(10),
                }}
            >
                <SvgXml
                    xml={svgPhone}
                    width={scale(24)}
                    height={scale(24)}
                    color="#6C746E"
                    style={{ marginTop: scale(6) }}
                />

                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: '100%',
                    }}
                >
                    <View
                        style={{
                            marginLeft: scale(20),
                        }}
                    >
                        <TextInput
                            style={{
                                fontSize: scale(16),
                                color: '#1F1F1F',
                            }}
                            value="090876899"
                            editable={false}
                            multiline={true}
                            numberOfLines={2}
                        />
                        <Text
                            style={{
                                fontSize: scale(16),
                                color: '#363E57',
                            }}
                        >
                            Số điện thoại
                        </Text>
                    </View>
                    <Pressable onPress={() => onEditPhone()}>
                        <SvgXml
                            xml={svgEdit_3}
                            width={scale(20)}
                            height={scale(20)}
                            color="#6C746E"
                            style={{ marginTop: scale(6) }}
                        />
                    </Pressable>
                </View>
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    paddingHorizontal: scale(20),
                    paddingVertical: scale(10),
                }}
            >
                <SvgXml
                    xml={svgEmail}
                    width={scale(24)}
                    height={scale(24)}
                    color="#6C746E"
                    style={{ marginTop: scale(6) }}
                />

                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: '100%',
                    }}
                >
                    <View
                        style={{
                            marginLeft: scale(20),
                        }}
                    >
                        <TextInput
                            style={{
                                fontSize: scale(16),
                                color: '#1F1F1F',
                            }}
                            value="thupt@gmail.com"
                            editable={false}
                            multiline={true}
                            numberOfLines={2}
                        />
                        <Text
                            style={{
                                fontSize: scale(16),
                                color: '#363E57',
                            }}
                        >
                            Email
                        </Text>
                    </View>
                    <SvgXml
                        xml={svgEdit_3}
                        width={scale(20)}
                        height={scale(20)}
                        color="#6C746E"
                        style={{ marginTop: scale(6) }}
                    />
                </View>
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    paddingHorizontal: scale(20),
                    paddingVertical: scale(10),
                }}
            >
                <SvgXml
                    xml={svgCompany}
                    width={scale(24)}
                    height={scale(24)}
                    color="#6C746E"
                    style={{ marginTop: scale(6) }}
                />

                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: '100%',
                    }}
                >
                    <View
                        style={{
                            marginLeft: scale(20),
                        }}
                    >
                        <TextInput
                            style={{
                                fontSize: scale(16),
                                color: '#1F1F1F',
                            }}
                            value="12 Lê lợi, Phường Tân phú Trung, quận Bình Tân, TP. HCM"
                            editable={false}
                            multiline={true}
                            numberOfLines={2}
                        />
                        <Text
                            style={{
                                fontSize: scale(16),
                                color: '#363E57',
                            }}
                        >
                            Địa chỉ hiện tại
                        </Text>
                    </View>
                    <SvgXml
                        xml={svgEdit_3}
                        width={scale(20)}
                        height={scale(20)}
                        color="#6C746E"
                        style={{ marginTop: scale(6) }}
                    />
                </View>
            </View>
        </View>
    )
}

export default UserInfo
