export const APPEND_HEADERBAR = 'APPEND_HEADERBAR'
export const APPEND_NAVBAR = 'APPEND_NAVBAR'
export const APPEND_ASIDEBAR = 'APPEND_ASIDEBAR'
export const APPEND_FOOTERBAR = 'APPEND_FOOTERBAR'
export const APPEND_APP_TOOL = 'APPEND_APP_TOOL'
export const APPEND_CONTEXT_TOOL = 'APPEND_CONTEXT_TOOL'

export const TOGGLE_OVERLAY = 'TOGGLE_OVERLAY'

export const TOOL_POSITION = {
  FRONT_END: 'FRONT_END',
  FRONT: 'FRONT',
  CENTER: 'CENTER',
  REAR: 'REAR',
  REAR_END: 'REAR_END'
}

export const UPDATE_WIDTH = 'UPDATE_WIDTH'

export const updateLayout = wide => dispatch => {
  dispatch({
    type: UPDATE_WIDTH,
    width: wide ? 'WIDE' : 'NARROW'
  })
}
