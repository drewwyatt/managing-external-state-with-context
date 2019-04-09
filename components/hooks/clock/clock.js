import * as React from 'react'
import { HourType, useTime } from '../useTime'

const pad0 = n => {
  const str = n.toString()
  return str.length > 1 ? str : '0' + str
}

const View = ({ hours, minutes, seconds, amPm }) => {
  const numbers = [hours, minutes, seconds].map(pad0).join(':')
  return <h1>{numbers} {amPm}</h1>
}

const Controls = ({ hourType, setter }) => (
  <>
    {[HourType.twelve, HourType.twentyFour].map(ht => (
      <Control value={ht} current={hourType} setter={setter} />
    ))}
  </>
)

const Control = ({ value, current, setter }) => (
  <label>
    <input
      key={value}
      type="radio"
      name="hour-type"
      value={value}
      checked={value === current}
      onChange={() => setter(value)}
    />
    {value}
  </label>
)

export const Clock = () => {
  const [state, setHourType] = useTime()
  return (
    <fieldset>
      <legend>Hooks Clock</legend>
      <View {...state} />
      <Controls hourType={state.hourType} setter={setHourType} />
    </fieldset>
  )
}
