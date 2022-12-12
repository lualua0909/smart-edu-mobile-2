import React, { useState, useEffect } from 'react'
import { View, FlatList, RefreshControl, ScrollView } from 'react-native'
import { scale } from 'app/helpers/responsive'
import { FONTS } from 'app/constants'
import { SafeAreaView } from 'react-native-safe-area-context'
import Axios from 'app/Axios'
import { LoadingAnimation } from 'app/atoms'
import {
    Box,
    Heading,
    AspectRatio,
    Image,
    Text,
    Center,
    Stack,
} from 'native-base'
import { useGlobalState } from 'app/Store'

import CertificateItem from 'app/components/CertificateItem'

const CertificateList = ({ navigation, route }) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(0)
    const [refreshing, setRefreshing] = useState(false)
    const [userInfo, setUserState] = useGlobalState('userInfo')

    const getData = (refresh = false) => {
        setLoading(true)
        Axios.get(
            `certificate/paging/${route?.params?.userId || userInfo?.id}/${
                page * 8
            }`
        )
            .then((res) => {
                if (res.data.status === 200) return res.data
            })
            .then((resData) => {
                const list = [...resData?.data, ...resData?.ex_certificates]

                console.log('certificate/paging', list)
                if (refreshing) {
                    setIsRefetch(false)
                    setData(list)
                } else {
                    setData(Array.isArray(data) ? [...data, ...list] : list)
                }
            })
            .finally(() => {
                setLoading(false)
                if (refresh) {
                    setRefreshing(false)
                }
            })
    }

    const refetch = React.useCallback(() => getData(true), [refreshing])

    useEffect(() => {
        getData(false)
    }, [page])

    const handleLoadMore = () => {
        setPage(page + 1)
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <SafeAreaView
                edges={['top']}
                style={{ flex: 1, backgroundColor: 'white' }}
            >
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={refetch}
                        />
                    }
                >
                    <Center>
                        <FlatList
                            data={data || []}
                            keyExtractor={(_, index) => index.toString()}
                            renderItem={({ item, index }) => (
                                <CertificateItem index={index} data={item} />
                            )}
                            contentContainerStyle={{
                                paddingTop: scale(16),
                                paddingBottom: scale(50),
                            }}
                            ListHeaderComponent={
                                <Text
                                    style={{
                                        marginLeft: scale(16),
                                        marginBottom: scale(16),
                                        marginTop: scale(16),
                                        fontFamily: FONTS.MulishBold,
                                        fontSize: scale(20),
                                        color: '#1F1F1F',
                                    }}
                                >
                                    Danh sách chứng chỉ
                                </Text>
                            }
                            onEndReached={handleLoadMore}
                            onEndReachedThreshold={0.5}
                            showsVerticalScrollIndicator={false}
                        />
                        {loading && <LoadingAnimation />}
                    </Center>
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}

export default CertificateList

// const CertificateItem = ({ data }) => {
//     return (
//         <Box alignItems="center" style={{ marginBottom: 10 }}>
//             <Box
//                 maxW="80"
//                 rounded="lg"
//                 overflow="hidden"
//                 borderColor="coolGray.200"
//                 borderWidth="1"
//                 _dark={{
//                     borderColor: 'coolGray.600',
//                     backgroundColor: 'gray.700',
//                 }}
//                 _web={{
//                     shadow: 2,
//                     borderWidth: 0,
//                 }}
//                 _light={{
//                     backgroundColor: 'gray.50',
//                 }}
//             >
//                 <Box>
//                     <AspectRatio w="100%" ratio={16 / 9}>
//                         <Image
//                             source={{
//                                 uri: `${EXCERTIFICATE_IMG_PATH}${data?.id}.webp`,
//                             }}
//                             fallbackSource={chungchiSE}
//                             alt="image"
//                             resizeMode="contain"
//                         />
//                     </AspectRatio>
//                     <Center
//                         bg="violet.500"
//                         _dark={{
//                             bg: 'violet.400',
//                         }}
//                         _text={{
//                             color: 'warmGray.50',
//                             fontWeight: '700',
//                             fontSize: 'xs',
//                         }}
//                         position="absolute"
//                         bottom="0"
//                         px="3"
//                         py="1.5"
//                     >
//                         {toRelativeTime(data?.release_date)}
//                     </Center>
//                 </Box>
//                 <Stack p="4" space={3}>
//                     <Stack space={2}>
//                         <Heading size="md" ml="-1">
//                             {data?.title}
//                         </Heading>
//                         {/* <Text
//                             fontSize="xs"
//                             _light={{
//                                 color: 'violet.500',
//                             }}
//                             _dark={{
//                                 color: 'violet.400',
//                             }}
//                             fontWeight="500"
//                             ml="-0.5"
//                             mt="-1"
//                         >
//                             The Silicon Valley of India.
//                         </Text> */}
//                     </Stack>
//                     {/* <Text fontWeight="400">
//                         Bengaluru (also called Bangalore) is the center of
//                         India's high-tech industry. The city is also known for
//                         its parks and nightlife.
//                     </Text> */}
//                 </Stack>
//             </Box>
//         </Box>
//     )
// }
