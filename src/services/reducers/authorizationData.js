import {
  GET_REQUEST,
  SUCCESS_AUTH,
  GET_USER_REQUEST_FAILED,
  GET_USER_REQUEST_SUCCESS,
  REFRESH_ACCESS_TOKEN_REQUEST,
  REFRESH_ACCESS_TOKEN_REQUEST_SUCCESS,
  REFRESH_ACCESS_TOKEN_REQUEST_FAILED,
  EXIT_REQUEST,
  EXIT_REQUEST_SUCCESS,
  EXIT_REQUEST_FAILED,
  CANCEL_EDIT_USER,
  PATCH_USER_REQUEST,
  PATCH_USER_REQUEST_SUCCESS,
  PATCH_USER_REQUEST_FAILED,
} from '../actions/actionsAuthorization';

const defaultState = {
  feedRequest: false,
  feedRequestPatchUser: false,
  isAuth: false,
  error: null,
  user: {
    email: null,
    name: null,
  },
}

export const authorization = ( state = defaultState, action ) => {
  switch(action.type) {
    case GET_REQUEST: {
      return { ...state, feedRequest: true, feedFailed: false }
    }
    case GET_USER_REQUEST_SUCCESS: {
      const data = action.payload;
      return {
        ...state,
        user: {
          ...state.user,
          email: data.email,
          name: data.name
        },
        feedRequest: false,
      }
    }
    case GET_USER_REQUEST_FAILED: {
      return { ...state,
        feedRequest: false,
        isAuth: false
      }
    }
    case SUCCESS_AUTH: {
      return {
        ...state,
        isAuth: true
      }
    }

    case REFRESH_ACCESS_TOKEN_REQUEST: {
      return { ...state, feedRequest: true, feedFailed: false }
    }
    case REFRESH_ACCESS_TOKEN_REQUEST_SUCCESS: {
      return {
        ...state,
        feedRequest: true,
      }
    }
    case REFRESH_ACCESS_TOKEN_REQUEST_FAILED: {
      return { ...state,
        feedRequest: false,
        isAuth: false
      }
    }

    case PATCH_USER_REQUEST: {
      return { ...state,
        feedRequestPatchUser: true,
      }
    }
    case PATCH_USER_REQUEST_SUCCESS: {
      const data = action.payload;
      return {
        ...state,
        user: {
          ...state.user,
          email: data.user.email,
          name: data.user.name
        },
        error: null,
        feedRequestPatchUser: false,
      }
    }
    case PATCH_USER_REQUEST_FAILED: {
      const data = action.payload;
      return {
        ...state,
        error: data,
        feedRequestPatchUser: false,
      }
    }
    case CANCEL_EDIT_USER: {
      return { ...state }
    }

    case EXIT_REQUEST: {
      return { ...state };
    }
    case EXIT_REQUEST_SUCCESS: {
      console.log();
      return { ...state,
        user: {
          ...state.user,
          email: '',
          name: ''
        },
        isAuth: false
      };
    }
    case EXIT_REQUEST_FAILED: {
      return { ...state };
    }

    default:
      return state
  }
}
