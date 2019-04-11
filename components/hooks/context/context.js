import * as React from 'react'
import { reducer, DEFAULT_STATE } from '../state'

const { createContext, useReducer } = React

export const TimeContext = createContext()

export const TimeContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, DEFAULT_STATE)
  return (
    <TimeContext.Provider value={{ state, dispatch }}>
      {children}
    </TimeContext.Provider>
  )
}
