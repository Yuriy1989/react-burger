export const OPEN_SELECTED_INRGEDIENT = 'OPEN_SELECTED_INRGEDIENTS';
export const CLOSE_SELECTED_INRGEDIENT = 'CLOSE_SELECTED_INRGEDIENT';

export const openInfoSelectedInrgedient = (data) => {
  return (dispatch) => {
    dispatch({
      type: OPEN_SELECTED_INRGEDIENT,
      payload: data
    })
  }
}

export const closeInfoSelectedInrgedient = (data) => {
  return (dispatch) => {
    dispatch({
      type: CLOSE_SELECTED_INRGEDIENT,
      payload: data
    })
  }
}
