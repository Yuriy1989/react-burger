import { GET_CARDS_API } from '../actions/cards';

const defaultCards = {
  cards: []
}

export const cardsApi = ( state = defaultCards, action ) => {
  switch (action.type) {
    case GET_CARDS_API: {
      const cardsApi = action.payload
      return {...state, cards: cardsApi}
    }
    default:
      return state
  }
}
