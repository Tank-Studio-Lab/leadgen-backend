const axios = require("axios").default;

export const websiteUp = async (url: string) => {
  const res: any = await axios.get(url);
  if (res.status === 200 || res.statusCode == 301) {
    console.log("Website Up and Running ..");
    return {
      serverUp: true,
      status: res.status,
      statusCode: res.statusCode,
      statusText: res.statusText,
      url: url,
      scanedOn: new Date(Date.now()),
    };
  } else {
    console.log("Website is down ..");
    return {
      serverUp: false,
      status: res.status,
      statusCode: res.statusCode,
      url: url,
      statusText: res.statusText,
      scanedOn: new Date(Date.now()),
    };
  }
};
