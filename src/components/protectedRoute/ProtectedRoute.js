import { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCookie } from '../../utils/cookie';
import { actionRequestGetUser } from '../../services/actions/actionsAuthorization';
import Loader from '../loader/Loader';

export function ProtectedRoute ({ children, ...rest }) {

  const accessToken = getCookie('accessToken');
  const refreshToken = getCookie('refreshToken');
  const feedRequest = useSelector((state) => state.authorization.feedRequest);
  const isAuth = useSelector((state) => state.authorization.isAuth);
  console.log('isAuth', isAuth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actionRequestGetUser(accessToken, refreshToken))
  }, [dispatch])

  return (
    <>
      {feedRequest && <Loader />}
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
