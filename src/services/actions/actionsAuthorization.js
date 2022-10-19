
export const LOGIN_REQUEST_SUCCESS = 'LOGIN_REQUEST_SUCCESS';
export const EXIT_REQUEST_SUCCESS = 'EXIT_REQUEST_SUCCESS';

export const actionRequestAuth = (data) => {
  return (dispatch) => {
    dispatch({
      type: LOGIN_REQUEST_SUCCESS,
      payload: data
    })
  }
}

export const actionRequestExit = (data) => {
  return (dispatch) => {
    dispatch({
      type: EXIT_REQUEST_SUCCESS
    })
  }
}
