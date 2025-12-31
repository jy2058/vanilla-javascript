const API_URL = "https://pokemon-api-ecru-eta.vercel.app/";

//LIST API
export async function getPokemonList(type, searchWord) {
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
}

export const getPokemonDetail = async (id) => {
  const url = API_URL + `detail/' + ${id}`;
  const response = await fetch(url);
  const pokemonDetails = await response.json();

  return pokemonDetails;
};
