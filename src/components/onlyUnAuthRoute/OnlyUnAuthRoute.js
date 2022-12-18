import { useEffect } from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCookie } from '../../utils/cookie';
import { actionRequestGetUser } from '../../services/actions/actionsAuthorization';
import Loader from '../loader/Loader';

export function OnlyUnAuthRoute ({ children, ...rest }) {

  const accessToken = getCookie('accessToken');
  const refreshToken = getCookie('refreshToken');

  const feedRequest = useSelector((state) => state.authorization.feedRequest);
  const isAuth = useSelector((state) => state.authorization.isAuth);
  const location = useLocation();

  console.log('isAuth OnlyUnAuthRoute', isAuth);
  console.log('location OnlyUnAuthRoute', location);

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(actionRequestGetUser(accessToken, refreshToken))
  // }, [dispatch])

  return (
    <>
      {feedRequest && <Loader />}
      {
        !feedRequest &&
        <Route
          {...rest}
          render={({ location }) =>
            !isAuth ? (
              children
            ) : (
              <Redirect
                to={{
                  pathname: '/',
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
