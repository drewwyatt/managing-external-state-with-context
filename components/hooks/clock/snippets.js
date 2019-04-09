export const one = `
// Show the numbers
type ViewProps = ReturnType<typeof useTime>[0]

const pad0 = (n: number): string => {
  const str = n.toString()
  return str.length > 1 ? str : '0' + str
}

const View: React.FC<ViewProps> = ({ hours, minutes, seconds, amPm }) => {
  const numbers = [hours, minutes, seconds].map(pad0).join(':')
  return <h1>{numbers} {amPm}</h1>
}
`

export const two = `
// Radio button

type HourTypeSetter = ReturnType<typeof useTime>[1]
type ControlProps = {
  value: HourType
  current: HourType
  setter: HourTypeSetter
}
const Control = ({ value, current, setter }: ControlProps) => (
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
`

export const three = `
// Two of them
type ControlsProps = Pick<ViewProps, 'hourType'> & {
  setter: HourTypeSetter
}
const Controls: React.FC<ControlsProps> = ({ hourType, setter }) => (
  <>
    {[HourType.twelve, HourType.twentyFour].map(ht => (
      <Control value={ht} current={hourType} setter={setter} />
    ))}
  </>
)
`

export const four = `
// Stitch it all together
export const Clock: React.FC = () => {
  const [state, setHourType] = useTime()
  return (
    <fieldset>
      <legend>Hooks Clock</legend>
      <View {...state} />
      <Controls hourType={state.hourType} setter={setHourType} />
    </fieldset>
  )
}
`
