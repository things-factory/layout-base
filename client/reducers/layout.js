import { APPEND_VIEWPART, REMOVE_VIEWPART, UPDATE_VIEWPART, UPDATE_VIEWPORT_WIDTH } from '../actions/layout'

const INITIAL_STATE = {
  viewparts: {},
  width: 'WIDE'
}

const layout = (state = INITIAL_STATE, action) => {
  let viewparts = { ...state.viewparts }

  switch (action.type) {
    case APPEND_VIEWPART:
      return {
        ...state,
        viewparts: {
          ...state.viewparts,
          [action.name]: {
            ...action.viewpart,
            position: action.position
          }
        }
      }

    case REMOVE_VIEWPART:
      delete viewparts[action.name]
      return {
        ...state,
        viewparts
      }

    case UPDATE_VIEWPART:
      let viewpart = viewparts[action.name]
      if (!viewpart) {
        return state
      }
      let override = action.override || {}

      if (viewpart.temporary && override.show === false) {
        /* temporary viewpart는 show=false가 될 때, 제거되어야 한다. */
        delete viewparts[action.name]
        return {
          ...state,
          viewparts
        }
      } else {
        return {
          ...state,
          viewparts: {
            ...state.viewparts,
            [action.name]: {
              ...viewpart,
              ...action.override
            }
          }
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
