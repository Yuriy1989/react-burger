import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from '../loader/Loader';

export function ProtectedRoute ({ children, ...rest }) {

  const { isAuth } = rest;
  const feedRequest = useSelector((state) => state.authorization.feedRequest);

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
