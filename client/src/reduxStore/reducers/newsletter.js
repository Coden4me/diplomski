import { NewsletterTypes } from "../types";

export const INITIAL_STATE = {
  message: null,
  status: null,
  errors: {},
};

function AuthReducer(prevState = INITIAL_STATE, action) {
  switch (action.type) {
    case NewsletterTypes.NEWSLETTER_RESPONSE:
      return { ...action.payload };
    case NewsletterTypes.NEWSLETTER_RESET:
      return { ...INITIAL_STATE};
    default:
      return prevState;
  }
}

export default AuthReducer;
