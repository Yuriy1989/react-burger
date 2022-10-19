import { Route, Redirect } from 'react-router-dom';
import { useState, useCallback } from 'react';
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
