export const setHours = payload => ({
  type: 'setHours',
  payload,
})

export const setMinutes = payload => ({
  type: 'setMinutes',
  payload,
})

export const setSeconds = payload => ({
  type: 'setSeconds',
  payload,
})

export const setHourType = (hourType, currentTime) => ({
  type: 'setHourType',
  payload: {
    hourType,
    currentTime,
  },
})

export const setAmPm = payload => ({
  type: 'setAmPm',
  payload,
})

export const init = payload => ({
  type: 'init',
  payload,
})
