import { useGlobalState } from 'app/Store'
import { API_URL } from 'app/constants'
import React, { useState } from 'react'

import { Image, StyleSheet } from 'react-native'

const AvatarImage = ({ userId, isSquare, size = 84 }) => {
    const [userInfoState, _] = useGlobalState('userInfo')
    const [isError, setIsError] = useState(false)

    return (
        <Image
            source={{
                uri: isError
                    ? `https://api.dicebear.com/7.x/micah/webp?seed=${
                          userId || userInfoState?.id
                      }`
                    : `${API_URL}public/user-avatars/${
                          userId || userInfoState?.id
                      }.webp`
            }}
            alt={'image'}
            style={[
                {
                    width: size,
                    height: size,
                    backgroundColor: '#FCFCFC'
                },
                isSquare ? styles.default : styles.avatar
            ]}
            onError={e => setIsError(true)}
        />
    )
}

export default AvatarImage

const styles = StyleSheet.create({
    avatar: {
        borderRadius: 100,
        borderWidth: 1,
        borderColor: '#E1E1E1'
    },
    default: {
        borderRadius: 5
    }
})
