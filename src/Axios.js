import { getGlobalState } from 'app/Store'
import { API_URL } from 'app/constants'
import { clearDataAfterLogout } from 'app/helpers/utils'

import { Alert, Platform, ToastAndroid } from 'react-native'
import axios from 'react-native-axios'

axios.defaults.baseURL = API_URL + 'api/'
axios.defaults.headers.common.Accept = 'application/x-www-form-urlencoded'
axios.defaults.timeout = 5000

axios.interceptors.request.use(config => {
    let userInfo = getGlobalState('userInfo')

    config.headers.Authorization = userInfo?.token
    return config
})

axios.interceptors.response.use(
    response => response,
    error => {
        const status = error.response.status
        if (status === 401) {
            console.log('URL = ', error.response)
            const msg =
                'Phiên làm việc của bạn đã hết hạn, vui lòng đăng nhập lại !'
            if (Platform.OS === 'android') {
                ToastAndroid.show(msg, ToastAndroid.SHORT, ToastAndroid.TOP)
            } else {
                Alert.alert(msg)
            }
            clearDataAfterLogout()
        }
        return Promise.reject(error)
    }
)

export default axios
