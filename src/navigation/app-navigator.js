import LeaderBoardComponent from 'app/components/Leaderboard'
import EntranceTest from 'app/components/source_12skill/EntranceTest'
import IntroductionPreTest from 'app/components/source_12skill/IntroductionPreTest'
import LearningPath from 'app/components/source_12skill/LearningPath'
import ChartsComponent from 'app/components/source_12skill/radarChart'
import TestResult from 'app/components/source_12skill/result'
import StagesView from 'app/components/source_12skill/stagesComponent/StagesView'
import { ROUTES } from 'app/constants'
import { scale } from 'app/helpers/responsive'
import { isAndroid } from 'app/helpers/utils'
import Carts from 'app/scenes/Carts'
import CertificateList from 'app/scenes/CertificateList'
import ConnectInstructorHistory from 'app/scenes/ConnectInstructorHistory'
import ConnectInstructors from 'app/scenes/ConnectInstructors'
import ConversationDetail from 'app/scenes/ConversationDetail'
import Course12SkillList from 'app/scenes/Course12SkillList'
import CourseContents from 'app/scenes/CourseContents'
import CourseDetails from 'app/scenes/CourseDetails'
import CoursesByUser from 'app/scenes/CoursesByUser'
import Friends from 'app/scenes/Friends'
import JitsiMeeting from 'app/scenes/JitsiMeeting'
import Language from 'app/scenes/Language'
import LearningHistory from 'app/scenes/LearningHistory'
import MyOfflineScheduleScreen from 'app/scenes/MyOfflineSchedule'
import NotificationDetail from 'app/scenes/NotificationDetail'
import OverviewInfo from 'app/scenes/OverviewInfo'
import PackagePaymentScreen from 'app/scenes/PackagePayment'
import Payment from 'app/scenes/Payment'
import Policy from 'app/scenes/Policy'
import ProfileInfo from 'app/scenes/ProfileInfo'
import ProfileOverview from 'app/scenes/ProfileOverview'
import Support from 'app/scenes/Support'
import Survey from 'app/scenes/Survey'
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
import { List } from 'react-native-feather'
import { withIAPContext } from 'react-native-iap'
import { SvgXml } from 'react-native-svg'

import TabNavigator from './tab-navigator'
import HeaderBack from 'app/components/header-back'
import HeaderTitle from 'app/components/header-title'

import IntroductionVideo from '../components/source_12skill/IntroductionVideo'

