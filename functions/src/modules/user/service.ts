const axios = require("axios").default;

export const getUserPhotoUrl = async (displayName: string) => {
  const url = `https://avatars.dicebear.com/api/personas/"${displayName}.svg`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
