import React, { FunctionComponent } from 'react'

import { DraxContext } from './DraxContext'
import { useDraxContext } from './hooks'
import { DraxSubproviderProps } from './types'

export const DraxSubprovider: FunctionComponent<DraxSubproviderProps> = ({
    parent,
    children
}: any) => {
    const contextValue = useDraxContext()
    const subContextValue = {
        ...contextValue,
        parent
    }
    return (
        <DraxContext.Provider value={subContextValue}>
            {children}
        </DraxContext.Provider>
    )
}
