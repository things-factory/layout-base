import { OPEN_SNACKBAR, CLOSE_SNACKBAR } from '../actions/snackbar.js'

const INITIAL_STATE = {
  snackbarOpened: false,
  level: '',
  message: '',
  action: {}
}

const snackbar = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case OPEN_SNACKBAR:
      return {
        ...state,
        snackbarOpened: true,
        level: action.level,
        message: action.message,
        action: {
          ...action.action
        }
      }
    case CLOSE_SNACKBAR:
      return {
        ...state,
        snackbarOpened: false
      }
    default:
      return state
  }
}

export default snackbar
