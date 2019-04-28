export const OPEN_SNACKBAR = 'OPEN_SNACKBAR'
export const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR'

var snackbarTimer

export const showSnackbar = message => dispatch => {
  dispatch({
    type: OPEN_SNACKBAR,
    message
  })
  window.clearTimeout(snackbarTimer)
  snackbarTimer = window.setTimeout(() => dispatch({ type: CLOSE_SNACKBAR }), 3000)
}
