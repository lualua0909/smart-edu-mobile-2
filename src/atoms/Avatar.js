import { useGlobalState } from 'app/Store'
import { API_URL } from 'app/constants'
import { scale } from 'app/helpers/responsive'
import React from 'react'

import { Avatar, Image } from 'native-base'

const getAcronym = name => {
    return name
        .match(/\b(\w)/g)
        .slice(-2)
        .join('')
}

const AvatarImage = ({ name, userId, isSquare = false, size = 84 }) => {
    const [userInfoState, _] = useGlobalState('userInfo')
    const [random, _setRandom] = useGlobalState('random')

    return isSquare ? (
        <Image
            source={{
                uri: `${API_URL}public/user-avatars/${
                    userId || userInfoState?.id
                }.webp?rand=${random}`
            }}
            alt="Alternate Text"
            size={size}
        />
    ) : (
        <Avatar
            shadow="5"
            size={size}
            source={{
                uri: `${API_URL}public/user-avatars/${
                    userId || userInfoState?.id
                }.webp?rand=${random}`
            }}
            _text={{
                fontSize: scale(size / 3)
            }}>
            {name && getAcronym(name)}
        </Avatar>
    )
}

export default AvatarImage
