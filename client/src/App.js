import React from "react";
import "tailwindcss/dist/tailwind.css";
import "styles/globalStyles.css";
import Header from "components/headers";
import Footer from "components/footer";

import { BrowserRouter as Router } from "react-router-dom";

import AnimationRevealPage from "helpers/AnimationRevealPage";
import Routes from "./routes";

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { createSelector } from "reselect";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "components/Spinner";
import {
  refreshToken,
  getUserData,
  resetNewsletterResponse,
} from "./reduxStore/actions";
import Alert from "components/alert";

const reduxProps = createSelector(
  (state) => state.auth.authLoading,
  (state) => state.auth.isAuthenticated,
  (state) => state.newsletter,
  (loading, isAuthenticated, newsletter) => ({
    loading,
    isAuthenticated,
    ...newsletter,
  })
);

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const dispatch = useDispatch();
  const { loading, isAuthenticated, status, message } = useSelector(reduxProps);

  const reset = () => dispatch(resetNewsletterResponse);

  useEffect(() => {
    dispatch(refreshToken(true));
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(refreshToken(true));
      dispatch(getUserData);
    }
  }, [dispatch, isAuthenticated]);

  if (loading) return <Spinner />;

  return (
    <Router>
      {message && (
        <Alert
          message={message}
          type={status < 400 ? "success" : "error"}
          cb={reset}
        />
      )}
      <ScrollToTop />
      <Header />
      <AnimationRevealPage>
        <Routes />
      </AnimationRevealPage>
      <Footer />
    </Router>
  );
}

export default App;
