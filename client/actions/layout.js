import { store } from '@things-factory/shell'

export const APPEND_HEADERBAR = 'APPEND_HEADERBAR'
export const REMOVE_HEADERBAR = 'REMOVE_HEADERBAR'
export const APPEND_NAVBAR = 'APPEND_NAVBAR'
export const REMOVE_NAVBAR = 'REMOVE_NAVBAR'
export const APPEND_ASIDEBAR = 'APPEND_ASIDEBAR'
export const REMOVE_ASIDEBAR = 'REMOVE_ASIDEBAR'
export const APPEND_FOOTERBAR = 'APPEND_FOOTERBAR'
export const REMOVE_FOOTERBAR = 'REMOVE_FOOTERBAR'

export const REGISTER_OVERLAY = 'REGISTER_OVERLAY'
export const UNREGISTER_OVERLAY = 'UNREGISTER_OVERLAY'
export const UPDATE_OVERLAY = 'UPDATE_OVERLAY'

export const TOOL_POSITION = {
  FRONT_END: 'FRONT_END',
  FRONT: 'FRONT',
  CENTER: 'CENTER',
  REAR: 'REAR',
  REAR_END: 'REAR_END'
}

export const UPDATE_VIEWPORT_WIDTH = 'UPDATE_VIEWPORT_WIDTH'

export const updateLayout = wide => dispatch => {
  dispatch({
    type: UPDATE_VIEWPORT_WIDTH,
    width: wide ? 'WIDE' : 'NARROW'
  })
}

/* overlay navigation */

export const openOverlay = (name, options) => {
  var beforeState = history.state
  var beforeOverlay = beforeState ? beforeState.overlay : undefined

  /* store의 layout의 내용을 변경한다. */
  if (options) {
    store.dispatch({
      type: UPDATE_OVERLAY,
      name,
      overide: options
    })
  }

  /*
   * 현재 history.state를 확인하고, overlay의 이름이 같은
   * history에 추가하고 open 동작을 실행한다.
   */
  var afterState = Object.assign({}, beforeState || {}, { overlay: { name } })

  if (beforeOverlay) {
    /* 이전의 overlay history state는 제거한다. */
    history.replaceState(afterState, '', location.href)
  } else {
    /* 새로운 overlay history를 추가한다. history 제거는 closeOverlay에서 한다. */
    history.pushState(afterState, '', location.href)
  }

  window.dispatchEvent(new Event('popstate'))
}

export const closeOverlay = () => {
  /*
   * 실제로 overlay를 close하는 작업은 window.onpopstate 핸들러에서 한다.
   */
  history.back()
}

export const toggleOverlay = (name, options) => {
  var { name: beforeOverlayName } = (history.state && history.state.overlay) || {}

  if (beforeOverlayName == name) {
    closeOverlay(name)
  } else {
    openOverlay(name, options)
  }
}
