import axios from 'react-native-axios'
import { ToastAndroid, Platform, AlertIOS } from 'react-native'
import { API_URL } from 'app/constants'
import { getGlobalState } from 'app/Store'
import { clearDataAfterLogout } from 'app/helpers/utils'

axios.defaults.baseURL = API_URL + 'api/'
axios.defaults.headers.common.Accept = 'application/x-www-form-urlencoded'
axios.defaults.timeout = 5000

axios.interceptors.request.use((config) => {
    let userInfo = getGlobalState('userInfo')

    config.headers.Authorization = userInfo?.token
    return config
})

axios.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error(error)
        const status = error.response.status
        if (status === 401) {
            const msg =
                'Phiên làm việc của bạn đã hết hạn, vui lòng đăng nhập lại !'
            if (Platform.OS === 'android') {
                ToastAndroid.show(msg, ToastAndroid.SHORT, ToastAndroid.TOP)
            } else {
                AlertIOS.alert(msg)
            }
            clearDataAfterLogout()
        }
        return Promise.reject(error)
    }
)

export default axios
