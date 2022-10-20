import {
  GET_USER_REQUEST,
  GET_USER_REQUEST_FAILED,
  GET_USER_REQUEST_SUCCESS,
  EXIT_REQUEST_SUCCESS,
  PATCH_USER_REQUEST,
  PATCH_USER_REQUEST_SUCCESS,
  PATCH_USER_REQUEST_FAILED,
} from '../actions/actionsAuthorization';

const defaultState = {
  feedRequest: false,
  feedFailed: false,
  user: {
    email: '',
    name: ''
  },
}

export const authorization = ( state = defaultState, action ) => {
  switch(action.type) {
    case GET_USER_REQUEST: {
      return { ...state, feedRequest: true, feedFailed: false }
    }
    case GET_USER_REQUEST_SUCCESS: {
      console.log('GET_USER_REQUEST_SUCCESS');
      const data = action.payload;
      console.log('data', data);
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
      return { ...state, feedRequest: false, feedFailed: true }
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
