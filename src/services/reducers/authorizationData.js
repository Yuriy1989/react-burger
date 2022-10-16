import {
  REGISTER_REQUEST,
  REGISTER_REQUEST_SUCCESS,
  REGISTER_REQUEST_FAILED,
  LOGIN_REQUEST,
  LOGIN_REQUEST_SUCCESS,
  LOGIN_REQUEST_FAILED,
  EXIT_REQUEST,
  EXIT_REQUEST_SUCCESS,
  EXIT_REQUEST_FAILED
} from '../actions/actionsAuthorization';

const defaultState = {
  feedRequest: false,
  feedFailed: false,
  user: {
    email: '',
    name: ''
  },
  accessToken: '',
  refreshToken: '',
}

export const authorization = ( state=defaultState, action ) => {
  switch(action.type) {
    case REGISTER_REQUEST: {
      return { ...state, feedRequest: true, feedFailed: false };
    }
    case REGISTER_REQUEST_SUCCESS: {
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
    case REGISTER_REQUEST_FAILED: {
      return { ...state, feedRequest: false, feedFailed: true };
    }
    case LOGIN_REQUEST: {
      return { ...state, feedRequest: true, feedFailed: false };
    }
    case LOGIN_REQUEST_SUCCESS: {
      const data = action.payload
      return { ...state,
        user: {
          ...state.user,
        },
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        feedRequest: false
      };
    }
    case LOGIN_REQUEST_FAILED: {
      return { ...state, feedRequest: false, feedFailed: true };
    }
    case EXIT_REQUEST: {
      return { ...state, feedRequest: true, feedFailed: false};
    }
    case EXIT_REQUEST_SUCCESS: {
      return { ...state, accessToken: '', refreshToken: '', feedRequest: false,};
    }
    case EXIT_REQUEST_FAILED: {
      return { ...state, feedRequest: false, feedFailed: true }
    }
    default:
      return state
  }
}
