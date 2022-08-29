export const OPEN_SELECTED_INRGEDIENT = 'OPEN_SELECTED_INRGEDIENTS';
export const CLOSE_SELECTED_INRGEDIENT = 'CLOSE_SELECTED_INRGEDIENT';

export const openInfoSelectedInrgedient = (data) => {
  return (dispatch) => {
    const infoSelectedInrgedient = data;
    dispatch({
      type: OPEN_SELECTED_INRGEDIENT,
      payload: infoSelectedInrgedient
    })
  }
}
