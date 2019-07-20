import { store, REGISTER_NAVIGATION_CALLBACK } from '@things-factory/shell'

import layout from './reducers/layout'
import snackbar from './reducers/snackbar'
import { showSnackbar } from './actions/snackbar'

import { UPDATE_VIEWPART } from './actions/layout'

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
  var overlayStack = []

  const ESCKeydownEventHandler = event => {
    if (event.keyCode == 27 /* KEY_ESC */) {
      history.back()
    }
  }

  const historyHandler = (location, event) => {
    var navigated = event instanceof PopStateEvent

    var state = history.state
    var overlay = (state || {}).overlay
    var sequence = (overlay || {}).sequence || -1

    var lastSequence = overlayStack.length > 0 ? overlayStack[overlayStack.length - 1].overlay.sequence : -1

    if (overlayStack.length > 0 && sequence < lastSequence) {
      /* overlay 관련 history가 아닌 경우. */
      do {
        let { overlay } = overlayStack.pop()
        store.dispatch({
          type: UPDATE_VIEWPART,
          name: overlay.name,
          overide: { show: false }
        })

        lastSequence = overlayStack.length > 0 ? overlayStack[overlayStack.length - 1].overlay.sequence : -1
      } while (sequence < lastSequence)

      if (overlayStack.length == 0) {
        /* overlay가 더 이상 없으므로 ESCKey handler를 등록하고, 리턴한다. */
        document.removeEventListener('keydown', ESCKeydownEventHandler)
      }
    }

    if (!navigated && overlay) {
      /* stack을 새로 시작하는 경우에 ESCKey handler를 등록한다. */
      if (overlayStack.length == 0) {
        document.addEventListener('keydown', ESCKeydownEventHandler)
      }
      overlayStack.push({ ...state })

      store.dispatch({
        type: UPDATE_VIEWPART,
        name: overlay.name,
        overide: { show: true }
      })
    }
  }

  store.dispatch({
    type: REGISTER_NAVIGATION_CALLBACK,
    callback: historyHandler
  })
}
