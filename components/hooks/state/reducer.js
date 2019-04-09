import { AmPm, HourType } from '../../time'

export const DEFAULT_STATE = {
  hours: 0,
  minutes: 0,
  seconds: 0,
  hourType: HourType.twentyFour,
  amPm: AmPm.na,
}

export const reducer = (state, action) => {
  switch (action.type) {
    case 'init':
      return { ...state, ...action.payload }
    case 'setHours':
      return { ...state, hours: action.payload }
    case 'setMinutes':
      return { ...state, minutes: action.payload }
    case 'setSeconds':
      return { ...state, seconds: action.payload }
    case 'setHourType':
      return {
        ...state,
        hourType: action.payload.hourType,
        hours: action.payload.currentTime.hours,
        amPm: action.payload.currentTime.amPm,
      }
    case 'setAmPm':
      return { ...state, amPm: action.payload }
    default:
      return state
  }
}
