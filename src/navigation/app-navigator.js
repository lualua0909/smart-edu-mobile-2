import { ROUTES } from 'app/constants'
import { scale } from 'app/helpers/responsive'
import Carts from 'app/scenes/Carts'
import CertificateList from 'app/scenes/CertificateList'
import ConnectInstructorHistory from 'app/scenes/ConnectInstructorHistory'
import ConnectInstructors from 'app/scenes/ConnectInstructors'
import CourseContents from 'app/scenes/CourseContents'
import CourseDetails from 'app/scenes/CourseDetails'
import CoursesByUser from 'app/scenes/CoursesByUser'
import EditProfile from 'app/scenes/EditProfile'
import Friends from 'app/scenes/Friends'
import JitsiMeeting from 'app/scenes/JitsiMeeting'
import Language from 'app/scenes/Language'
import LearningHistory from 'app/scenes/LearningHistory'
import NotificationDetail from 'app/scenes/NotificationDetail'
import OverviewInfo from 'app/scenes/OverviewInfo'
import Payment from 'app/scenes/Payment'
import Policy from 'app/scenes/Policy'
import ProfileInfo from 'app/scenes/ProfileInfo'
import ProfileOverview from 'app/scenes/ProfileOverview'
import Support from 'app/scenes/Support'
import TeacherInfo from 'app/scenes/TeacherDetail'
import TransactionList from 'app/scenes/TransactionList'
import Voucher from 'app/scenes/Voucher'
import Wishlist from 'app/scenes/Wishlist'
import Chat from 'app/scenes/chat'
import { svgMessage } from 'assets/svg'
import React from 'react'

import {
    TransitionPresets,
    createStackNavigator
} from '@react-navigation/stack'
import { Pressable } from 'react-native'
import { SvgXml } from 'react-native-svg'

import TabNavigator from './tab-navigator'
import HeaderBack from 'app/components/header-back'
import HeaderTitle from 'app/components/header-title'
import ChatDetail from 'app/scenes/chat-detail'

