import { Button, HStack, Modal, Text, VStack } from 'app/atoms'
import { scale } from 'app/helpers/responsive'
import { similarityString } from 'app/helpers/utils'
import React, { useEffect, useState } from 'react'

import LottieView from 'lottie-react-native'
import {
    Alert,
    FlatList,
    Linking,
    ScrollView,
    TouchableHighlight,
    View
} from 'react-native'
import { Mic } from 'react-native-feather'

import SpeakingAnimate from 'app/components/speaking-animate'
import animationImg from 'assets/animations/english-reading.json'

const EnglishReading = ({ data }) => {
    const [visibleSpeaking, setVisibleSpeaking] = useState(true)
    const [currentContent, setCurrentContent] = useState('')
    const [results, setResults] = useState([])
    const [modalVisible, setModalVisible] = useState(false)
    const [sentences, setSentences] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (data?.sentences?.length) {
            setSentences(data?.sentences)
        }
    }, [])

    useEffect(() => {
        console.log(results)
        console.log(currentContent)

        const _s = [...sentences]
        const findIndex = _s.findIndex(i => i.content === currentContent)
        if (findIndex !== -1) {
            _s[findIndex].result = results
            _s[findIndex].score = similarityString(currentContent, results)
            setSentences(_s)
        }
    }, [results])

    const _startRecognizing = async () => {}

    const _stopRecognizing = async () => {}

    return (
        <>
            <HStack
                space={3}
                justifyContent="center"
                style={{ paddingHorizontal: 16 }}>
                <ReadingList
                    sentences={sentences}
                    setCurrentContent={setCurrentContent}
                />
                <VStack
                    space={3}
                    justifyContent="center"
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '50%'
                    }}>
                    <LottieView
                        source={animationImg}
                        autoPlay
                        loop
                        style={{
                            width: 200,
                            height: 200
                        }}
                    />
                    <Alert w="100%" colorScheme="info" status="info">
                        <VStack space={2} flexShrink={1} w="100%">
                            <HStack
                                flexShrink={1}
                                space={2}
                                alignItems="center"
                                justifyContent="space-between">
                                <HStack
                                    space={2}
                                    flexShrink={1}
                                    alignItems="center">
                                    <Text>{currentContent || ''}</Text>
                                </HStack>
                            </HStack>
                        </VStack>
                    </Alert>
                    <Alert
                        w="100%"
                        colorScheme="info"
                        status="info"
                        variant="outline">
                        <VStack space={2} flexShrink={1} w="100%">
                            <HStack
                                flexShrink={1}
                                space={2}
                                alignItems="center"
                                justifyContent="space-between">
                                <HStack
                                    space={2}
                                    flexShrink={1}
                                    alignItems="center">
                                    <Text>Kết quả: {results}</Text>
                                </HStack>
                            </HStack>
                        </VStack>
                    </Alert>
                    <HStack space={3}>
                        <Button
                            size="lg"
                            onPress={_startRecognizing}
                            isLoading={isLoading}
                            isLoadingText="Đang xử lý giọng nói..."
                            style={{
                                backgroundColor: '#52B553'
                            }}
                            leftIcon={
                                <Mic stroke="#fff" width={24} height={24} />
                            }>
                            Bắt đầu đọc
                        </Button>
                        <Button
                            size="sm"
                            variant="outline"
                            onPress={_stopRecognizing}>
                            Dừng đọc
                        </Button>
                    </HStack>
                </VStack>
            </HStack>
            <DownloadModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
            />
            <WelcomeModal
                visibleSpeaking={visibleSpeaking}
                setVisibleSpeaking={setVisibleSpeaking}
            />
        </>
    )
}
export default EnglishReading

const ReadingList = ({ sentences, setCurrentContent }) => {
    return (
        <ScrollView
            nestedScrollEnabled={true}
            style={{ backgroundColor: '#eee', borderRadius: 10 }}>
            <Text fontSize="xl" p="4" pb="3">
                Danh sách câu phát âm
            </Text>
            <FlatList
                data={sentences}
                renderItem={({ item }) => (
                    <TouchableHighlight
                        onPress={() => setCurrentContent(item?.content)}>
                        <View>
                            <HStack space={3} justifyContent="space-between">
                                <VStack>
                                    <Text
                                        _dark={{
                                            color: 'warmGray.50'
                                        }}
                                        color="coolGray.800"
                                        bold>
                                        {item.content}
                                    </Text>
                                    <Text
                                        color="coolGray.600"
                                        _dark={{
                                            color: 'warmGray.200'
                                        }}>
                                        Kết quả: {item.result}
                                    </Text>
                                </VStack>
                                <Text
                                    fontSize="xs"
                                    _dark={{
                                        color: 'warmGray.50'
                                    }}
                                    color="coolGray.800"
                                    alignSelf="flex-start">
                                    {item?.score || 0}%
                                </Text>
                            </HStack>
                        </View>
                    </TouchableHighlight>
                )}
                keyExtractor={item => item.id}
            />
        </ScrollView>
    )
}

const DownloadModal = ({ modalVisible, setModalVisible }) => {
    // return (
    //     <Modal isOpen={modalVisible} onClose={setModalVisible} size={'md'}>
    //         <Modal.Content maxH="212">
    //             <Modal.CloseButton />
    //             <Modal.Header>Thông báo từ hệ thống</Modal.Header>
    //             <Modal.Body>
    //                 <ScrollView>
    //                     <Text>
    //                         Ứng dụng cần sử dụng dịch vụ từ điển của Google. Bạn
    //                         vui lòng nhấn vào nút bên dưới để tải app Google
    //                     </Text>
    //                 </ScrollView>
    //             </Modal.Body>
    //             <Modal.Footer>
    //                 <Button.Group space={2}>
    //                     <Button
    //                         onPress={() => {
    //                             Linking.openURL(
    //                                 'market://details?id=com.google.android.googlequicksearchbox'
    //                             )
    //                         }}>
    //                         Tải app ngay
    //                     </Button>
    //                 </Button.Group>
    //             </Modal.Footer>
    //         </Modal.Content>
    //     </Modal>
    // )
    return null
}

const WelcomeModal = ({ visibleSpeaking, setVisibleSpeaking }) => {
    return (
        <Modal
            isOpen={visibleSpeaking}
            onClose={() => setVisibleSpeaking(false)}
            size="xl">
            <Modal.Content maxHeight="100%">
                <Modal.CloseButton />
                <Modal.Body
                    style={{
                        backgroundColor: '#fff'
                    }}>
                    <View
                        style={{
                            backgroundColor: '#fff',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                        <SpeakingAnimate />
                        <Text
                            style={{
                                fontSize: scale(22),
                                color: '#6C746E',
                                marginTop: scale(10)
                            }}>
                            Luyện phát âm thôi
                        </Text>
                        <Text
                            style={{
                                fontSize: scale(16),
                                color: '#6C746E',
                                marginTop: scale(8),
                                textAlign: 'center'
                            }}>
                            Trong bài học này, bạn sẽ trò chuyện với Smart Edu
                            để thực hành phát âm nhé!
                        </Text>
                    </View>
                </Modal.Body>
            </Modal.Content>
        </Modal>
    )
}
