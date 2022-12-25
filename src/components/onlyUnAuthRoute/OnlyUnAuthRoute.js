import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from '../loader/Loader';

export function OnlyUnAuthRoute ({ children, ...rest }) {

  const feedRequest = useSelector((state) => state.authorization.feedRequest);
  const isAuth = useSelector((state) => state.authorization.isAuth);

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
