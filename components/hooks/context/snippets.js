export const one = `
import * as React from 'react'
import { Action, State, reducer, DEFAULT_STATE } from './state'

const { createContext, useReducer } = React

type StateWithDispatch = {
  state: State
  dispatch: React.Dispatch<Action>
}

export const TimeContext = createContext<StateWithDispatch>(undefined as any)

export const TimeContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, DEFAULT_STATE)
  return (
    <TimeContext.Provider value={{ state, dispatch }}>
      {children}
    </TimeContext.Provider>
  )
}
`

export const two = `
  export const TimeContext = createContext<StateWithDispatch>(undefined as any) // create a context
`

export const three = `
// "hook" it up
export const TimeContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, DEFAULT_STATE)
  return (
    <TimeContext.Provider value={{ state, dispatch }}>
      {children}
    </TimeContext.Provider>
  )
}
`

export const four = `
// at some point we will need to make sure to drop the provider somewhere
// high up in our app (well, at least above our clock)
<TimeContextProvider>
  {/* <Clock /> | <App /> | <Whatever /> */}
</TimeContextProvider>
`

export const five = `
const [state, dispatch] = useReducer(reducer, DEFAULT_STATE)
/**
 * FROM THE DOCS:
 * An alternative to useState. Accepts a reducer of type (state, action) => newState,
 * and returns the current state paired with a dispatch method.
 * (If you’re familiar with Redux, you already know how this works.)
 *
 * useReducer is usually preferable to useState when you have complex state logic that involves
 * multiple sub-values or when the next state depends on the previous one. useReducer also lets
 * you optimize performance for components that trigger deep updates because you can pass dispatch
 * down instead of callbacks.
 */
`