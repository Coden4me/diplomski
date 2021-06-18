import { axios } from "../../lib/axios";

export const sendContactMessage = (data) => () => axios.post("/contact", data);
