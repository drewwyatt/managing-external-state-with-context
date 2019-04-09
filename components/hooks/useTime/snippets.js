export const one = `
import { useContext, useEffect } from 'react'
import { Time } from '../../lib'
import { TimeContext } from './context'
import { actions, State } from './state'

export const useTime = (): State => {
  const { state, dispatch } = useContext(TimeContext)
  let time: Time | undefined
  useEffect(() => {
    time = new Time()
    dispatch(
      actions.init({
        amPm: time.getAmPm(),
        hours: time.getHours(),
        hourType: time.getHourType(),
        minutes: time.getMinutes(),
        seconds: time.getSeconds(),
      }),
    )
  }, [])

  return state
}
`

export const two = `
useEffect(() => {
  time = new Time()
  dispatch(
    actions.init({
      amPm: time.getAmPm(),
      hours: time.getHours(),
      hourType: time.getHourType(),
      minutes: time.getMinutes(),
      seconds: time.getSeconds(),
    }),
  )
  time.on('hours', n => dispatch(actions.setHour(n))
  time.on('minutes', n => dispatch(actions.setMinutes(n))
  time.on('seconds', n => dispatch(actions.setSeconds(n))
}, [])
`

export const three = `
useEffect(() => {
  time = new Time() // new up our Time library
  dispatch(
    actions.init({
      amPm: time.getAmPm(),
      hours: time.getHours(),
      hourType: time.getHourType(),
      minutes: time.getMinutes(),
      seconds: time.getSeconds(),
    }),
  ) // immediately get its state and let our context know about it
  time.on('hours', n => dispatch(actions.setHour(n))
  time.on('minutes', n => dispatch(actions.setMinutes(n))
  time.on('seconds', n => dispatch(actions.setSeconds(n))
}, [])
`

export const four = `
useEffect(() => {
  time = new Time() // new up our Time library
  dispatch(
    actions.init({
      amPm: time.getAmPm(),
      hours: time.getHours(),
      hourType: time.getHourType(),
      minutes: time.getMinutes(),
      seconds: time.getSeconds(),
    }),
  ) // immediately get its state and let our context know about it
  time.on('hours', n => dispatch(actions.setHour(n))      //
  time.on('minutes', n => dispatch(actions.setMinutes(n)) // dispatch appropriate actions on change
  time.on('seconds', n => dispatch(actions.setSeconds(n)) //
}, [])
`

export const five = `
useEffect(() => {
  time = new Time() // new up our Time library
  dispatch(
    actions.init({
      amPm: time.getAmPm(),
      hours: time.getHours(),
      hourType: time.getHourType(),
      minutes: time.getMinutes(),
      seconds: time.getSeconds(),
    }),
  ) // immediately get its state and let our context know about it
  time.on('hours', n => dispatch(actions.setHour(n))      //
  time.on('minutes', n => dispatch(actions.setMinutes(n)) // dispatch appropriate actions on change
  time.on('seconds', n => dispatch(actions.setSeconds(n)) //
}, []) // no dependencies === only do this once
`

export const six = `
import { useCallback, useContext, useEffect } from 'react' // import useCallback
// ...

// update the return type
export const useTime = (): [State, (h: HourType) => void] => {
  useEffect(() => {
    // ...
    time.on('hourType', (...args) => dispatch(actions.setHourType(...args))) // add a listener
  })

  // Create the callback
  const setHourTypeOnTime = useCallback(
    (hourType: HourType) => {
      time && time.setHourType(hourType)
    },
    [time],
  )
  return [state, setHourTypeOnTime] // return a tuple
}
`

export const seven = `
import { TimeContext } from './context'

export const useTime = (): [State, (h: HourType) => void] => {
  const { state, dispatch } = useContext(TimeContext) // instead of requiring this to be TimeContext
  // ...
}
`

export const eight = `
import { TimeContext } from './context'

export const useTime = (
  contex: typeof TimeContext = TimeContext // Make it the default, but allow it to be overwritten
): [State, (h: HourType) => void] => {
  const { state, dispatch } = useContext(context)
  // ...
}
`

export const nine = `
// now we can make our own context, and spy on dispatch
const makeContext = (state: State, dispatch: () => any = jest.fn()) =>
  createContext({ state, dispatch })
`

export const ten = `
// I'm going to skip over most of the details here, but the following is brought to you by
// react-hooks-testing-library, and timer mocking in jest

let dispatch: jest.Mock<any>
let result: ReturnType<typeof useTime>['result']

beforeAll(() => {
  dispatch = jest.fn()
  const container = useTime(makeContext(DEFAULT_STATE, dispatch))
  result = container.result
})

afterEach(() => {
  dispatch.mockReset()
})
`

export const eleven = `
it('will initialize itself', () => {
  expect(dispatch).toHaveBeenCalledTimes(1)
})

it('can return a state', () => {
  const [state] = result.current
  expect(state).toEqual(DEFAULT_STATE)
})

it('dispatches an action each second', () => {
  advanceTimeBySeconds(5)
  expect(dispatch).toHaveBeenCalledTimes(5)
})

it('returns a callback to update hourType', () => {
  const [, updateHourType] = result.current
  act(() => {
    updateHourType(HourType.twelve)
  })
  expect(dispatch).toHaveBeenCalledWith(
    actions.setHourType(HourType.twelve, getTimeEvent(HourType.twelve)),
  )
})
`
