import React from 'react'
import { Time, AmPm, HourType } from '../lib/time'

export class ClockClass extends React.Component {
  time = new Time()
  state = {
    hours: 0,
    minutes: 0,
    seconds: 0,
    amPm: AmPm.na,
    hourType: HourType.twentyFour,
  }

  componentDidMount() {
    this.time.on('seconds', this.update.bind(this))
    this.time.on('hourType', this.update.bind(this))
  }

  render() {
    return (
      <fieldset>
        <legend>Clock</legend>
        <h1>{this.getFormattedTime()}</h1>
        {this.hourTypeSelect()}
      </fieldset>
    )
  }

  hourTypeSelect = () =>
    [HourType.twelve, HourType.twentyFour].map(this.hourTypeToRadio.bind(this))

  hourTypeToRadio = hourType => (
    <label>
      <input
        key={hourType}
        type="radio"
        name="hour-type"
        value={hourType}
        checked={this.isSelectedHourType(hourType)}
        onChange={this.handleHourClick.bind(this)}
      />
      {hourType}
    </label>
  )

  handleHourClick = ({ target: { value } }) => {
    this.time.setHourType(value)
  }

  isSelectedHourType = hourType =>
    hourType === this.state.hourType

  getFormattedTime = () => {
    const { hours, minutes, seconds, amPm } = this.state
    const numbers = [hours, minutes, seconds].map(this.pad0).join(':')
    return `${numbers} ${amPm}`
  }

  pad0 = n => {
    const str = n.toString()
    return str.length > 1 ? str : '0' + str
  }

  update = (_, time) => {
    this.setState(time)
  }
}
