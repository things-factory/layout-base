import { store } from '@things-factory/shell'

export const appendViewpart = ({ name, viewpart, position }) => {
  store.dispatch({
    type: APPEND_VIEWPART,
    name,
    viewpart,
    position
  })
}

export const removeViewpart = name => {
  store.dispatch({
    type: REMOVE_VIEWPART,
    name
  })
}

export const APPEND_VIEWPART = 'APPEND_VIEWPART'
export const REMOVE_VIEWPART = 'REMOVE_VIEWPART'

export const UPDATE_VIEWPART = 'UPDATE_VIEWPART'

export const VIEWPART_POSITION = {
  HEADERBAR: 'headerbar',
  NAVBAR: 'navbar',
  ASIDEBAR: 'asidebar',
  FOOTERBAR: 'footerbar'
}

export const TOOL_POSITION = {
  FRONT_END: 'FRONT_END',
  FRONT: 'FRONT',
  CENTER: 'CENTER',
  REAR: 'REAR',
  REAR_END: 'REAR_END'
}

export const UPDATE_VIEWPORT_WIDTH = 'UPDATE_VIEWPORT_WIDTH'

export const updateLayout = wide => {
  store.dispatch({
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
      type: UPDATE_VIEWPART,
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

  window.dispatchEvent(
    new CustomEvent('popstate', {
      detail: { state: afterState }
    })
  )
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
