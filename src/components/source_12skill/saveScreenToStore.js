import { storeData } from 'app/helpers/utils'

export const SaveScreenToStore = parameter => {
    storeData('SCREEN', parameter)
}
