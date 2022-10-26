import { Route, Redirect } from 'react-router-dom';
import { getCookie } from '../../utils/cookie';

export function ProtectedRoute ({ children, ...rest }) {

  const accessToken = getCookie('accessToken');

  return (
    <Route
      {...rest}
      render={({ location }) =>
      accessToken ? (
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
  )
}
