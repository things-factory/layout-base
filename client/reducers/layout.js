import {
  APPEND_HEADERBAR,
  REMOVE_HEADERBAR,
  APPEND_NAVBAR,
  REMOVE_NAVBAR,
  APPEND_ASIDEBAR,
  REMOVE_ASIDEBAR,
  APPEND_FOOTERBAR,
  REMOVE_FOOTERBAR,
  UPDATE_LAYOUT_VIEWPART,
  UPDATE_VIEWPORT_WIDTH
} from '../actions/layout'

const INITIAL_STATE = {
  viewparts: {},
  width: 'WIDE'
}

const layout = (state = INITIAL_STATE, action) => {
  let viewparts = { ...state.viewparts }

  switch (action.type) {
    case APPEND_HEADERBAR:
      return {
        ...state,
        viewparts: {
          ...state.viewparts,
          [action.name]: { ...action.headerbar, type: 'headerbar' }
        }
      }

    case REMOVE_HEADERBAR:
      delete viewparts[action.name]

      return {
        ...state,
        viewparts
      }

    case APPEND_NAVBAR:
      return {
        ...state,
        viewparts: {
          ...state.viewparts,
          [action.name]: { ...action.navbar, type: 'navbar' }
        }
      }

    case REMOVE_NAVBAR:
      delete viewparts[action.name]

      return {
        ...state,
        viewparts
      }

    case APPEND_ASIDEBAR:
      return {
        ...state,
        viewparts: {
          ...state.viewparts,
          [action.name]: { ...action.asidebar, type: 'asidebar' }
        }
      }

    case REMOVE_ASIDEBAR:
      delete viewparts[action.name]

      return {
        ...state,
        viewparts
      }

    case APPEND_FOOTERBAR:
      return {
        ...state,
        viewparts: {
          ...state.viewparts,
          [action.name]: { ...action.footerbar, type: 'footerbar' }
        }
      }

    case REMOVE_FOOTERBAR:
      delete viewparts[action.name]

      return {
        ...state,
        viewparts
      }

    case UPDATE_LAYOUT_VIEWPART:
      let viewpart = state.viewparts[action.name]

      return {
        ...state,
        viewparts: {
          ...state.viewparts,
          [action.name]: Object.assign({}, viewpart, action.overide)
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
