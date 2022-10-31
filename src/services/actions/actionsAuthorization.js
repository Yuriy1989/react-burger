
export const GET_REQUEST = 'GET_REQUEST';
export const SUCCESS_AUTH = 'SUCCESS_AUTH';
export const GET_USER_REQUEST_SUCCESS = 'GET_USER_REQUEST_SUCCESS';
export const GET_USER_REQUEST_FAILED = 'GET_USER_REQUEST_FAILED';
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

export const actionRequestGetUser = (accessToken, refreshToken) => {
  return (dispatch) => {
    dispatch({
      type: GET_REQUEST
    })
    api.getUser(accessToken)
      .catch((err) => {
        if(err && (err.success === false)) {
          dispatch(actionRefreshAccessToken(refreshToken));
        }
      })
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
      .finally(() => {
        dispatch({
          type: SUCCESS_AUTH
        })
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
  let newAccessToken = null;

  return (dispatch) => {
    dispatch({
      type: REFRESH_ACCESS_TOKEN_REQUEST
    })
    api.refreshToken(refreshToken)
      .then(res => {
        if(res && res.success) {
          console.log('actionRefreshAccessToken ', res);
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
            }
          })
      })
      .finally(() => {
        dispatch({
          type: SUCCESS_AUTH
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
