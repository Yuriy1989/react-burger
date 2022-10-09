import {
  SET_DATA_AUTHORIZATION,
  SET_DATA_AUTHORIZATION_SUCCESS,
  SET_DATA_AUTHORIZATION_FAILED,
  GET_DATA_AUTHORIZATION,
} from '../actions/actionsAuthorization';

const defaultState = {
  feedRequest: false,
  feedFailed: false,
  user: {
    email: '',
    name: ''
  },
  token: '',
  accessToken: '',
  refreshToken: ''
}

export const getAuthorization = ( state=defaultState, action ) => {
  switch(action.type) {
    case SET_DATA_AUTHORIZATION: {
      return { ...state, feedRequest: true, feedFailed: false };
    }
    case SET_DATA_AUTHORIZATION_SUCCESS: {
      const data = action.payload
      return { ...state,
        user: {
          ...state.user,
          email: data.email,
          name: data.name
        },
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        feedRequest: false
      };
    }
    case SET_DATA_AUTHORIZATION_FAILED: {
      return { ...state, feedRequest: true, feedFailed: false };
    }
    default:
      return state
  }
}
