import { Route, Redirect } from 'react-router-dom';
import { getCookie } from '../../utils/cookie';

export function ProtectedRoute ({ children, ...rest }) {

  const token = getCookie('token');
  console.log('token авторизованный = ', token);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        token ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login'
            }}
            />
        )
      }
    />
  )
}
