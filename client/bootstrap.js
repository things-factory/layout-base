import { store, REGISTER_NAVIGATION_CALLBACK } from '@things-factory/shell'

import layout from './reducers/layout'
import snackbar from './reducers/snackbar'
import { showSnackbar } from './actions/snackbar'

import { UPDATE_VIEWPART, openPopup, openOverlay, closeOverlay, toggleOverlay } from './actions/layout'

export default function bootstrap() {
  store.addReducers({
    layout,
    snackbar
  })

  document.addEventListener('open-overlay', event => {
    const { name, options } = event.detail
    openOverlay(name, options)
  })

  document.addEventListener('close-overlay', event => {
    const { name } = event.detail
    closeOverlay(name)
  })

  document.addEventListener('toggle-overlay', event => {
    const { name, options } = event.detail
    toggleOverlay(name, options)
  })

  document.addEventListener('open-popup', event => {
    const { template, options, callback } = event.detail
    var popup = openPopup(template, options)
    if (popup && callback) callback(popup)
  })

  document.addEventListener('notify', event => {
    let { message, level, ex = '', option = {} } = event.detail

    switch (level) {
      case 'error':
        console.error(message, ex)
        break
      case 'warn':
        console.warn(message, ex)
        break
      case 'info':
        console.info(message)
        break
      default:
        break
    }

    store.dispatch(
      showSnackbar(level, {
        message,
        ...option
      })
    )
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
          override: { show: false }
        })

        lastSequence = overlayStack.length > 0 ? overlayStack[overlayStack.length - 1].overlay.sequence : -1
      } while (sequence < lastSequence)

      if (overlayStack.length == 0) {
        /* overlay가 더 이상 없으므로 ESCKey handler를 해제하고, 리턴한다. */
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
        override: { show: true }
      })
    }
  }

  store.dispatch({
    type: REGISTER_NAVIGATION_CALLBACK,
    callback: historyHandler
  })
}
