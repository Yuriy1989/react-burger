export const SET_DATA_AUTHORIZATION = 'SET_DATA_AUTHORIZATION';
export const SET_DATA_AUTHORIZATION_SUCCESS = 'SET_DATA_AUTHORIZATION_SUCCESS';
export const SET_DATA_AUTHORIZATION_FAILED = 'SET_DATA_AUTHORIZATION_FAILED';
export const GET_DATA_AUTHORIZATION = 'GET_DATA_AUTHORIZATION';

import { api } from '../../utils/Api';

export const setAuthorizationApi = (data) => {
  return (dispatch) => {
    dispatch({
      type: SET_DATA_AUTHORIZATION
    })
    api.register(data)
      .then(res => {
        if (res && res.success) {
          let accessToken;
          if(res.accessToken.indexOf('Bearer') === 0) {
            accessToken = res.accessToken.split('Bearer ')[1];
          }
          console.log('accessToken', accessToken);
          dispatch({
            type: SET_DATA_AUTHORIZATION_SUCCESS,
            payload: {
              email: res.user.email,
              name: res.user.name,
              accessToken: accessToken,
              refreshToken: res.refreshToken
          }
          })
        } else {
          dispatch({
            type: SET_DATA_AUTHORIZATION_FAILED
          })
        }
      }).catch(err => {
        dispatch({
          type: SET_DATA_AUTHORIZATION_FAILED
        })
      })
  }
}
