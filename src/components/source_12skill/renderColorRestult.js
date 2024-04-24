import { COLORS } from 'app/constants'

export const RenderColor = result => {
    if (result >= 0 && result <= 10) {
        return '#FF0523'
    }
    if (result >= 11 && result <= 30) {
        return '#FF4905'
    }
    if (result >= 31 && result <= 50) {
        return '#FF6005'
    }
    if (result >= 51 && result <= 70) {
        return '#004bad'
    }
    if (result >= 71 && result <= 80) {
        return '#78D700'
    }

    return '#78D700'
}

export const RenderColorStage = stage => {
    switch (stage) {
        case 32:
            return COLORS.colorStage1

        case 33:
            return COLORS.colorStage2

        case 34:
            return COLORS.colorStage3

        case 35:
            return COLORS.colorStage4

        case 36:
            return COLORS.colorStage5

        default:
            return COLORS.colorStage1
    }
}
export const RenderBackgroundColor = (isOpen, adjust, idStages) => {
    let background = RenderColorStage(idStages)
    let color = COLORS.colorWhite
    if (adjust) {
        if (!isOpen) {
            background = 'rgba(224, 244, 244, 0.4)'
            color = COLORS.colorBlack
        }
    }
    return {
        background,
        color
    }
}