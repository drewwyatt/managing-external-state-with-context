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
