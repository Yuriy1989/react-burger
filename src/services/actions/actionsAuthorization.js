
export const GET_USER_REQUEST = 'LOGIN_REQUEST';
export const GET_USER_REQUEST_SUCCESS = 'LOGIN_REQUEST_SUCCESS';
export const GET_USER_REQUEST_FAILED = 'LOGIN_REQUEST_FAILED';
export const REFRESH_ACCESS_TOKEN_REQUEST = 'REFRESH_ACCESS_TOKEN_REQUEST';
export const REFRESH_ACCESS_TOKEN_REQUEST_SUCCESS = 'REFRESH_ACCESS_TOKEN_REQUEST_SUCCESS';
export const REFRESH_ACCESS_TOKEN_REQUEST_FAILED = 'REFRESH_ACCESS_TOKEN_REQUEST_FAILED';
export const PATCH_USER_REQUEST = 'PATCH_USER_REQUEST';
export const PATCH_USER_REQUEST_SUCCESS = 'PATCH_USER_REQUEST_SUCCESS';
export const PATCH_USER_REQUEST_FAILED = 'PATCH_USER_REQUEST_FAILED';
export const EXIT_REQUEST_SUCCESS = 'EXIT_REQUEST_SUCCESS';
export const CANCEL_EDIT_USER = 'CANCEL_USER_EDIT';

import { setCookie } from '../../utils/cookie';
import { api } from '../../utils/Api';

export const actionRequestGetUser = (accessToken) => {
  console.log('actionRequestGetUser');
  return (dispatch) => {
    dispatch({
      type: GET_USER_REQUEST
    })
    api.getUser(accessToken)
      .then(res => {
        if(res && res.success) {
          console.log('actionRequestGetUser ', res);
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

export const actionRefreshAccessToken = (refreshToken) => {
  const timeCookie = 60;

  return (dispatch) => {
    dispatch({
      type: REFRESH_ACCESS_TOKEN_REQUEST
    })
    api.refreshToken(refreshToken)
      .then(res => {
        if(res && res.success) {
          // console.log('actionRefreshAccessToken ', res);
          let newAccessToken = res.accessToken.split('Bearer ')[1];
          setCookie('accessToken', newAccessToken, { 'max-age': timeCookie });
          setCookie('refreshToken', res.refreshToken);
          // actionRequestGetUser(newAccessToken);
          console.log('newAccessToken ', newAccessToken);
          dispatch({
            type: REFRESH_ACCESS_TOKEN_REQUEST_SUCCESS,
          })
        }
        else {
          dispatch({
            type: REFRESH_ACCESS_TOKEN_REQUEST_FAILED
          })
        }
      })
      .catch(err => {
        dispatch({
          type: REFRESH_ACCESS_TOKEN_REQUEST_FAILED
        })
      })
  }
}

export const actionRequestPatchUser = (data, accessToken) => {
  return (dispatch) => {
    dispatch({
      type: PATCH_USER_REQUEST
    })
    api.patchUser(data, accessToken)
      .then(res => {
        if(res.success === true) {
          dispatch({
            type: PATCH_USER_REQUEST_SUCCESS,
            payload: res
          })
        }
        else {
          dispatch({
            type: PATCH_USER_REQUEST_FAILED,
            payload: res.message
          })
        }
      })
      .catch(err => {
        dispatch({
          type: PATCH_USER_REQUEST_FAILED
        })
      })
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
