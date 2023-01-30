import { FC } from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import Loader from '../loader/Loader';
import { useAppSelector as useSelector} from '../../services/store/hooks';
import { TProtectedRouteProps } from '../../services/types';

const ProtectedRoute: FC<TProtectedRouteProps> = ({ children, isAuth, ...rest}) => {

  const feedRequest = useSelector((state) => state.authorization.feedRequest);
  const locations = useLocation();

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
                  state: {
                    from: location,
                    from_2: locations
                  },
                }}
              />
            )
          }
        />
      }
    </>
  )
}

export default ProtectedRoute;
