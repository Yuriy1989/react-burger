export const OPEN_SELECTED_INRGEDIENT = 'OPEN_SELECTED_INRGEDIENTS';
export const CLOSE_MODALS = 'CLOSE_SELECTED_INRGEDIENT';
export const OPEN_ORDER_DETAILS = 'OPEN_ORDER_DETAILS';

export const openInfoSelectedInrgedient = (data) => {
  return (dispatch) => {
    dispatch({
      type: OPEN_SELECTED_INRGEDIENT,
      payload: data
    })
  }
}

export const openOrderDetails = () => {
  return (dispatch) => {
    dispatch({
      type: OPEN_ORDER_DETAILS,
    })
  }
}

export const closeModal = (data) => {
  return (dispatch) => {
    dispatch({
      type: CLOSE_MODALS,
      payload: data
    })
  }
}
