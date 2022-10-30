import {
  GET_USER_REQUEST,
  GET_USER_REQUEST_FAILED,
  GET_USER_REQUEST_SUCCESS,
  REFRESH_ACCESS_TOKEN_REQUEST,
  REFRESH_ACCESS_TOKEN_REQUEST_SUCCESS,
  REFRESH_ACCESS_TOKEN_REQUEST_FAILED,
  EXIT_REQUEST_SUCCESS,
  CANCEL_EDIT_USER,
  PATCH_USER_REQUEST,
  PATCH_USER_REQUEST_SUCCESS,
  PATCH_USER_REQUEST_FAILED,
} from '../actions/actionsAuthorization';

const defaultState = {
  feedRequest: false,
  feedFailed: false,
  feedRequestPatchUser: false,
  feedFailedPatchUser: false,
  status: false,
  error: null,
  user: {
    email: null,
    name: null,
  },
}

export const authorization = ( state = defaultState, action ) => {
  switch(action.type) {
    case GET_USER_REQUEST: {
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
        status: true,
        feedRequest: false,
      }
    }
    case GET_USER_REQUEST_FAILED: {
      return { ...state,
        status: false,
        feedRequest: false,
        feedFailed: true
      }
    }

    case REFRESH_ACCESS_TOKEN_REQUEST: {
      return { ...state, feedRequest: true, feedFailed: false }
    }
    case REFRESH_ACCESS_TOKEN_REQUEST_SUCCESS: {
      return {
        ...state,
        status: true,
        // feedRequest: true,
      }
    }
    case REFRESH_ACCESS_TOKEN_REQUEST_FAILED: {
      return { ...state,
        status: false,
        feedRequest: false,
        feedFailed: true
      }
    }

    case PATCH_USER_REQUEST: {
      return { ...state,
        feedRequestPatchUser: true,
        feedFailedPatchUser: false
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
        feedFailedPatchUser: true,
      }
    }
    case CANCEL_EDIT_USER: {
      return { ...state }
    }
    case EXIT_REQUEST_SUCCESS: {
      return { ...state,
        user: {
          ...state.user,
          email: '',
          name: ''
        },
      };
    }
    default:
      return state
  }
}
