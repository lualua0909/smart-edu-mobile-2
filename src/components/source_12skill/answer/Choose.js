import { COLORS, STYLES } from 'app/constants'
import { svgCheckbox } from 'assets/svg'
import React from 'react'

import {
    Dimensions,
    FlatList,
    ImageBackground,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native'
import { SvgXml } from 'react-native-svg'

const { width, height } = Dimensions.get('screen')

const Choose = ({
    question,
    onChooseAnswer,
    questionCurrent,
    questionTotal
}) => {
    const [currentChoose, setCurrentChoose] = React.useState(null)
    React.useEffect(() => {
        setCurrentChoose(null)
    }, [])

    const handleChooseAnswer = idAnswer => {
        setCurrentChoose(idAnswer)
        onChooseAnswer(idAnswer)
    }

    const renderAnswer = ({ item }) => {
        const isChoose = currentChoose === item.id
        const { borderColor } = isChoose
            ? { borderColor: COLORS.green }
            : { borderColor: COLORS.colorGray }
        return (
            <View style={{ backgroundColor: '#FFF', borderRadius: 10 }}>
                <TouchableOpacity
                    activeOpacity={0.5}
                    key={item.id}
                    onPress={() => handleChooseAnswer(item.id)}
                    style={[
                        styles.buttonAnswer,
                        STYLES.boxShadow,
                        {
                            borderColor
                        }
                    ]}>
                    <View
                        style={{
                            borderRadius: 10,
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}>
                        <Text style={[styles.answerText]}>
                            {item.answerName}
                        </Text>
                        {isChoose && (
                            <SvgXml xml={svgCheckbox} width={20} height={20} />
                        )}
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground
                source={require('assets/images/green-bg.jpg')}
                style={styles.view_top}
                imageStyle={{
                    borderBottomLeftRadius: 20,
                    borderBottomRightRadius: 20
                }}>
                <View>
                    <View style={{ marginBottom: 20 }}>
                        <Text
                            style={{
                                textAlign: 'center',
                                color: COLORS.colorWhite,
                                fontSize: 20,
                                fontWeight: '600'
                            }}>
                            {questionCurrent}/{questionTotal}
                        </Text>
                    </View>
                    <View style={styles.view_question}>
                        <Text style={styles.note}>Chọn 1 câu trả lời:</Text>

                        <Text style={styles.title}>
                            {question.questionName} ?
                        </Text>
                    </View>
                </View>
            </ImageBackground>
            <FlatList
                data={question.answer}
                keyExtractor={(_, index) => index.toString()}
                renderItem={renderAnswer}
                style={styles.styleFlatList}
            />
        </SafeAreaView>
    )
}

export default Choose

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width,
        height: height - 200,
        backgroundColor: COLORS.colorWhite
    },
    view_top: {
        width: width,
        height: height / 2.5,

        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingBottom: 80,
        borderRadius: 20
    },
    view_question: {
        backgroundColor: COLORS.colorWhite,
        width: width - 40,
        paddingHorizontal: 20,
        paddingBottom: 30,
        paddingTop: 15,
        borderRadius: 20
    },
    title: {
        fontSize: 16,
        color: COLORS.colorBlack,
        alignItems: 'center',
        width: width - 80,
        textAlign: 'center',
        lineHeight: 30
    },
    buttonAnswer: {
        marginBottom: 16,
        paddingVertical: 18,
        paddingHorizontal: 15,
        borderWidth: 2,
        borderRadius: 10,
        backgroundColor: COLORS.colorWhite
    },
    answerText: {
        fontSize: 16,
        color: COLORS.colorBlack
    },
    styleFlatList: {
        paddingVertical: 20,
        paddingHorizontal: 20,
        marginTop: -58
    },
    note: {
        marginBottom: 10,
        color: COLORS.green
    }
})
