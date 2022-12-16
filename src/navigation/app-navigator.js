import React from 'react'
import {
    createStackNavigator,
    TransitionPresets,
} from '@react-navigation/stack'
import TabNavigator from './tab-navigator'
import { ROUTES } from 'app/constants'
import HeaderTitle from 'app/components/header-title'
import HeaderBack from 'app/components/header-back'

import CourseContents from 'app/scenes/CourseContents'
import CourseDetails from 'app/scenes/CourseDetails'
import Chat from 'app/scenes/chat'
import ChatDetail from 'app/scenes/chat-detail'
import TeacherInfo from 'app/scenes/TeacherDetail'
import OverviewInfo from 'app/scenes/OverviewInfo'
import NotificationDetail from 'app/scenes/NotificationDetail'
import ProfileOverview from 'app/scenes/ProfileOverview'
import Wishlist from 'app/scenes/Wishlist'
import Friends from 'app/scenes/Friends'
import CoursesByUser from 'app/scenes/CoursesByUser'
import ConnectInstructors from 'app/scenes/ConnectInstructors'
import ConnectInstructorHistory from 'app/scenes/ConnectInstructorHistory'
import Carts from 'app/scenes/Carts'
import Payment from 'app/scenes/Payment'
import Voucher from 'app/scenes/Voucher'
import ProfileInfo from 'app/scenes/ProfileInfo'
import EditProfile from 'app/scenes/EditProfile'
import Policy from 'app/scenes/Policy'
import Language from 'app/scenes/Language'
import Support from 'app/scenes/Support'
import JitsiMeeting from 'app/scenes/JitsiMeeting'
import LearningHistory from 'app/scenes/LearningHistory'
import CertificateList from 'app/scenes/CertificateList'
import TransactionList from 'app/scenes/TransactionList'

