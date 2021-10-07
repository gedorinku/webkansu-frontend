import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";


function PrivateRoute({...props}) {
  let { info } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        true ? (
          <div>Children</div>
        ) : (
          <Redirect
            to={{
              pathname: "/login"
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
