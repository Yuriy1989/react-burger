
export const GET_USER_REQUEST = 'LOGIN_REQUEST';
export const GET_USER_REQUEST_SUCCESS = 'LOGIN_REQUEST_SUCCESS';
export const GET_USER_REQUEST_FAILED = 'LOGIN_REQUEST_FAILED';
export const PATCH_USER_REQUEST = 'PATCH_USER_REQUEST';
export const PATCH_USER_REQUEST_SUCCESS = 'PATCH_USER_REQUEST_SUCCESS';
export const PATCH_USER_REQUEST_FAILED = 'PATCH_USER_REQUEST_FAILED';
export const EXIT_REQUEST_SUCCESS = 'EXIT_REQUEST_SUCCESS';
export const CANCEL_EDIT_USER = 'CANCEL_USER_EDIT';

import { api } from '../../utils/Api';

export const actionRequestGetUser = (token) => {
  return (dispatch) => {
    dispatch({
      type: GET_USER_REQUEST
    })
    api.getUser(token)
      .then(res => {
        if(res && res.success) {
          dispatch({
            type: GET_USER_REQUEST_SUCCESS,
            payload: res.user
          })
        }
        else {
          dispatch({
            type: GET_USER_REQUEST_FAILED
          })
        }
      })
      .catch(err => {
        dispatch({
          type: GET_USER_REQUEST_FAILED
        })
      })
  }
}

export const actionRequestPatchUser = (data, accessToken) => {
  return (dispatch) => {
    // dispatch({
    //   type: PATCH_USER_REQUEST
    // })
    // console.log('data api = ', data);
    api.patchUser(data, accessToken)
      .then(res => {
        if(res && res.success) {
          console.log('res api = ', res);
          dispatch({
            type: PATCH_USER_REQUEST_SUCCESS,
            payload: res.user
          })
        }
        // else {
        //   dispatch({
        //     type: PATCH_USER_REQUEST_FAILED
        //   })
        // }
      })
      // .catch(err => {
      //   dispatch({
      //     type: PATCH_USER_REQUEST_FAILED
      //   })
      // })
  }
}

export const actionRequestCancelEditUser = () => {
  return(dispatch) => {
    dispatch({
      type: CANCEL_EDIT_USER
    })
  }
}

export const actionRequestExit = () => {
  return (dispatch) => {
    dispatch({
      type: EXIT_REQUEST_SUCCESS
    })
  }
}
