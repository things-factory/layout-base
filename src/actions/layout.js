export const APPEND_HEADERBAR = 'APPEND_HEADERBAR'
export const APPEND_NAVBAR = 'APPEND_NAVBAR'
export const APPEND_ASIDEBAR = 'APPEND_ASIDEBAR'
export const APPEND_FOOTER = 'APPEND_FOOTER'
export const APPEND_APP_TOOL = 'APPEND_APP_TOOL'

export const TOOL_POSITION = {
  LEFT_END: 'LEFT_END',
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
  RIGHT_END: 'RIGHT_END'
}

export const UPDATE_WIDTH = 'UPDATE_WIDTH'

export const updateLayout = wide => dispatch => {
  dispatch({
    type: UPDATE_WIDTH,
    width: wide ? 'WIDE' : 'NARROW'
  })
}
