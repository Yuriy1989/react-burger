import { setCookie, deleteCookie, timeCookie } from '../../utils/cookie';
import { api } from '../../utils/Api';
import {
  SUCCESS_AUTH,
  AUTH_REQUEST_FAILED,
  AUTH_REQUEST_SUCCESS,
  CANCEL_EDIT_USER,
  EXIT_REQUEST,
  EXIT_REQUEST_FAILED,
  EXIT_REQUEST_SUCCESS,
  GET_REQUEST,
  GET_USER_REQUEST_FAILED,
  GET_USER_REQUEST_SUCCESS,
  PATCH_USER_REQUEST,
  PATCH_USER_REQUEST_FAILED,
  PATCH_USER_REQUEST_SUCCESS,
  REFRESH_ACCESS_TOKEN_REQUEST,
  REFRESH_ACCESS_TOKEN_REQUEST_FAILED,
  REFRESH_ACCESS_TOKEN_REQUEST_SUCCESS
} from '../constants';
import { AppDispatch, AppThunk } from '../store/store';
import { IAuth } from '../types';

export interface ISUCCESS_AUTH {
  type: typeof SUCCESS_AUTH;
}

export interface IAUTH_REQUEST_FAILED {
  type: typeof AUTH_REQUEST_FAILED;
}

export interface IAUTH_REQUEST_SUCCESS {
  payload: any;
  type: typeof AUTH_REQUEST_SUCCESS;
}

export interface ICANCEL_EDIT_USER {
  type: typeof CANCEL_EDIT_USER;
}

export interface IEXIT_REQUEST {
  type: typeof EXIT_REQUEST;
}

export interface IEXIT_REQUEST_FAILED {
  type: typeof EXIT_REQUEST_FAILED;
}

export interface IEXIT_REQUEST_SUCCESS {
  type: typeof EXIT_REQUEST_SUCCESS;
}

export interface IGET_REQUEST {
  type: typeof GET_REQUEST;
}

export interface IGET_USER_REQUEST_FAILED {
  type: typeof GET_USER_REQUEST_FAILED;
}

export interface IGET_USER_REQUEST_SUCCESS {
  payload: any;
  type: typeof GET_USER_REQUEST_SUCCESS;
}

export interface IPATCH_USER_REQUEST {
  type: typeof PATCH_USER_REQUEST;
}

export interface IPATCH_USER_REQUEST_FAILED {
  payload?: any;
  type: typeof PATCH_USER_REQUEST_FAILED;
}

export interface IPATCH_USER_REQUEST_SUCCESS {
  payload: any;
  type: typeof PATCH_USER_REQUEST_SUCCESS;
}

export interface IREFRESH_ACCESS_TOKEN_REQUEST {
  type: typeof REFRESH_ACCESS_TOKEN_REQUEST;
}

export interface IREFRESH_ACCESS_TOKEN_REQUEST_FAILED {
  type: typeof REFRESH_ACCESS_TOKEN_REQUEST_FAILED;
}

export interface IREFRESH_ACCESS_TOKEN_REQUEST_SUCCESS {
  type: typeof REFRESH_ACCESS_TOKEN_REQUEST_SUCCESS;
}

export type TAuth=
  | ISUCCESS_AUTH
  | IAUTH_REQUEST_FAILED
  | IAUTH_REQUEST_SUCCESS
  | ICANCEL_EDIT_USER
  | IEXIT_REQUEST
  | IEXIT_REQUEST_FAILED
  | IEXIT_REQUEST_SUCCESS
  | IGET_REQUEST
  | IGET_USER_REQUEST_FAILED
  | IGET_USER_REQUEST_SUCCESS
  | IPATCH_USER_REQUEST
  | IPATCH_USER_REQUEST_FAILED
  | IPATCH_USER_REQUEST_SUCCESS
  | IREFRESH_ACCESS_TOKEN_REQUEST
  | IREFRESH_ACCESS_TOKEN_REQUEST_FAILED
  | IREFRESH_ACCESS_TOKEN_REQUEST_SUCCESS;

export const actionRequestAuth: AppThunk = (data: IAuth) => (dispatch: AppDispatch) => {
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

export const actionRequestGetUser: AppThunk = (accessToken: string | undefined, refreshToken: string | undefined) => {
  return (dispatch: AppDispatch) => {
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

export const actionRefreshAccessToken: AppThunk = (refreshToken: string | undefined) => {
  let newAccessToken: string | null = null;
  return (dispatch: AppDispatch) => {
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

export const actionRequestPatchUser: AppThunk = (data: IAuth, accessToken: string | undefined) => {
  return (dispatch: AppDispatch) => {
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

export const actionRequestCancelEditUser: AppThunk = () => {
  return(dispatch: AppDispatch) => {
    dispatch({
      type: CANCEL_EDIT_USER
    })
  }
}

export const actionRequestExit: AppThunk = (refreshToken: string | undefined) => {
  return (dispatch: AppDispatch) => {
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
