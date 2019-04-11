import { dark } from 'mdx-deck/themes'
import { ToggleProvider as Provider } from './toggle'

export const monokai = {
  ...dark,
  colors: {
    ...dark.colors,
    background: '#272822',
  },
  Provider,
}
