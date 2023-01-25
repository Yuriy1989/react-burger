import { FC } from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import Loader from '../loader/Loader';
import { useAppSelector as useSelector} from '../../services/store/hooks';

type TAuth = {
  isAuth: boolean
}

const ProtectedRoute: FC<TAuth> = ({ children, isAuth, ...rest}) => {

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
                  },
                  stateModal: {
                    from: locations
                  }
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
