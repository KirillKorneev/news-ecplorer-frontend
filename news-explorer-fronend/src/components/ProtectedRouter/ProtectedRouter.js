import React from 'react';
import { Route, Redirect, useHistory } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...props  }) => {
  const history = useHistory();

  return (
    <Route>
      {
        () => props.isLogin ? <Component {...props} /> : history.push('/', {
          noAuthRedirect: true
        })
      }
    </Route>
)}

export { ProtectedRoute };