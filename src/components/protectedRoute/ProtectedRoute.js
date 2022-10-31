import { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCookie } from '../../utils/cookie';
import { actionRequestGetUser, actionRefreshAccessToken, actionRequestPatchUser } from '../../services/actions/actionsAuthorization';

export function ProtectedRoute ({ children, ...rest }) {

  const accessToken = getCookie('accessToken');
  const refreshToken = getCookie('refreshToken');

  console.log('КУКИ accessToken,', accessToken);
  console.log('КУКИ refreshToken,', refreshToken);

  const feedRequest = useSelector((state) => state.authorization.feedRequest);
  const isAuth = useSelector((state) => state.authorization.isAuth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actionRequestGetUser(accessToken, refreshToken))
  }, [dispatch])

  return (
    <>
      {feedRequest && <h2 className={`text text_type_main-large`}>Загрузка...</h2>}
      {
        !feedRequest &&
        <Route
          {...rest}
          render={({ location }) =>
            isAuth ? (
              children
            ) : (
              <Redirect
                to={{
                  pathname: '/login',
                  state: { from: location }
                }}
              />
            )
          }
        />
      }
    </>
  )
}
