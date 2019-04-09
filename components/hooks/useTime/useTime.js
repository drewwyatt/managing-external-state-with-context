import { useCallback, useContext, useEffect } from 'react'
import { Time, AmPm, HourType } from '../../time'
import { TimeContext } from '../context'
import { actions } from '../state'

export { AmPm, HourType }

const toCallback = (
  dispatch,
  actionCreator,
) => (...p) => {
  dispatch(actionCreator(...p))
}

export const useTime = (
  context = TimeContext
) => {
  console.log(context, useContext)
  const { state, dispatch } = useContext(context)
  let time
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
    time.on('hours', toCallback(dispatch, actions.setHours))
    time.on('minutes', toCallback(dispatch, actions.setMinutes))
    time.on('seconds', toCallback(dispatch, actions.setSeconds))
    time.on('hourType', toCallback(dispatch, actions.setHourType))
  }, [])

  const setHourTypeOnTime = useCallback(
    hourType => {
      time && time.setHourType(hourType)
    },
    [time],
  )

  return [state, setHourTypeOnTime]
}