const Stack = createStackNavigator()
const AppNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    elevation: 0
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
                component={
                    isAndroid ? CourseDetails : withIAPContext(CourseDetails)
                }
                options={({ route, navigation }) => ({
                    headerTitle: () => (
                        <HeaderTitle title={'Giới thiệu khóa học'} />
                    ),
                    headerLeft: () => <HeaderBack />
                })}
            />
            <Stack.Screen
                name={ROUTES.CourseInfo2}
                component={
                    isAndroid ? CourseDetails : withIAPContext(CourseDetails)
                }
                options={({ route, navigation }) => ({
                    headerTitle: () => (
                        <HeaderTitle title={'Giới thiệu khóa học'} />
                    ),
                    headerLeft: () => <HeaderBack />
                })}
            />
            <Stack.Screen
                name={ROUTES.VideoIntroduction}
                component={IntroductionVideo}
                options={({ route, navigation }) => ({
                    headerTitle: () => (
                        <HeaderTitle title={'Video hướng dẫn'} />
                    ),
                    headerLeft: () => <HeaderBack />
                })}
            />
            <Stack.Screen
                name={ROUTES.CourseDetail}
                component={CourseContents}
                options={({ route, navigation }) => ({
                    headerTitle: () => <HeaderTitle title={''} />,
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
                name={ROUTES.CourseDetailTrial}
                component={CourseContents}
                options={({ route, navigation }) => ({
                    headerTitle: () => <HeaderTitle title={'Học thử'} />,
                    headerLeft: () => <HeaderBack whiteBg={true} />
                })}
            />
            <Stack.Screen
                name={ROUTES.Chat}
                component={Chat}
                options={({ route, navigation }) => ({
                    headerTitle: () => <HeaderTitle title={'Bạn cùng học'} />,
                    headerLeft: () => <HeaderBack />
                })}
            />
            <Stack.Screen
                name={ROUTES.ConversationDetail}
                component={ConversationDetail}
                options={({ route, navigation }) => ({
                    headerTitle: () => (
                        <HeaderTitle title={'Trò chuyện nhóm'} />
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
                        <HeaderTitle title={'Trang tổng quan'} />
                    ),
                    headerLeft: () => <HeaderBack />
                })}
            />
            <Stack.Screen
                name={ROUTES.NotificationDetail}
                component={NotificationDetail}
                options={({ route, navigation }) => ({
                    headerTitle: () => (
                        <HeaderTitle title={'Chi tiết thông báo'} />
                    ),
                    headerLeft: () => <HeaderBack />
                })}
            />
            <Stack.Group>
                <Stack.Screen
                    name={ROUTES.ProfileOverview}
                    component={ProfileOverview}
                    options={({ route, navigation }) => ({
                        headerTitle: () => (
                            <HeaderTitle title={'Hồ sơ học tập'} />
                        ),
                        headerLeft: () => <HeaderBack />
                    })}
                />
                <Stack.Screen
                    name="MyCourses"
                    component={CoursesByUser}
                    options={({ route, navigation }) => ({
                        headerTitle: () => (
                            <HeaderTitle title={'Khóa học của tôi'} />
                        ),
                        headerLeft: () => <HeaderBack />
                    })}
                />
                <Stack.Screen
                    name="MyCertificates"
                    component={CertificateList}
                    options={({ route, navigation }) => ({
                        headerTitle: () => (
                            <HeaderTitle title={'Danh sách chứng chỉ'} />
                        ),
                        headerLeft: () => <HeaderBack />
                    })}
                />
                <Stack.Screen
                    name="MyOfflineSchedule"
                    component={MyOfflineScheduleScreen}
                    options={({ route, navigation }) => ({
                        headerTitle: () => (
                            <HeaderTitle title={'Lịch học offline'} />
                        )
                    })}
                />
                <Stack.Screen
                    name="FriendList"
                    component={Friends}
                    options={({ route, navigation }) => ({
                        headerTitle: () => (
                            <HeaderTitle title={'Danh sách bạn bè'} />
                        )
                    })}
                />
            </Stack.Group>

            <Stack.Screen
                name={ROUTES.Wishlist}
                component={Wishlist}
                options={({ route, navigation }) => ({
                    headerTitle: () => <HeaderTitle title={'Đã yêu thích'} />,
                    headerLeft: () => <HeaderBack />
                })}
            />

            <Stack.Screen
                name={ROUTES.Friends}
                component={Friends}
                options={({ route, navigation }) => ({
                    headerTitle: () => <HeaderTitle title={'Bạn bè'} />,
                    headerLeft: () => <HeaderBack />
                })}
            />

            <Stack.Screen
                name={ROUTES.CoursesByUser}
                component={CoursesByUser}
                options={({ route, navigation }) => ({
                    headerTitle: () => (
                        <HeaderTitle title={'Khóa học hiện có'} />
                    ),
                    headerLeft: () => <HeaderBack />
                })}
            />

            <Stack.Screen
                name={ROUTES.Course12Skill}
                component={Course12SkillList}
                options={({ route, navigation }) => ({
                    headerTitle: () => (
                        <HeaderTitle title={'Khóa học theo lộ trình'} />
                    ),
                    headerLeft: () => <HeaderBack />
                })}
            />
            <Stack.Screen
                name={ROUTES.EntranceTest}
                component={EntranceTest}
                options={({ route, navigation }) => ({
                    headerTitle: () => (
                        <HeaderTitle title={'Bài kiểm tra đầu vào'} />
                    ),
                    headerLeft: () => <HeaderBack />
                })}
            />
            <Stack.Screen
                name={ROUTES.InputTestResult}
                component={TestResult}
                options={({ route, navigation }) => ({
                    headerTitle: () => (
                        <HeaderTitle title={route.params.title} />
                    ),
                    headerLeft: () => <HeaderBack />
                })}
            />
            <Stack.Screen
                name={ROUTES.ChartTestResult}
                component={ChartsComponent}
                options={({ route, navigation }) => ({
                    headerTitle: () => (
                        <HeaderTitle title={'Biểu đồ kỹ năng'} />
                    ),
                    headerLeft: () => <HeaderBack />
                })}
            />
            <Stack.Screen
                name={ROUTES.Leaderboard}
                component={LeaderBoardComponent}
                options={({ route, navigation }) => ({
                    headerTitle: () => (
                        <HeaderTitle title={'Biểu đồ kỹ năng'} />
                    ),
                    headerLeft: () => <HeaderBack />
                })}
            />
            <Stack.Screen
                name={ROUTES.StagesView}
                component={StagesView}
                options={({ route, navigation }) => ({
                    headerTitle: () => (
                        <HeaderTitle title={route.params.title} />
                    ),
                    headerLeft: () => <HeaderBack />
                })}
            />

            <Stack.Screen
                name={ROUTES.IntroductionPreTest}
                component={IntroductionPreTest}
                options={({ route, navigation }) => ({
                    headerTitle: () => <HeaderTitle title={'Giới thiệu'} />,
                    headerLeft: () => <HeaderBack />
                })}
            />

            <Stack.Screen
                name={ROUTES.LearningPath}
                component={LearningPath}
                options={({ route, navigation }) => ({
                    headerTitle: () => (
                        <HeaderTitle title={'Lộ trình học tập'} />
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
                        <HeaderTitle title={'Lịch sử kết nối'} />
                    ),
                    headerLeft: () => <HeaderBack />
                })}
            />

            <Stack.Screen
                name={ROUTES.Carts}
                component={Carts}
                options={({ route, navigation }) => ({
                    headerTitle: () => <HeaderTitle title={'Giỏ hàng'} />,
                    headerLeft: () => <HeaderBack />
                })}
            />
            <Stack.Screen
                name={ROUTES.Payment}
                component={Payment}
                options={({ route, navigation }) => ({
                    headerTitle: () => <HeaderTitle title={'Thanh toán'} />,
                    headerLeft: () => <HeaderBack />
                })}
            />
            <Stack.Screen
                name="PackagePayment"
                component={PackagePaymentScreen}
                options={({ route, navigation }) => ({
                    headerTitle: () => <HeaderTitle title={'Thanh toán'} />,
                    headerLeft: () => <HeaderBack />
                })}
            />
            <Stack.Screen
                name={ROUTES.Voucher}
                component={Voucher}
                options={({ route, navigation }) => ({
                    headerTitle: () => (
                        <HeaderTitle title={'Chọn SE voucher'} />
                    ),
                    headerLeft: () => <HeaderBack />
                })}
            />
            <Stack.Screen
                name={ROUTES.ProfileInfo}
                component={ProfileInfo}
                options={({ route, navigation }) => ({
                    headerTitle: () => (
                        <HeaderTitle title={'Thông tin cá nhân'} />
                    ),
                    headerLeft: () => <HeaderBack />
                })}
            />
            <Stack.Screen
                name={ROUTES.Policy}
                component={Policy}
                options={({ route, navigation }) => ({
                    headerTitle: () => (
                        <HeaderTitle title={'Chính sách điều khoản'} />
                    ),
                    headerLeft: () => <HeaderBack />
                })}
            />
            <Stack.Screen
                name={ROUTES.Language}
                component={Language}
                options={({ route, navigation }) => ({
                    headerTitle: () => (
                        <HeaderTitle title="Thông tin ứng dụng" />
                    ),
                    headerLeft: () => <HeaderBack />
                })}
            />
            <Stack.Screen
                name={ROUTES.Support}
                component={Support}
                options={({ route, navigation }) => ({
                    headerTitle: () => (
                        <HeaderTitle title={'Trợ giúp và hỗ trợ'} />
                    ),
                    headerLeft: () => <HeaderBack />
                })}
            />
            <Stack.Screen
                name={ROUTES.JitsiMeeting}
                component={JitsiMeeting}
                options={({ route, navigation }) => ({
                    headerTitle: () => (
                        <HeaderTitle title={'Trợ giúp và hỗ trợ'} />
                    ),
                    headerLeft: () => <HeaderBack />
                })}
            />
            <Stack.Screen
                name={ROUTES.LearningHistory}
                component={LearningHistory}
                options={({ route, navigation }) => ({
                    headerTitle: () => (
                        <HeaderTitle title={'Quá trình học tập'} />
                    ),
                    headerLeft: () => <HeaderBack />
                })}
            />
            <Stack.Screen
                name={ROUTES.CertificateList}
                component={CertificateList}
                options={({ route, navigation }) => ({
                    headerTitle: () => (
                        <HeaderTitle title={'Chứng chỉ hiện có'} />
                    ),
                    headerLeft: () => <HeaderBack />
                })}
            />
            <Stack.Screen
                name={ROUTES.TransactionList}
                component={TransactionList}
                options={({ route, navigation }) => ({
                    headerTitle: () => (
                        <HeaderTitle title={'Lịch sử giao dịch'} />
                    ),
                    headerLeft: () => <HeaderBack />
                })}
            />
            <Stack.Screen
                name={ROUTES.Survey}
                component={Survey}
                options={({ route, navigation }) => ({
                    headerTitle: () => <HeaderTitle title={'Khảo sát'} />,
                    headerLeft: () => <HeaderBack />
                })}
            />
        </Stack.Navigator>
    )
}

export default AppNavigator
