

// //экшен для отправки запроса на сервер для получение последних 50 заказов
// export const GET_ORDERS_API = 'GET_ORDERS_API';
// //экшен при получение положительного ответа от сервера
// export const GET_ORDERS_API_SUCCESS = 'GET_ORDERS_API_SUCCESS';
// //экшен при получение отрицательно ответа от сервера
// export const GET_ORDERS_API_FAILED = 'GET_ORDERS_API_FAILED';

// import { api } from '../../utils/Api';

// export const getIngredients = () => {
//   return (dispatch) => {
//     dispatch({
//       type: GET_ORDERS_API
//     })
//     api.getOrders()
//       .then(res => {
//         console.log('res = ', res);
//         if (res && res.success) {
//           dispatch({
//             type: GET_ORDERS_API_SUCCESS,
//             payload: res
//           })
//         } else {
//           dispatch({
//             type: GET_ORDERS_API_FAILED
//           })
//         }
//       }).catch(err => {
//         dispatch({
//           type: GET_ORDERS_API_FAILED
//         })
//       })
//   }
// }
