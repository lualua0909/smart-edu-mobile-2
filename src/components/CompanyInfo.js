import { scale } from 'app/helpers/responsive'
import { svgBackPack, svgClipBoard, svgCompany, svgDeparment } from 'assets/svg'
import React from 'react'

import { TextInput, View } from 'react-native'
import { SvgXml } from 'react-native-svg'

import { Text } from 'native-base'

const CompanyInfo = ({ data }) => {
    return (
        <View
            style={{
                marginTop: scale(6),
                backgroundColor: '#FFFFFF',
                paddingHorizontal: scale(20),
                paddingVertical: scale(10)
            }}>
            <Text
                style={{
                    color: '#1F1F1F',
                    fontSize: scale(18),

                    paddingHorizontal: scale(10),
                    paddingVertical: scale(7)
                }}>
                Thông tin công ty
            </Text>
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
                            color: '#1F1F1F'
                        }}
                        value="Feed Ingredient"
                        editable={false}
                        multiline={true}
                        numberOfLines={2}
                    />
                    <Text
                        style={{
                            fontSize: scale(16),
                            color: '#363E57'
                        }}>
                        Công ty
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
                    xml={svgDeparment}
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
                            color: '#1F1F1F',
                            alignItems: 'flex-start'
                        }}
                        value="Sales & Cinema Marketing & support"
                        editable={false}
                        multiline={true}
                        numberOfLines={2}
                    />
                    <Text
                        style={{
                            fontSize: scale(16),
                            color: '#363E57'
                        }}>
                        Bộ phận
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
                    xml={svgClipBoard}
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
                            color: '#1F1F1F'
                        }}
                        value="Product Management"
                        editable={false}
                        multiline={true}
                        numberOfLines={2}
                    />
                    <Text
                        style={{
                            fontSize: scale(16),
                            color: '#363E57'
                        }}>
                        Chức vụ
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
                            color: '#1F1F1F'
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
    )
}

export default CompanyInfo
