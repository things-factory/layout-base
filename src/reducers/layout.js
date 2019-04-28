import {
  APPEND_HEADERBAR,
  APPEND_NAVBAR,
  APPEND_ASIDEBAR,
  APPEND_FOOTER,
  APPEND_APP_TOOL,
  UPDATE_WIDTH
} from '../actions/layout'

const INITIAL_STATE = {
  navbars: [],
  asidebars: [],
  footers: [],
  appTools: [],
  width: 'WIDE'
}

const layout = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case APPEND_HEADERBAR:
      let headerbar = action.headerbar
      return {
        ...state,
        headerbars: [...state.headerbars, headerbar]
      }

    case APPEND_NAVBAR:
      let navbar = action.navbar
      return {
        ...state,
        navbars: [...state.navbars, navbar]
      }

    case APPEND_ASIDEBAR:
      let asidebar = action.asidebar
      return {
        ...state,
        asidebars: [...state.asidebars, asidebar]
      }

    case APPEND_FOOTER:
      let footer = action.footer
      return {
        ...state,
        footers: [...state.footers, footer]
      }

    case APPEND_APP_TOOL:
      let tool = action.tool
      return {
        ...state,
        appTools: [...state.appTools, tool]
      }

    case UPDATE_WIDTH:
      console.log(`The layout changed to a ${action.width} layout`)

      return {
        ...state,
        width: action.width
      }

    default:
      return state
  }
}

export default layout
