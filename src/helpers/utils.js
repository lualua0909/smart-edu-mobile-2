import { LayoutAnimation } from 'react-native'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { setGlobalState } from 'app/Store'
import EncryptedStorage from 'react-native-encrypted-storage'
import AsyncStorage from '@react-native-async-storage/async-storage'

require('dayjs/locale/vi')
dayjs.extend(relativeTime)

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
                property: LayoutAnimation.Properties.opacity,
            },
            update: {
                type: LayoutAnimation.Types.easeInEaseOut,
            },
            delete: {
                type: LayoutAnimation.Types.easeInEaseOut,
                property: LayoutAnimation.Properties.opacity,
            },
        })
    },
    Platform.select({ ios: 200, android: 350 }),
    true
)

export const toCurrency = (value) => {
    return String(value || 0).replace(/(.)(?=(\d{3})+$)/g, '$1,')
}

export const toRelativeTime = (date, noSuffix = false) => {
    return noSuffix
        ? dayjs(date).locale('vi').fromNow(true).replace('năm', '')
        : dayjs(date).locale('vi').fromNow(false)
}

export const clearDataAfterLogout = () => {
    setGlobalState('userInfo', null)
    setGlobalState('dashboardInfo', null)
    EncryptedStorage.removeItem('@userInfo')
}

function editDistance(s1, s2) {
    s1 = s1.toLowerCase()
    s2 = s2.toLowerCase()

    var costs = new Array()
    for (var i = 0; i <= s1.length; i++) {
        var lastValue = i
        for (var j = 0; j <= s2.length; j++) {
            if (i == 0) costs[j] = j
            else {
                if (j > 0) {
                    var newValue = costs[j - 1]
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
    var longer = s1
    var shorter = s2
    if (s1.length < s2.length) {
        longer = s2
        shorter = s1
    }
    var longerLength = longer.length
    if (longerLength == 0) {
        return 1.0
    }
    return (
        ((longerLength - editDistance(longer, shorter)) /
            parseFloat(longerLength)) *
        100.0
    ).toFixed(0)
}

export const storeData = async (key, value) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(key, jsonValue)
    } catch (e) {
        // saving error
    }
}

export const getData = async (key) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key)
        return jsonValue != null ? JSON.parse(jsonValue) : null
    } catch (e) {
        // error reading value
        console.error(e)
    }
}

export const hashing = (s) => {
    return s.split('').reduce((a, b) => {
        a = (a << 5) - a + b.charCodeAt(0)
        return a & a
    }, 0)
}