const Stack = createStackNavigator()
const AppNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    elevation: 0,
                    borderBottomWidth: 1,
                    borderBottomColor: '#f0f0f0',
                },
                cardStyle: { backgroundColor: '#fff' },
                ...TransitionPresets.SlideFromRightIOS,
                headerTitleAlign: 'center',
            }}
        >
            <Stack.Screen
                name={'Tab'}
                component={TabNavigator}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name={ROUTES.CourseInfo}
                component={CourseDetails}
                options={({ route, navigation }) => ({
                    headerTitle: () => (
                        <HeaderTitle title={'Giới thiệu khóa học'} />
                    ),
                    headerLeft: () => <HeaderBack />,
                })}
            />
            <Stack.Screen
                name={ROUTES.CourseDetail}
                component={CourseContents}
                options={({ route, navigation }) => ({
                    headerLeft: () => <HeaderBack whiteBg={true} />,
                    // headerRight: () => (
                    //     <Pressable
                    //         onPress={() => navigation.navigate(ROUTES.Chat)}
                    //         hitSlop={15}
                    //         style={[
                    //             STYLES.boxShadow,
                    //             {
                    //                 marginRight: scale(7),
                    //                 padding: scale(4),
                    //                 borderRadius: scale(11),
                    //                 shadowOpacity: 0.3,
                    //             },
                    //         ]}
                    //     >
                    //         <SvgXml
                    //             xml={svgMessage}
                    //             width={scale(24)}
                    //             height={scale(24)}
                    //         />
                    //     </Pressable>
                    // ),
                })}
            />
            <Stack.Screen
                name={ROUTES.Chat}
                component={Chat}
                options={({ route, navigation }) => ({
                    headerTitle: () => <HeaderTitle title={'Chat'} />,
                    headerLeft: () => <HeaderBack />,
                })}
            />
            <Stack.Screen
                name={ROUTES.ChatDetail}
                component={ChatDetail}
                options={({ route, navigation }) => ({
                    headerTitle: () => <HeaderTitle title={'Chat detail'} />,
                    headerLeft: () => <HeaderBack />,
                })}
            />
            <Stack.Screen
                name={ROUTES.TeacherInfo}
                component={TeacherInfo}
                options={({ route, navigation }) => ({
                    headerShown: false,
                })}
            />
            <Stack.Screen
                name={ROUTES.Overview}
                component={OverviewInfo}
                options={({ route, navigation }) => ({
                    headerTitle: () => (
                        <HeaderTitle title={'Trang tổng quan'} />
                    ),
                    headerLeft: () => <HeaderBack />,
                })}
            />
            <Stack.Screen
                name={ROUTES.NotificationDetail}
                component={NotificationDetail}
                options={({ route, navigation }) => ({
                    headerTitle: () => (
                        <HeaderTitle title={'Chi tiết thông báo'} />
                    ),
                    headerLeft: () => <HeaderBack />,
                })}
            />
            <Stack.Screen
                name={ROUTES.ProfileOverview}
                component={ProfileOverview}
                options={({ route, navigation }) => ({
                    headerTitle: () => <HeaderTitle title={'Hồ sơ học tập'} />,
                    headerLeft: () => <HeaderBack />,
                })}
            />

            <Stack.Screen
                name={ROUTES.Wishlist}
                component={Wishlist}
                options={({ route, navigation }) => ({
                    headerTitle: () => <HeaderTitle title={'Đã yêu thích'} />,
                    headerLeft: () => <HeaderBack />,
                })}
            />

            <Stack.Screen
                name={ROUTES.Friends}
                component={Friends}
                options={({ route, navigation }) => ({
                    headerTitle: () => <HeaderTitle title={'Bạn bè'} />,
                    headerLeft: () => <HeaderBack />,
                })}
            />

            <Stack.Screen
                name={ROUTES.CoursesByUser}
                component={CoursesByUser}
                options={({ route, navigation }) => ({
                    headerTitle: () => (
                        <HeaderTitle title={'Khóa học hiện có'} />
                    ),
                    headerLeft: () => <HeaderBack />,
                })}
            />

            <Stack.Screen
                name={ROUTES.ConnectInstructors}
                component={ConnectInstructors}
                options={({ route, navigation }) => ({
                    headerShown: false,
                })}
            />

            <Stack.Screen
                name={ROUTES.ConnectInstructorHistory}
                component={ConnectInstructorHistory}
                options={({ route, navigation }) => ({
                    headerTitle: () => (
                        <HeaderTitle title={'Lịch sử kết nối'} />
                    ),
                    headerLeft: () => <HeaderBack />,
                })}
            />

            <Stack.Screen
                name={ROUTES.Carts}
                component={Carts}
                options={({ route, navigation }) => ({
                    headerTitle: () => <HeaderTitle title={'Giỏ hàng'} />,
                    headerLeft: () => <HeaderBack />,
                })}
            />
            <Stack.Screen
                name={ROUTES.Payment}
                component={Payment}
                options={({ route, navigation }) => ({
                    headerTitle: () => <HeaderTitle title={'Thanh toán'} />,
                    headerLeft: () => <HeaderBack />,
                })}
            />
            <Stack.Screen
                name={ROUTES.Voucher}
                component={Voucher}
                options={({ route, navigation }) => ({
                    headerTitle: () => (
                        <HeaderTitle title={'Chọn SE voucher'} />
                    ),
                    headerLeft: () => <HeaderBack />,
                })}
            />
            <Stack.Screen
                name={ROUTES.EditProfile}
                component={EditProfile}
                options={({ route, navigation }) => ({
                    headerTitle: () => (
                        <HeaderTitle title={'Thay đổi thông tin'} />
                    ),
                    headerLeft: () => <HeaderBack />,
                })}
            />
            <Stack.Screen
                name={ROUTES.ProfileInfo}
                component={ProfileInfo}
                options={({ route, navigation }) => ({
                    headerTitle: () => (
                        <HeaderTitle title={'Thông tin cá nhân'} />
                    ),
                    headerLeft: () => <HeaderBack />,
                })}
            />
            <Stack.Screen
                name={ROUTES.Policy}
                component={Policy}
                options={({ route, navigation }) => ({
                    headerTitle: () => (
                        <HeaderTitle title={'Chính sách điều khoản'} />
                    ),
                    headerLeft: () => <HeaderBack />,
                })}
            />
            <Stack.Screen
                name={ROUTES.Language}
                component={Language}
                options={({ route, navigation }) => ({
                    headerTitle: () => (
                        <HeaderTitle title="Thông tin ứng dụng" />
                    ),
                    headerLeft: () => <HeaderBack />,
                })}
            />
            <Stack.Screen
                name={ROUTES.Support}
                component={Support}
                options={({ route, navigation }) => ({
                    headerTitle: () => (
                        <HeaderTitle title={'Trợ giúp và hỗ trợ'} />
                    ),
                    headerLeft: () => <HeaderBack />,
                })}
            />
            <Stack.Screen
                name={ROUTES.JitsiMeeting}
                component={JitsiMeeting}
                options={({ route, navigation }) => ({
                    headerTitle: () => (
                        <HeaderTitle title={'Trợ giúp và hỗ trợ'} />
                    ),
                    headerLeft: () => <HeaderBack />,
                })}
            />
            <Stack.Screen
                name={ROUTES.LearningHistory}
                component={LearningHistory}
                options={({ route, navigation }) => ({
                    headerTitle: () => (
                        <HeaderTitle title={'Quá trình học tập'} />
                    ),
                    headerLeft: () => <HeaderBack />,
                })}
            />
            <Stack.Screen
                name={ROUTES.CertificateList}
                component={CertificateList}
                options={({ route, navigation }) => ({
                    headerTitle: () => (
                        <HeaderTitle title={'Chứng chỉ hiện có'} />
                    ),
                    headerLeft: () => <HeaderBack />,
                })}
            />
            <Stack.Screen
                name={ROUTES.TransactionList}
                component={TransactionList}
                options={({ route, navigation }) => ({
                    headerTitle: () => (
                        <HeaderTitle title={'Lịch sử giao dịch'} />
                    ),
                    headerLeft: () => <HeaderBack />,
                })}
            />
        </Stack.Navigator>
    )
}

export default AppNavigator
