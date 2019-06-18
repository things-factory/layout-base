import {
  APPEND_HEADERBAR,
  APPEND_NAVBAR,
  APPEND_ASIDEBAR,
  APPEND_FOOTERBAR,
  APPEND_APP_TOOL,
  APPEND_CONTEXT_TOOL,
  UPDATE_WIDTH,
  TOGGLE_OVERLAY
} from '../actions/layout'

const INITIAL_STATE = {
  headerbars: [],
  navbars: [],
  asidebars: [],
  footerbars: [],
  appTools: [],
  contextTools: [],
  width: 'WIDE',
  overlay: {
    show: false,
    template: ''
  }
}

const layout = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case APPEND_HEADERBAR:
      return {
        ...state,
        headerbars: [...state.headerbars, action.headerbar]
      }

    case APPEND_NAVBAR:
      return {
        ...state,
        navbars: [...state.navbars, action.navbar]
      }

    case APPEND_ASIDEBAR:
      return {
        ...state,
        asidebars: [...state.asidebars, action.asidebar]
      }

    case APPEND_FOOTERBAR:
      return {
        ...state,
        footerbars: [...state.footerbars, action.footerbar]
      }

    case APPEND_APP_TOOL:
      return {
        ...state,
        appTools: [...state.appTools, action.tool]
      }

    case APPEND_CONTEXT_TOOL:
      return {
        ...state,
        contextTools: [...state.contextTools, action.tool]
      }

    case UPDATE_WIDTH:
      console.log(`The layout changed to a ${action.width} layout`)

      return {
        ...state,
        width: action.width
      }

    case TOGGLE_OVERLAY:
      return {
        ...state,
        overlay: {
          show: !state.overlay.show,
          template: action.template
        }
      }

    default:
      return state
  }
}

export default layout
