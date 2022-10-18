import { Route, Redirect } from 'react-router-dom';
import { useState, useCallback } from 'react';
import { getCookie } from '../../utils/cookie';

export function ProtectedRoute ({ children, ...rest }) {

  const token = getCookie('token');

  return (
    <Route
      {...rest}
      render={({ location }) =>
      token ? (
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
