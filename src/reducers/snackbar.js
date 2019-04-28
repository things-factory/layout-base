import { OPEN_SNACKBAR, CLOSE_SNACKBAR } from '../actions/snackbar.js'

const INITIAL_STATE = {
  snackbarOpened: false,
  message: ''
}

const snackbar = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case OPEN_SNACKBAR:
      return {
        ...state,
        snackbarOpened: true,
        message: action.message
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
