import { getCookie } from '../../utils/cookie';

export const socketMiddleware = (wsUrl, wsActions) => {
  return store => {
    let socket = null;

    return next => action => {
      console.log('socketMiddleware');
      const { dispatch, getState } = store;
      const { type, payload } = action;
      const {
        wsInit,
        onOpen,
        onClose,
        onError,
        onMessage
      } = wsActions;

      const accessToken = getCookie('accessToken');

      if(type === wsInit) {
        socket = new WebSocket(`${wsUrl}/?token=${accessToken}`);
      }
      if(socket) {
        console.log('socketMiddleware socket=', socket);
        socket.onopen = event => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = event => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = event => {
          const { data } = event;
          console.log('onmessage =', data);
          // const parsedData = JSON.parse(data);
          // const { success, ...restParsedData } = parsedData;
          dispatch({ type: onMessage, payload: data })
        };

        socket.onclose = event => {
          dispatch({ typa: onClose, payload: event })
        };
      }

      next(action);
    }
  }
};



