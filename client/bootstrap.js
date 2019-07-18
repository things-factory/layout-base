import { store, REGISTER_NAVIGATION_CALLBACK } from '@things-factory/shell'

import layout from './reducers/layout'
import snackbar from './reducers/snackbar'
import { showSnackbar } from './actions/snackbar'

import { UPDATE_OVERLAY } from './actions/layout'

export default function bootstrap() {
  store.addReducers({
    layout,
    snackbar
  })

  document.addEventListener('notify', event => {
    let { message, level, ex } = event.detail

    switch (level) {
      case 'error':
        console.error(message, ex)
        break
      case 'warn':
        console.warn(message, ex)
        break
      default:
        break
    }

    store.dispatch(showSnackbar(level, message))
  })

  /* overlay handling */
  var beforeHistoryState

  const historyHandler = (location, event) => {
    var afterHistoryState = history.state

    var { overlay: beforeOverlay } = beforeHistoryState || {}
    var { overlay: afterOverlay } = afterHistoryState || {}

    beforeHistoryState = {
      ...afterHistoryState
    }

    if (beforeOverlay) {
      store.dispatch({
        type: UPDATE_OVERLAY,
        name: beforeOverlay.name,
        overide: { show: false }
      })
    }

    if (afterOverlay) {
      store.dispatch({
        type: UPDATE_OVERLAY,
        name: afterOverlay.name,
        overide: { show: true }
      })
    }
  }

  store.dispatch({
    type: REGISTER_NAVIGATION_CALLBACK,
    callback: historyHandler
  })
}
