const axios = require("axios").default;
//import sslChecker from "ssl-checker";
export const websiteUp = async (url: string) => {
  try {
    const res: any = await axios.get(url);
    if (res.status === 200 || res.statusCode == 301) {
      console.log("Website Up and Running ..");
      return {
        serverUp: true,
        status: res.status,
        statusText: res.statusText,
        url: url,
        scanedOn: new Date(Date.now()),
      };
    }
    return {
      serverUp: false,
      status: res.status,
      statusText: res.statusText,
      url: url,
      scanedOn: new Date(Date.now()),
    };
  } catch (error: any) {
    if (error.response) {
      console.log("Website is down ..");
      return {
        serverUp: false,
        status: error.response.status,
        statusText: error.message ? error.message : error.response.data,
        url: url,
        scanedOn: new Date(Date.now()),
      };
    }
    return {
      serverUp: false,
      url: url,
      scanedOn: new Date(Date.now()),
    };
  }
};
/*
export const getSslDetails = async (url: string) => {
  try {
    const sslDetails = await sslChecker(url, { method: "GET", port: 443 });
    return sslDetails;
  } catch (error) {
    console.log(error);
    return null;
  }
};
*/
