import { API_URL } from 'app/constants'
import { scale } from 'app/helpers/responsive'
import { useGlobalState } from 'app/Store'
import { Avatar } from 'native-base'
import React from 'react'

const getAcronym = (name) => {
    return name
        .match(/\b(\w)/g)
        .slice(-2)
        .join('')
}

const AvatarImage = ({ name, userId, isSquare = false, size = 84 }) => {
    const [userInfoState, _] = useGlobalState('userInfo')
    const [random, setRandom] = useGlobalState('random')

    return (
        <Avatar
            shadow="5"
            size={size}
            bg="green.700"
            source={{
                uri: `${API_URL}public/user-avatars/${
                    userId || userInfoState?.id
                }.webp?rand=${random}`,
            }}
            _text={{
                fontSize: scale(size / 3),
            }}
            borderRadius={isSquare ? 'md' : null}
            style={[{ borderColor: '#eee', borderWidth: 1 }]}
        >
            {name && getAcronym(name)}
        </Avatar>
    )
}

export default AvatarImage
