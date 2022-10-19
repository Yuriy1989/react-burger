import {
  LOGIN_REQUEST_SUCCESS,
  EXIT_REQUEST_SUCCESS,
} from '../actions/actionsAuthorization';

const defaultState = {
  user: {
    email: '',
    name: ''
  },
}

export const authorization = ( state=defaultState, action ) => {
  switch(action.type) {
    case LOGIN_REQUEST_SUCCESS: {
      const data = action.payload
      return { ...state,
        user: {
          ...state.user,
          email: data.user.email,
          name: data.user.name
        },
      };
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
