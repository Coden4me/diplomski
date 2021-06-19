import "tailwindcss/dist/tailwind.css";
import "styles/globalStyles.css";
import Header from "components/headers";
import Footer from "components/footer";

import { useHistory, useLocation } from "react-router-dom";

import AnimationRevealPage from "helpers/AnimationRevealPage";
import Routes from "./routes";

import { useEffect, useState } from "react";
import { createSelector } from "reselect";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "components/Spinner";
import {
  refreshToken,
  resetNewsletterResponse,
  authSuccess,
  getUserData,
  authReset,
} from "./reduxStore/actions";
import Alert from "components/alert";

const reduxProps = createSelector(
  (state) => state.auth.authLoading,
  (state) => state.newsletter,
  (loading, newsletter) => ({
    loading,
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

let called = false;

function App() {
  const dispatch = useDispatch();
  const { loading, status, message } = useSelector(reduxProps);
  const location = useLocation();
  const history = useHistory();

  const [err, setError] = useState("");
  const token = new URLSearchParams(location.search).get("token");
  const error = new URLSearchParams(location.search).get("err");
  
  const reset = () => {
    setError("")
    dispatch(resetNewsletterResponse);
  }

  useEffect(() => {
    if (token) {
      called = true;
      dispatch(getUserData);
      dispatch(authSuccess(token));
      history.replace("/");
    }
    if (error) {
      called = true;
      setError(error);
      dispatch(authReset())
      history.replace("/");
    }
  }, [error, token, dispatch, history]);

  useEffect(() => {
    if (!called) {
      dispatch(refreshToken(true));
      called = true;
    }
  }, [dispatch]);

  if (loading) return <Spinner />;

  return (
    <>
      {(message || err) && (
        <Alert
          message={message ??err}
          type={status < 400 && !err ? "success" : "error"}
          cb={reset}
        />
      )}
      <ScrollToTop />
      <Header />
      <AnimationRevealPage>
        <Routes />
      </AnimationRevealPage>
      <Footer />
    </>
  );
}

export default App;
