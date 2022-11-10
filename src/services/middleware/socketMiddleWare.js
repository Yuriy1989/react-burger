import { getCookie } from '../../utils/cookie';

export const socketMiddleware = (wsActions) => {
  return store => {
    let socket = null;

    return next => action => {
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
      // console.log('getState', store.getState());
      console.log('payload', payload);
      // console.log('type', type);

      if(type === wsInit) {
        socket = new WebSocket(`${payload.wsUrl}?token=${accessToken}`);
      }
      if(socket) {
        socket.onopen = event => {
          console.log('onopen соединение установлено', event.type);
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = event => {
          console.log('onerror socketMiddleware event=', event);
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;
          console.log('data', data);
          dispatch({ type: onMessage, payload: restParsedData })
        };

        socket.onclose = event => {
          dispatch({ type: onClose, payload: event })
        };
      }

      next(action);
    }
  }
};



