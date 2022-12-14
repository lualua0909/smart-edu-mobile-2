import Config from 'react-native-config'

export { default as COLORS } from './colors'
export { default as ROUTES } from './routes'
export { default as STYLES } from './styles'

export const API_URL =
    Config.SERVER_CONFIG === 'smartedu'
        ? 'https://phplaravel-695396-2297336.cloudwaysapps.com/'
        : Config.SERVER_CONFIG === 'CP'
        ? 'https://phplaravel-695396-2345840.cloudwaysapps.com/'
        : 'https://phplaravel-695396-2345840.cloudwaysapps.com/'

export const APP_URL =
    Config.SERVER_CONFIG === 'smartedu'
        ? 'https://smarte.edu.vn/'
        : 'https://demo.smarte.edu.vn/'

export const COURSE_IMG_PATH = API_URL + 'public/courses/'
export const EXCERTIFICATE_IMG_PATH = API_URL + 'public/ex-certificates/'
export const NEWS_PATH = API_URL + 'public/news/'
export const CATEGORIES_PATH = API_URL + 'public/categories/'
