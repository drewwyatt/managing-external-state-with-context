export const HourType = {
  twelve: '12 hour',
  twentyFour: '24 hour',
}

const isTwelveHour = hourType =>
  hourType === HourType.twelve

export const AmPm = {
  am: 'am',
  pm: 'pm',
  na: '',
}

const INTERVAL_KEY = 'HOOKS_INTERVAL_KEY'
const setThatOneInterval = n => {
  if (window[INTERVAL_KEY]) {
    clearInterval(window[INTERVAL_KEY])
  }

  ;window[INTERVAL_KEY] = n
}

export class Time {
  _hours
  _minutes
  _seconds
  _hourType = HourType.twentyFour
  callbacks = {}

  constructor() {
    const date = new Date()
    this._hours = date.getHours()
    this._minutes = date.getMinutes()
    this._seconds = date.getSeconds()

    setInterval(this._handleInterval.bind(this), 1000)
  }

  setHourType(value) {
    this.set('hourType', value)
  }

  getHourType() {
    return this._hourType
  }

  getHours() {
    return isTwelveHour(this._hourType) && this._hours > 12
      ? this._hours - 12
      : this._hours
  }

  getMinutes() {
    return this._minutes
  }

  getSeconds() {
    return this._seconds
  }

  getAmPm() {
    if (isTwelveHour(this.getHourType())) {
      return this._hours > 11 ? AmPm.pm : AmPm.am
    }

    return AmPm.na
  }

  on(
    event,
    callback,
  ) {
    this.callbacks[event] = callback
  }

  _handleInterval() {
    const date = new Date()
    this.set('hours', date.getHours())
    this.set('minutes', date.getMinutes())
    this.set('seconds', date.getSeconds())
  }

  getTimeEvent() {
    return {
      hours: this.getHours(),
      minutes: this.getMinutes(),
      seconds: this.getSeconds(),
      hourType: this.getHourType(),
      amPm: this.getAmPm(),
    }
  }

  set(
    key,
    value,
  ) {
    if (key === 'hourType' && this._hourType !== value) {
      this._hourType = value
      this.triggerCallbackIfExists(key, value)
    } else if (['hours', 'minutes', 'seconds'].indexOf(key) > -1) {
      if (this['_' + key] !== (value)) {
        ;this['_' + key] = value
        this.triggerCallbackIfExists(key, value)
      }
    }
  }

  triggerCallbackIfExists(
    event,
    params,
  ) {
    if (event in this.callbacks) {
      ;this.callbacks[event](params, this.getTimeEvent())
    }
  }
}
