import { store } from '@things-factory/shell'

import layout from './reducers/layout'
import snackbar from './reducers/snackbar'
import { showSnackbar } from './actions/snackbar'

export default function bootstrap() {
  store.addReducers({
    layout,
    snackbar
  })
  document.addEventListener('notify', function(e) {
    store.dispatch(showSnackbar(e.detail))
  })
}
