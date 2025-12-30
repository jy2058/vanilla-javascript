const API_URL = "https://pokemon-api-ecru-eta.vercel.app/";

//LIST API
export const request = async (type, searchWord) => {
  try {
    let url = `${API_URL}`;
    if (type && type !== "all") {
      url += `${type}?search=${searchWord}`;
    } else {
      url += `?search=${searchWord}`;
    }

    const response = await fetch(url);
    if (response) {
      let data = await response.json();
      console.log(data);
      return data;
    }
  } catch (err) {
    console.log(err);
  }
};