const Stack = createStackNavigator()
const AppNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    elevation: 0,
                    borderBottomWidth: 1,
                    borderBottomColor: '#f0f0f0'
                },
                cardStyle: { backgroundColor: '#fff' },
                ...TransitionPresets.SlideFromRightIOS,
                headerTitleAlign: 'center'
            }}>
            <Stack.Screen
                name={'Tab'}
                component={TabNavigator}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name={ROUTES.CourseInfo}
                component={CourseDetails}
                options={({ route, navigation }) => ({
                    headerTitle: () => (
                        <HeaderTitle title={'Gi???i thi???u kh??a h???c'} />
                    ),
                    headerLeft: () => <HeaderBack />
                })}
            />
            <Stack.Screen
                name={ROUTES.CourseDetail}
                component={CourseContents}
                options={({ route, navigation }) => ({
                    headerLeft: () => <HeaderBack whiteBg={true} />,
                    headerRight: () => (
                        <Pressable
                            onPress={() => navigation.navigate(ROUTES.Chat)}
                            hitSlop={15}
                            style={[
                                STYLES.boxShadow,
                                {
                                    marginRight: scale(7),
                                    padding: scale(4),
                                    borderRadius: scale(11),
                                    shadowOpacity: 0.3
                                }
                            ]}>
                            <SvgXml
                                xml={svgMessage}
                                width={scale(24)}
                                height={scale(24)}
                            />
                        </Pressable>
                    )
                })}
            />
            <Stack.Screen
                name={ROUTES.Chat}
                component={Chat}
                options={({ route, navigation }) => ({
                    headerTitle: () => <HeaderTitle title={'B???n c??ng h???c'} />,
                    headerLeft: () => <HeaderBack />
                })}
            />
            <Stack.Screen
                name={ROUTES.ChatDetail}
                component={ChatDetail}
                options={({ route, navigation }) => ({
                    headerTitle: () => (
                        <HeaderTitle title={'Tr?? chuy???n nh??m'} />
                    ),
                    headerLeft: () => <HeaderBack />
                })}
            />
            <Stack.Screen
                name={ROUTES.TeacherInfo}
                component={TeacherInfo}
                options={({ route, navigation }) => ({
                    headerShown: false
                })}
            />
            <Stack.Screen
                name={ROUTES.Overview}
                component={OverviewInfo}
                options={({ route, navigation }) => ({
                    headerTitle: () => (
                        <HeaderTitle title={'Trang t???ng quan'} />
                    ),
                    headerLeft: () => <HeaderBack />
                })}
            />
            <Stack.Screen
                name={ROUTES.NotificationDetail}
                component={NotificationDetail}
                options={({ route, navigation }) => ({
                    headerTitle: () => (
                        <HeaderTitle title={'Chi ti???t th??ng b??o'} />
                    ),
                    headerLeft: () => <HeaderBack />
                })}
            />
            <Stack.Screen
                name={ROUTES.ProfileOverview}
                component={ProfileOverview}
                options={({ route, navigation }) => ({
                    headerTitle: () => <HeaderTitle title={'H??? s?? h???c t???p'} />,
                    headerLeft: () => <HeaderBack />
                })}
            />

            <Stack.Screen
                name={ROUTES.Wishlist}
                component={Wishlist}
                options={({ route, navigation }) => ({
                    headerTitle: () => <HeaderTitle title={'???? y??u th??ch'} />,
                    headerLeft: () => <HeaderBack />
                })}
            />

            <Stack.Screen
                name={ROUTES.Friends}
                component={Friends}
                options={({ route, navigation }) => ({
                    headerTitle: () => <HeaderTitle title={'B???n b??'} />,
                    headerLeft: () => <HeaderBack />
                })}
            />

            <Stack.Screen
                name={ROUTES.CoursesByUser}
                component={CoursesByUser}
                options={({ route, navigation }) => ({
                    headerTitle: () => (
                        <HeaderTitle title={'Kh??a h???c hi???n c??'} />
                    ),
                    headerLeft: () => <HeaderBack />
                })}
            />

            <Stack.Screen
                name={ROUTES.ConnectInstructors}
                component={ConnectInstructors}
                options={({ route, navigation }) => ({
                    headerShown: false
                })}
            />

            <Stack.Screen
                name={ROUTES.ConnectInstructorHistory}
                component={ConnectInstructorHistory}
                options={({ route, navigation }) => ({
                    headerTitle: () => (
                        <HeaderTitle title={'L???ch s??? k???t n???i'} />
                    ),
                    headerLeft: () => <HeaderBack />
                })}
            />

            <Stack.Screen
                name={ROUTES.Carts}
                component={Carts}
                options={({ route, navigation }) => ({
                    headerTitle: () => <HeaderTitle title={'Gi??? h??ng'} />,
                    headerLeft: () => <HeaderBack />
                })}
            />
            <Stack.Screen
                name={ROUTES.Payment}
                component={Payment}
                options={({ route, navigation }) => ({
                    headerTitle: () => <HeaderTitle title={'Thanh to??n'} />,
                    headerLeft: () => <HeaderBack />
                })}
            />
            <Stack.Screen
                name={ROUTES.Voucher}
                component={Voucher}
                options={({ route, navigation }) => ({
                    headerTitle: () => (
                        <HeaderTitle title={'Ch???n SE voucher'} />
                    ),
                    headerLeft: () => <HeaderBack />
                })}
            />
            <Stack.Screen
                name={ROUTES.EditProfile}
                component={EditProfile}
                options={({ route, navigation }) => ({
                    headerTitle: () => (
                        <HeaderTitle title={'Thay ?????i th??ng tin'} />
                    ),
                    headerLeft: () => <HeaderBack />
                })}
            />
            <Stack.Screen
                name={ROUTES.ProfileInfo}
                component={ProfileInfo}
                options={({ route, navigation }) => ({
                    headerTitle: () => (
                        <HeaderTitle title={'Th??ng tin c?? nh??n'} />
                    ),
                    headerLeft: () => <HeaderBack />
                })}
            />
            <Stack.Screen
                name={ROUTES.Policy}
                component={Policy}
                options={({ route, navigation }) => ({
                    headerTitle: () => (
                        <HeaderTitle title={'Ch??nh s??ch ??i???u kho???n'} />
                    ),
                    headerLeft: () => <HeaderBack />
                })}
            />
            <Stack.Screen
                name={ROUTES.Language}
                component={Language}
                options={({ route, navigation }) => ({
                    headerTitle: () => (
                        <HeaderTitle title="Th??ng tin ???ng d???ng" />
                    ),
                    headerLeft: () => <HeaderBack />
                })}
            />
            <Stack.Screen
                name={ROUTES.Support}
                component={Support}
                options={({ route, navigation }) => ({
                    headerTitle: () => (
                        <HeaderTitle title={'Tr??? gi??p v?? h??? tr???'} />
                    ),
                    headerLeft: () => <HeaderBack />
                })}
            />
            <Stack.Screen
                name={ROUTES.JitsiMeeting}
                component={JitsiMeeting}
                options={({ route, navigation }) => ({
                    headerTitle: () => (
                        <HeaderTitle title={'Tr??? gi??p v?? h??? tr???'} />
                    ),
                    headerLeft: () => <HeaderBack />
                })}
            />
            <Stack.Screen
                name={ROUTES.LearningHistory}
                component={LearningHistory}
                options={({ route, navigation }) => ({
                    headerTitle: () => (
                        <HeaderTitle title={'Qu?? tr??nh h???c t???p'} />
                    ),
                    headerLeft: () => <HeaderBack />
                })}
            />
            <Stack.Screen
                name={ROUTES.CertificateList}
                component={CertificateList}
                options={({ route, navigation }) => ({
                    headerTitle: () => (
                        <HeaderTitle title={'Ch???ng ch??? hi???n c??'} />
                    ),
                    headerLeft: () => <HeaderBack />
                })}
            />
            <Stack.Screen
                name={ROUTES.TransactionList}
                component={TransactionList}
                options={({ route, navigation }) => ({
                    headerTitle: () => (
                        <HeaderTitle title={'L???ch s??? giao d???ch'} />
                    ),
                    headerLeft: () => <HeaderBack />
                })}
            />
        </Stack.Navigator>
    )
}

export default AppNavigator
