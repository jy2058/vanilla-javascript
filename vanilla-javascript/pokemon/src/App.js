import Header from "./components/Header.js";
import TypeList from "./components/TypeList.js";
import PokemonList from "./components/PokemonList.js";
import PokemonDetail from "./components/PokemonDetail.js";
// API
import { request } from "./components/api.js";

export default function App($app) {
  const getSearchWord = () => {
    if (window.location.search && window.location.search.includes("search=")) {
      return window.location.search.split("search=")[1];
    }
    return "";
  };

  this.state = {
    initialState: "",
    searchWord: getSearchWord(),
    type: "",
    pokemons: "",
    currentPage: window.location.pathname,
  };

  const header = new Header({
    $app,
    initialState: {
      currentPage: this.state.currentPage,
      searchWord: this.state.searchWord,
    },
    // handleClick: async(searchWord) => {

    // },
    handleSearch: async (searchWord) => {
      history.pushState(null, null, `?search=${searchWord}`);

      const pokemons = await request(this.state.type, searchWord);
      this.setState({
        ...this.state,
        pokemons: pokemons,
        searchWord: searchWord,
        currentPage: `?search=${searchWord}`,
      });
    },
  });
  const pokemonList = new PokemonList({
    $app,
    initialState: this.state.pokemons,
  });
  const pokemonDetail = new PokemonDetail();
  const typeList = new TypeList();

  this.setState = (newState) => {
    this.state = newState;
    header.setState({
      searchWord: this.state.searchWord,
      currentPage: this.state.currentPage,
    });
    pokemonList.setState(this.state.pokemons);
  };

  window.addEventListener("popstate", async () => {
    const urlPath = window.location.pathname;
    const prevType = urlPath.replace("/", "");
    const prevSearchWord = getSearchWord();
    const prevPokemons = await request(this.state.type, prevSearchWord);
    this.setState({
      ...this.state,
      type: prevType,
      searchWord: prevSearchWord,
      pokemons: prevPokemons,
    });
  });

  const init = async () => {
    const pokemons = await request(this.state.type, this.state.searchWord);
    this.setState({
      ...this.state,
      pokemons: pokemons,
    });
  };

  init();
}
