export const GET_CARDS_API = 'GET_CARDS_API';
export const TEST_API = 'TEST_API';
export const GET_CARDS = 'GET_CARDS';

// import { api } from '../../utils/Api';

export const testApi = () => {
  return {
    type: TEST_API,
    payload: {
      name: 133333
    },
  }
}

// export const getCards = () => {
//   return (dispatch) => {
//     api.getIngridients()
//       .then(res => {
//         dispatch({
//           type: TEST_API,
//           payload: "res",
//         })
//       })
//       .catch(console.log);
//   }
// }
