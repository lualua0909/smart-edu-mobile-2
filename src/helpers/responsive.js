import { Dimensions } from 'react-native'

const WINDOW_WIDTH = Dimensions.get('window').width

const guidelineBaseWidth = 350

export const scale = size => (WINDOW_WIDTH / guidelineBaseWidth) * size
