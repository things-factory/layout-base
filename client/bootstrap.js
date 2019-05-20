import { store } from '@things-factory/shell'

import layout from './reducers/layout'
import snackbar from './reducers/snackbar'
import { showSnackbar } from './actions/snackbar'

export default function bootstrap() {
  store.addReducers({
    layout,
    snackbar
  })

  document.addEventListener('notify', event => {
    let { message, type, ex } = event.detail

    switch (type) {
      case 'error':
        console.error(message, ex)
        break
      case 'warn':
        console.warn(message, ex)
        break
      default:
        break
    }

    store.dispatch(showSnackbar(message))
  })
}
