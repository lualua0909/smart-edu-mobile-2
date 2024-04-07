import { Text } from 'app/atoms'
import { scale } from 'app/helpers/responsive'
import { svgBackPack, svgCompany, svgLock, svgUser } from 'assets/svg'
import React from 'react'

import { TextInput, View } from 'react-native'
import { SvgXml } from 'react-native-svg'

const SystemInfo = ({ data }) => {
    return (
        <>
            <View
                style={{
                    marginTop: scale(6),
                    backgroundColor: '#FFFFFF',
                    paddingHorizontal: scale(20),
                    paddingVertical: scale(10)
                }}>
                <Text
                    style={{
                        color: '#6C746E',
                        fontSize: scale(18),

                        paddingHorizontal: scale(10),
                        paddingVertical: scale(7)
                    }}>
                    Thông tin hệ thống
                </Text>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        paddingHorizontal: scale(20),
                        paddingVertical: scale(10)
                    }}>
                    <SvgXml
                        xml={svgUser}
                        width={scale(24)}
                        height={scale(24)}
                        color="#6C746E"
                        style={{ marginTop: scale(6) }}
                    />

                    <View
                        style={{
                            marginLeft: scale(20)
                        }}>
                        <TextInput
                            style={{
                                fontSize: scale(16),
                                color: '#6C746E'
                            }}
                            value="thupt"
                            editable={false}
                            multiline={true}
                            numberOfLines={2}
                        />
                        <Text
                            style={{
                                fontSize: scale(16),
                                color: '#363E57'
                            }}>
                            Tên đăng nhập
                        </Text>
                    </View>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        paddingHorizontal: scale(20),
                        paddingVertical: scale(10)
                    }}>
                    <SvgXml
                        xml={svgCompany}
                        width={scale(24)}
                        height={scale(24)}
                        color="#6C746E"
                        style={{ marginTop: scale(6) }}
                    />

                    <View
                        style={{
                            marginLeft: scale(20)
                        }}>
                        <TextInput
                            style={{
                                fontSize: scale(16),
                                color: '#6C746E',
                                alignItems: 'flex-start'
                            }}
                            value="Hoc Vien"
                            editable={false}
                            multiline={true}
                            numberOfLines={2}
                        />
                        <Text
                            style={{
                                fontSize: scale(16),
                                color: '#363E57'
                            }}>
                            Phân quyền
                        </Text>
                    </View>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        paddingHorizontal: scale(20),
                        paddingVertical: scale(10)
                    }}>
                    <SvgXml
                        xml={svgLock}
                        width={scale(24)}
                        height={scale(24)}
                        color="#6C746E"
                        style={{ marginTop: scale(6) }}
                    />

                    <View
                        style={{
                            marginLeft: scale(20)
                        }}>
                        <TextInput
                            style={{
                                fontSize: scale(16),
                                color: '#6C746E'
                            }}
                            value="*******"
                            editable={false}
                            multiline={true}
                            numberOfLines={2}
                        />
                        <Text
                            style={{
                                fontSize: scale(16),
                                color: '#363E57'
                            }}>
                            Mật khẩu
                        </Text>
                    </View>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        paddingHorizontal: scale(20),
                        paddingVertical: scale(10)
                    }}>
                    <SvgXml
                        xml={svgBackPack}
                        width={scale(24)}
                        height={scale(24)}
                        color="#6C746E"
                        style={{ marginTop: scale(6) }}
                    />

                    <View
                        style={{
                            marginLeft: scale(20)
                        }}>
                        <TextInput
                            style={{
                                fontSize: scale(16),
                                color: '#6C746E'
                            }}
                            value="Sinh viên"
                            editable={false}
                            multiline={true}
                            numberOfLines={2}
                        />
                        <Text
                            style={{
                                fontSize: scale(16),
                                color: '#363E57'
                            }}>
                            Công việc hiện tại
                        </Text>
                    </View>
                </View>
            </View>
        </>
    )
}

export default SystemInfo
