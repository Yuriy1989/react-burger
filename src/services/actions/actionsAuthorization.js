export const REGISTER_REQUEST = 'SET_DATA_AUTHORIZATION';
export const REGISTER_REQUEST_SUCCESS = 'SET_DATA_AUTHORIZATION_SUCCESS';
export const REGISTER_REQUEST_FAILED = 'SET_DATA_AUTHORIZATION_FAILED';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_REQUEST_SUCCESS = 'LOGIN_REQUEST_SUCCESS';
export const LOGIN_REQUEST_FAILED = 'LOGIN_REQUEST_FAILED';
export const EXIT_REQUEST = 'EXIT_REQUEST';
export const EXIT_REQUEST_SUCCESS = 'EXIT_REQUEST_SUCCESS';
export const EXIT_REQUEST_FAILED = 'EXIT_REQUEST_FAILED';

import { api } from '../../utils/Api';
import { setCookie, deleteCookie } from '../../utils/cookie';

export const actionRequestRegister = (data) => {
  return (dispatch) => {
    dispatch({
      type: REGISTER_REQUEST
    })
    api.register(data)
      .then(res => {
        if (res && res.success) {
          let accessToken;
          if(res.accessToken.indexOf('Bearer') === 0) {
            accessToken = res.accessToken.split('Bearer ')[1];
          }
          dispatch({
            type: REGISTER_REQUEST_SUCCESS,
            payload: {
              email: res.user.email,
              name: res.user.name,
              accessToken: accessToken,
              refreshToken: res.refreshToken
          }
          })
        } else {
          dispatch({
            type: REGISTER_REQUEST_FAILED
          })
        }
      }).catch(err => {
        dispatch({
          type: REGISTER_REQUEST_FAILED
        })
      })
  }
}

export const actionRequestAuth = (data) => {
  return (dispatch) => {
    dispatch({
      type: LOGIN_REQUEST
    })
    api.login(data)
      .then(res => {
        if (res && res.success) {
          let accessToken;
          if (res.accessToken.indexOf('Bearer') === 0) {
            accessToken = res.accessToken.split('Bearer ')[1];
          }
          if(res.refreshToken) {
            setCookie('token', res.refreshToken, { expires: 20000 } );
          }
          dispatch({
            type: LOGIN_REQUEST_SUCCESS,
            payload: {
              accessToken: accessToken,
              refreshToken: res.refreshToken
            }
          })
        } else {
          dispatch({
            type: LOGIN_REQUEST_FAILED
          })
        }
      }).catch(err => {
        dispatch({
          type: LOGIN_REQUEST_FAILED
        })
      })
  }
}

export const actionRequestExit = (data) => {
  return (dispatch) => {
    dispatch({
      type: EXIT_REQUEST
    })
    api.logout(data)
      .then(res => {
        if (res && res.success) {
          deleteCookie('token');
          dispatch({
            type: EXIT_REQUEST_SUCCESS
          })
        } else {
          dispatch({
            type: EXIT_REQUEST_FAILED
          })
        }
      }).catch(err => {
        dispatch({
          type: EXIT_REQUEST_FAILED
        })
      })
  }
}
