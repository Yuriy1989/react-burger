import { FC, ReactNode } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Loader from '../loader/Loader';
import { useAppSelector as useSelector } from '../../services/store/hooks';
import { TProtectedRouteProps } from '../../services/types';

const OnlyUnAuthRoute: FC<TProtectedRouteProps> = ({ children, ...rest }) => {

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

export default OnlyUnAuthRoute;
