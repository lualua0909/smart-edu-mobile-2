import Toast from 'react-native-toast-message'

export default ({ title, description, placement = 'top', status = 'info' }) => {
    Toast.show({
        type: status,
        position: placement,
        text1: title,
        text2: description,
        autoHide: true,
        onPress: () => {
            Toast.hide()
        }
    })
}
