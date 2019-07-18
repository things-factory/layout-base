import { store, REGISTER_NAVIGATION_CALLBACK } from '@things-factory/shell'

import layout from './reducers/layout'
import snackbar from './reducers/snackbar'
import { showSnackbar } from './actions/snackbar'

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
  var lastHistoryState

  const historyHandler = (location, event) => {
    var currentState = history.state

    var { overlay: lastOverlay } = lastHistoryState || {}
    var { overlay: currentOverlay } = currentState || {}

    lastHistoryState = currentState

    var overlays = store.getState().layout.overlays

    var lastOverlayState = lastOverlay && overlays.find(overlay => overlay.name == lastOverlay.name)
    var currentOverlayState = currentOverlay && overlays.find(overlay => overlay.name == currentOverlay.name)

    if (lastOverlayState) {
      lastOverlayState.close && lastOverlayState.close.call(this, lastOverlayState)
    }

    if (currentOverlayState) {
      currentOverlayState.open && currentOverlayState.open.call(this, currentOverlayState)
    }

    lastHistoryState = currentState
  }

  store.dispatch({
    type: REGISTER_NAVIGATION_CALLBACK,
    callback: historyHandler
  })
}
