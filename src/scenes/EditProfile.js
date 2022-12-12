import React, { useState } from 'react'
import { View, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import EditPhone from 'app/components/EditPhone'
import EditGender from 'app/components/EditGender'
import EditBirthday from 'app/components/EditBirthday'
import EditPassword from 'app/components/EditPassword'
import SystemInfo from 'app/components/SystemInfo'
import CompanyInfo from 'app/components/CompanyInfo'
import UserInfo from 'app/components/UserInfo'

const EditProfile = () => {
    const navigation = useNavigation()
    const [isEditGender, setIsEditGender] = useState(false)
    const [isEditPhone, setIsEditPhone] = useState(false)
    const [isEditPassword, setIsEditPassword] = useState(false)
    const [isEditBirthday, setIsEditBirthday] = useState(false)
    const [gender, setGender] = useState(true)
    const [viewHeight, setViewHeight] = useState({
        footer: 0,
    })

    const onEditPhone = () => {
        setIsEditPhone(!isEditPhone)
    }
    const onSubmitEditPhone = () => {
        onEditPhone()
    }

    const onEditGender = () => {
        setIsEditGender(!isEditGender)
    }
    const onSubmitEditGender = () => {
        onEditGender()
    }
    const onEditPassword = () => {
        setIsEditPassword(!isEditPassword)
    }
    const onSubmitEditPassword = () => {
        onEditPassword()
    }
    const onEditBirthday = () => {
        setIsEditBirthday(!isEditBirthday)
    }
    const onSubmitEditBirthday = () => {
        onEditBirthday()
    }
    return (
        <View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                stickyHeaderIndices={[1]}
                style={{ backgroundColor: '#E5E5E5' }}
            >
                <View>
                    <CompanyInfo />
                    <UserInfo
                        onEditBirthday={onEditBirthday}
                        onEditGender={onEditGender}
                        onEditPassword={onEditPassword}
                        onEditPhone={onSubmitEditPhone}
                    />
                    <SystemInfo />
                </View>
            </ScrollView>
            <EditPhone isVisible={isEditPhone} onSubmit={onSubmitEditPhone} />
            <EditGender
                isVisible={isEditGender}
                onSubmit={onSubmitEditGender}
                gender={gender}
                setGender={setGender}
            />
            <EditPassword
                isVisible={isEditPassword}
                onSubmit={onSubmitEditPassword}
            />
            <EditBirthday
                isVisible={isEditBirthday}
                onSubmit={onSubmitEditBirthday}
            />
        </View>
    )
}

export default EditProfile
