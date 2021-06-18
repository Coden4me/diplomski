import { Suspense } from "react";
import { Route, Switch } from "react-router";
import { createSelector } from "reselect";
import { protectedRoutes, public_routes } from "./routes";
import { useSelector } from "react-redux";
import Spinner from "components/Spinner";
import ProtectedRoute from "./protectedRoute";
import PageNotFound from "pages/page_not_found";

const reduxProps = createSelector(
  (state) => state.auth.isAuthenticated,
  (state) => state.auth.authLoading,
  (isAuthenticated, loading) => ({ isAuthenticated, loading })
);

const Routes = () => {
  const { isAuthenticated, loading } = useSelector(reduxProps);

  if (loading) return <Spinner />;

  return (
    <Switch>
      {public_routes.map(({ Component, path, exact }) => (
        <Route
          key={path}
          path={path}
          exact={exact}
          render={(props) => (
            <Suspense fallback={<Spinner />}>
              <Component {...props} />
            </Suspense>
          )}
        />
      ))}
      {isAuthenticated && (
        <Route
          exact
          render={() => (
            <Switch>
              {protectedRoutes.map((route) => (
                <ProtectedRoute
                  key={route.path}
                  {...route}
                  isAuthenticated={isAuthenticated}
                />
              ))}
              <Route exact path="/404" render={() => <PageNotFound />} />
              <Route exact path="*" component={PageNotFound} />
            </Switch>
          )}
        />
      )}
      <Route exact path="*" component={PageNotFound} />
    </Switch>
  );
};

export default Routes;
