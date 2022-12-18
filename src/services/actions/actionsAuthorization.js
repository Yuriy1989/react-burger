export const SUCCESS_AUTH = 'SUCCESS_AUTH';
export const AUTH_REQUEST_SUCCESS = 'AUTH_REQUEST_SUCCESS';
export const AUTH_REQUEST_FAILED = 'AUTH_REQUEST_FAILED';
export const GET_REQUEST = 'GET_REQUEST';
export const GET_USER_REQUEST_SUCCESS = 'GET_USER_REQUEST_SUCCESS';
export const GET_USER_REQUEST_FAILED = 'GET_USER_REQUEST_FAILED';
export const REFRESH_ACCESS_TOKEN_REQUEST = 'REFRESH_ACCESS_TOKEN_REQUEST';
export const REFRESH_ACCESS_TOKEN_REQUEST_SUCCESS = 'REFRESH_ACCESS_TOKEN_REQUEST_SUCCESS';
export const REFRESH_ACCESS_TOKEN_REQUEST_FAILED = 'REFRESH_ACCESS_TOKEN_REQUEST_FAILED';
export const PATCH_USER_REQUEST = 'PATCH_USER_REQUEST';
export const PATCH_USER_REQUEST_SUCCESS = 'PATCH_USER_REQUEST_SUCCESS';
export const PATCH_USER_REQUEST_FAILED = 'PATCH_USER_REQUEST_FAILED';
export const EXIT_REQUEST = 'EXIT_REQUEST';
export const EXIT_REQUEST_SUCCESS = 'EXIT_REQUEST_SUCCESS';
export const EXIT_REQUEST_FAILED = 'EXIT_REQUEST_FAILED';
export const CANCEL_EDIT_USER = 'CANCEL_USER_EDIT';

import { setCookie, deleteCookie, timeCookie } from '../../utils/cookie';
import { api } from '../../utils/Api';

export const actionRequestAuth = (data) => {
  return (dispatch) => {
    dispatch({
      type: GET_REQUEST
    })
    api.login(data)
      .then(res => {
        if (res && res.success) {
          if (res.accessToken.indexOf('Bearer') === 0) {
            const accessToken = res.accessToken.split('Bearer ')[1];
            setCookie('accessToken', accessToken, { 'max-age': timeCookie });
            setCookie('refreshToken', res.refreshToken);
          }
          dispatch({
            type: AUTH_REQUEST_SUCCESS,
            payload: res.user
          })
        }
        else {
          dispatch({
            type: AUTH_REQUEST_FAILED,
            payload: res.message
          })
        }
      })
      .catch(err => {
        dispatch({
          type: AUTH_REQUEST_FAILED
        })
      })
  }
}

export const actionRequestGetUser = (accessToken, refreshToken) => {
  console.log('actionRequestGetUser');
  return (dispatch) => {
    dispatch({
      type: GET_REQUEST
    })
    api.getUser(accessToken)
      .then(res => {
        if (res && res.success) {
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
      .catch((err) => {
        if ((err === 403)) {
          dispatch(actionRefreshAccessToken(refreshToken));
        } else {
          dispatch({
            type: GET_USER_REQUEST_FAILED
          })
        }
      })
  }
}

export const actionRefreshAccessToken = (refreshToken) => {
  let newAccessToken = null;
  return (dispatch) => {
    dispatch({
      type: REFRESH_ACCESS_TOKEN_REQUEST
    })
    api.refreshToken(refreshToken)
      .then(res => {
        if(res && res.success) {
          newAccessToken = res.accessToken.split('Bearer ')[1];
          setCookie('accessToken', newAccessToken, { 'max-age': timeCookie });
          setCookie('refreshToken', res.refreshToken);
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
      .then(() => {
        api.getUser(newAccessToken)
          .then(res => {
            if(res && res.success) {
              dispatch({
                type: GET_USER_REQUEST_SUCCESS,
                payload: res.user
              })
            } else {
              dispatch({
                type: GET_USER_REQUEST_FAILED
              })
            }
          })
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
        if(res && res.success) {
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

export const actionRequestExit = (refreshToken) => {
  return (dispatch) => {
    dispatch({
      type: EXIT_REQUEST
    })
    api.logout(refreshToken)
      .then(res => {
        if(res && res.success) {
          deleteCookie('refreshToken');
          deleteCookie('accessToken');
          dispatch({
            type: EXIT_REQUEST_SUCCESS,
          })
        }
        else {
          dispatch({
            type: EXIT_REQUEST_FAILED,
          })
        }
      })
      .catch(err => {
        dispatch({
          type: EXIT_REQUEST_FAILED
        })
      })
  }
}
