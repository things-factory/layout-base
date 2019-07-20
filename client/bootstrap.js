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
  var beforeHistoryState

  const ESCKeydownEventHandler = event => {
    if (event.keyCode == 27 /* KEY_ESC */) {
      history.back()
    }
  }

  const historyHandler = (location, event) => {
    var afterHistoryState = history.state

    var { overlay: beforeOverlay } = beforeHistoryState || {}
    var { overlay: afterOverlay } = afterHistoryState || {}

    beforeHistoryState = {
      ...history.state
    }

    /* 기존의 overlay는 hide 시킨다. */
    if (beforeOverlay) {
      document.removeEventListener('keydown', ESCKeydownEventHandler)

      store.dispatch({
        type: UPDATE_VIEWPART,
        name: beforeOverlay.name,
        overide: { show: false }
      })
    }

    /*
     * 새로 open된 overlay는 show 시킨다.
     *
     * 단, 브라우저의 navigation bar에서 prev, next로 이동한 경우는 제외한다.)
     * 즉, popstate 이벤트를 강제로 발생시킨 경우에만 실행하는데, 이벤트가 PopStateEvent 인지를 기준으로 판단한다.
     */
    if (!(event instanceof PopStateEvent) && afterOverlay && afterOverlay.name) {
      store.dispatch({
        type: UPDATE_VIEWPART,
        name: afterOverlay.name,
        overide: { show: true }
      })

      document.addEventListener('keydown', ESCKeydownEventHandler)
    }
  }

  store.dispatch({
    type: REGISTER_NAVIGATION_CALLBACK,
    callback: historyHandler
  })
}
