import { setGlobalState } from 'app/Store'
import { ROUTES } from 'app/constants'
import storage from 'app/localStorage'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import { LayoutAnimation, Platform } from 'react-native'

require('dayjs/locale/vi')
dayjs.extend(relativeTime)

export const isAndroid = Platform.OS === 'android'
export const isIOS = Platform.OS === 'ios'

export const debounce = (func, wait, immediate) => {
    var timeout
    return function () {
        var context = this,
            args = arguments
        clearTimeout(timeout)
        timeout = setTimeout(function () {
            timeout = null
            if (!immediate) func.apply(context, args)
        }, wait)
        if (immediate && !timeout) func.apply(context, args)
    }
}

export const animateNextTransition = debounce(
    () => {
        LayoutAnimation.configureNext({
            duration: Platform.select({ ios: 200, android: 350 }),
            create: {
                type: LayoutAnimation.Types.easeInEaseOut,
                property: LayoutAnimation.Properties.opacity
            },
            update: {
                type: LayoutAnimation.Types.easeInEaseOut
            },
            delete: {
                type: LayoutAnimation.Types.easeInEaseOut,
                property: LayoutAnimation.Properties.opacity
            }
        })
    },
    Platform.select({ ios: 200, android: 350 }),
    true
)

export const toCurrency = value => {
    return String(value || 0).replace(/(.)(?=(\d{3})+$)/g, '$1,')
}

export const toRelativeTime = (date, noSuffix = false) => {
    return noSuffix
        ? dayjs(date).locale('vi').fromNow(true).replace('năm', '')
        : dayjs(date).locale('vi').fromNow(false)
}

export const clearDataAfterLogout = (route = null) => {
    if (route) {
        setGlobalState('defaultRoute', route)
    } else {
        setGlobalState('defaultRoute', ROUTES.Login)
    }
    setGlobalState('userInfo', null)
    setGlobalState('dashboardInfo', null)
    storage.delete('@userInfo')
}

const editDistance = (s1, s2) => {
    s1 = s1.toLowerCase()
    s2 = s2.toLowerCase()

    let costs = new Array()
    for (let i = 0; i <= s1.length; i++) {
        let lastValue = i
        for (let j = 0; j <= s2.length; j++) {
            if (i == 0) costs[j] = j
            else {
                if (j > 0) {
                    let newValue = costs[j - 1]
                    if (s1.charAt(i - 1) != s2.charAt(j - 1))
                        newValue =
                            Math.min(Math.min(newValue, lastValue), costs[j]) +
                            1
                    costs[j - 1] = lastValue
                    lastValue = newValue
                }
            }
        }
        if (i > 0) costs[s2.length] = lastValue
    }
    return costs[s2.length]
}

export const similarityString = (s1, s2) => {
    let longer = s1
    let shorter = s2
    if (s1.length < s2.length) {
        longer = s2
        shorter = s1
    }
    const longerLength = longer.length
    if (longerLength == 0) {
        return 1.0
    }
    return (
        ((longerLength - editDistance(longer, shorter)) /
            parseFloat(longerLength)) *
        100.0
    ).toFixed(0)
}

export const storeData = (key, value) => {
    storage.set(key, JSON.stringify(value))
}

export const getData = key => {
    try {
        const jsonValue = storage.getString(key)
        return jsonValue != null ? JSON.parse(jsonValue) : null
    } catch (e) {
        // error reading value
        console.error(e)
    }
}

export const hashing = s => {
    return s.split('').reduce((a, b) => {
        a = (a << 5) - a + b.charCodeAt(0)
        return a & a
    }, 0)
}

export const errorLog = ({ message, error }) => {
    console.error('An error happened', message, error)
}
