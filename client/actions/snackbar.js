export const OPEN_SNACKBAR = 'OPEN_SNACKBAR'
export const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR'

var snackbarTimer

export const showSnackbar = (level, { message, action, timer = 3000 }) => dispatch => {
  dispatch({
    type: OPEN_SNACKBAR,
    level,
    message,
    action
  })
  window.clearTimeout(snackbarTimer)

  if (timer != -1) snackbarTimer = window.setTimeout(() => dispatch({ type: CLOSE_SNACKBAR }), timer)
}
