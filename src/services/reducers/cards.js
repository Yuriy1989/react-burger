import { api } from '../../utils/Api';
import { GET_CARDS_API, TEST_API, GET_CARDS } from '../actions/cards';

const defaultCard = {
  name: 0,
}

export const cardsApi = ( state = defaultCard, action ) => {
  switch (action.type) {
    case GET_CARDS: {
      const items = action.payload
      return items
    }
    case GET_CARDS_API: {
      const newName = action.payload
      return {...state, name: newName}
    }
    case TEST_API: {
      const newName = action.payload
      return {...state, name: newName}
    }
    default:
      return state
  }
}
