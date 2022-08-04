import * as functions from "firebase-functions";
const axios = require("axios").default;

const api = functions.config().config.pagespeed_api;
const key = functions.config().config.pagespeed_key;

export const getPageSpeed = async (url: string) => {
  try {
    const q = `${api}?url=${url}&key=${key}`;
    const response = await axios.get(q);
    console.log(response.data);
    const data = response.data;
    return data;
  } catch (error) {
    console.error();
  }
};
