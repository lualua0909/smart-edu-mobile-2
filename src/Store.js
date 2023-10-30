import { createGlobalState } from 'react-hooks-global-state'

const initialState = {
    userInfo: null,
    random: 1,
    dashboardInfo: null,
    homeInfo: null,
    windowWidth: null,
    windowHeight: null,
    finishedLectures: [],
    carts: [],
    currentCourseId: null,
    visibleNotLogin: false,
    isTrial: false,
    firstTrialId: null
}

export const { useGlobalState, getGlobalState, setGlobalState } =
    createGlobalState(initialState)
