import { store } from '@things-factory/shell'

import layout from './reducers/layout'
import snackbar from './reducers/snackbar'

export default function bootstrap() {
  store.addReducers({
    layout,
    snackbar
  })
}
