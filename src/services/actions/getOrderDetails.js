export const GET_ORDER_DETAILS = 'GET_ORDER_DETAILS';
export const GET_ORDER_DETAILS_SUCCESS = 'GET_ORDER_DETAILS_SUCCESS';
export const GET_ORDER_DETAILS_SUCCESS_FAILED = 'GET_ORDER_DETAILS_SUCCESS_FAILED';
export const CALC_PRICE_ORDER_DETAILS = 'CALC_PRICE_ORDER_DETAILS';
export const SET_SELECTED_ID_INGREDIENTS = 'SET_SELECTED_ID_INGREDIENTS';

export const getOrderDetails = (data) => {
  return(dispatch) => {
    dispatch({
      type: GET_ORDER_DETAILS,
    })
    fetch('https://norma.nomoreparties.space/api//orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "ingredients": data
      })
    })
      .then(res => res.ok ? res.json() : Promise.reject(res.status))
      .then(res => {
        if(res && res.success) {
          dispatch({
            type: GET_ORDER_DETAILS_SUCCESS,
            payload: res
          })
        } else {
          dispatch({
            type: GET_ORDER_DETAILS_SUCCESS_FAILED
          })
        }
      }).catch(err => {
        dispatch({
          type: GET_ORDER_DETAILS_SUCCESS_FAILED
        })
      })
  }
}

export const calcPrice = (data) => {
  return(dispatch) => {
    dispatch({
      type: CALC_PRICE_ORDER_DETAILS,
      payload: data
    })
  }
}

export const setSelectedId = (data) => {
  return(dispatch) => {
    dispatch({
      type: SET_SELECTED_ID_INGREDIENTS,
      payload: data
    })
  }
}
