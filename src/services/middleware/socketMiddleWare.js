export const socketMiddleware = (wsActions) => {
  return store => {
    let socket = null;

    return next => action => {
      const { dispatch } = store;
      const { type, payload } = action;
      const {
        wsInit,
        onOpen,
        onClose,
        onError,
        onOrders,
      } = wsActions;

      if(type === wsInit) {
        socket = new WebSocket(`${payload}`);
      }
      if(socket) {
        socket.onopen = event => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = event => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;
          dispatch({ type: onOrders, payload: restParsedData })
        };

        socket.onclose = event => {
          dispatch({ type: onClose, payload: event })
        };
      }

      next(action);
    }
  }
};



