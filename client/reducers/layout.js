import {
  APPEND_HEADERBAR,
  REMOVE_HEADERBAR,
  APPEND_NAVBAR,
  REMOVE_NAVBAR,
  APPEND_ASIDEBAR,
  REMOVE_ASIDEBAR,
  APPEND_FOOTERBAR,
  REMOVE_FOOTERBAR,
  REGISTER_OVERLAY,
  UPDATE_OVERLAY,
  UNREGISTER_OVERLAY,
  UPDATE_VIEWPORT_WIDTH
} from '../actions/layout'

const INITIAL_STATE = {
  headerbars: [],
  navbars: [],
  asidebars: [],
  footerbars: [],
  width: 'WIDE',
  overlays: {}
}

const layout = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case APPEND_HEADERBAR:
      return {
        ...state,
        headerbars: [...state.headerbars, action.headerbar]
      }

    case REMOVE_HEADERBAR:
      return {
        ...state,
        headerbars: state.headerbars.filter(i => i !== action.headerbar)
      }

    case APPEND_NAVBAR:
      return {
        ...state,
        navbars: [...state.navbars, action.navbar]
      }

    case REMOVE_NAVBAR:
      return {
        ...state,
        navbars: state.navbars.filter(i => i !== action.navbar)
      }

    case APPEND_ASIDEBAR:
      return {
        ...state,
        asidebars: [...state.asidebars, action.asidebar]
      }

    case REMOVE_ASIDEBAR:
      return {
        ...state,
        asidebars: state.asidebars.filter(i => i !== action.asidebar)
      }

    case APPEND_FOOTERBAR:
      return {
        ...state,
        footerbars: [...state.footerbars, action.footerbar]
      }

    case REMOVE_FOOTERBAR:
      return {
        ...state,
        footerbars: state.footerbars.filter(i => i !== action.footerbar)
      }

    case REGISTER_OVERLAY:
      state.overlays[action.name] = action.overlay

      return {
        ...state,
        overlays: {
          ...state.overlays
        }
      }

    case UNREGISTER_OVERLAY:
      delete state.overlays[action.name]

      return {
        ...state,
        overlays: {
          ...state.overlays
        }
      }

    case UPDATE_OVERLAY:
      let overlay = state.overlays[action.name]
      overlay && Object.assign(overlay, action.overide)

      return {
        ...state,
        overlays: {
          ...state.overlays
        }
      }

    case UPDATE_VIEWPORT_WIDTH:
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
