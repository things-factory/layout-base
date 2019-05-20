import { store } from '@things-factory/shell'

import layout from './reducers/layout'
import snackbar from './reducers/snackbar'
import { showSnackbar } from './actions/snackbar'

export default function bootstrap() {
  store.addReducers({
    layout,
    snackbar
  })

  document.addEventListener('notify', () => {
    let { message, type, e } = e.detail

    switch (type) {
      case 'error':
        console.error(message, e)
        break
      case 'warn':
        console.warn(message, e)
        break
      default:
        break
    }

    store.dispatch(showSnackbar(message))
  })
}
