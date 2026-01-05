const API_URL = "https://pokemon-api-ecru-eta.vercel.app/";

//LIST API
export const getPokemonList = async (type, searchWord) => {
  try {
    let url = API_URL;
    if (type) {
      url += `${type}`;
    }
    if (searchWord) {
      url += `?search=${searchWord}`;
    }

    const response = await fetch(url);
    if (response) {
      let data = await response.json();
      return data;
    }
  } catch (err) {
    console.log(err);
  }
};

export const getPokemonDetail = async (id) => {
  const url = API_URL + `detail/${id}`;
  const response = await fetch(url);
  const pokemonDetails = await response.json();

  return pokemonDetails;
};
