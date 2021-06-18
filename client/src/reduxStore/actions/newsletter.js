import { axios } from "../../lib/axios";
import { NewsletterTypes } from "../types";
import { setIsSubscribed } from "./userData";

export const setNewsletterResponse = (payload) => ({
  type: NewsletterTypes.NEWSLETTER_RESPONSE,
  payload,
});

export const resetNewsletterResponse = (dispatch) =>
  dispatch({
    type: NewsletterTypes.NEWSLETTER_RESET,
  });

export const subscribe = async (dispatch) => {
  const { data, status } = await axios.post(`/newsletter`);

  if (status === 201) {
    dispatch(setIsSubscribed(true));
  }

  dispatch(setNewsletterResponse({ message: data.message, status, errors: {} }));
};

export const unsubscribe = async (dispatch) => {
  const { data, status } = await axios.delete(`/newsletter`);

  if (status === 200) {
    dispatch(setIsSubscribed(false));
  }

  dispatch(
    setNewsletterResponse({ message: data.message, status, errors: {} })
  );
};

export const subscribeGuest = (email) => async (dispatch) => {
  const { data, status } = await axios.post(`/newsletter/subscribe-guest`, {
    email,
  });

  if (status === 201) {
    dispatch(setIsSubscribed(true));
  }

  dispatch(
    setNewsletterResponse({
      message: data.message,
      status,
      errors: data.errors ?? {},
    })
  );
};
