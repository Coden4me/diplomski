import { Suspense } from "react";
import { Redirect, Route } from "react-router";

const ProtectedRoute = ({ Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated ? (
        <Suspense fallback={null}>
          <Component {...props} />
        </Suspense>
      ) : (
        <Redirect to="/404" />
      )
    }
  />
);

export default ProtectedRoute;
