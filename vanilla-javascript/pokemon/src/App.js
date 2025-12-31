import Header from "./components/Header.js";
import PokemonList from "./components/PokemonList.js";
import PokemonDetail from "./components/PokemonDetail.js";
// API
import { getPokemonList, getPokemonDetail } from "./modules/api.js";

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
    type: window.location.pathname.replace("/", ""),
    pokemons: "",
    currentPage: window.location.pathname,
  };

  const renderHeader = () => {
    new Header({
      $app,
      initialState: {
        currentPage: this.state.currentPage,
        searchWord: this.state.searchWord,
      },

      handleSearch: async (searchWord) => {
        history.pushState(null, null, `?search=${searchWord}`);

        const pokemons = await getPokemonList(this.state.type, searchWord);
        this.setState({
          ...this.state,
          pokemons: pokemons,
          searchWord: searchWord,
          currentPage: `?search=${searchWord}`,
        });
      },
    });
  };
  const renderPokemonList = () => {
    new PokemonList({
      $app,
      initialState: this.state.pokemons,
      handleItemClick: async (id) => {
        history.pushState(null, null, `/detail/${id}`);
        this.setState({
          ...this.state,
          currentPage: `/detail/${id}`,
        });
      },
      handleTypeClick: async (type) => {
        history.pushState(null, null, `/${type}`);
        const pokemons = await getPokemonList(type);
        console.log("pokemon:" + pokemons);
        this.setState({
          ...this.state,
          pokemons: pokemons,
          searchWord: getSearchWord(),
          type: type,
          currentPage: `/${type}`,
        });
      },
    });
  };
  const renderPokemonDetail = async (pokemonId) => {
    try {
      const pokemonDetailData = await getPokemonDetail(pokemonId);
      new PokemonDetail({
        $app,
        initialState: pokemonDetailData,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const render = async () => {
    const path = this.state.currentPage;
    $app.innerHTML = "";
    if (!path.startsWith("/detail")) {
      renderHeader();
      renderPokemonList();
    } else {
      const pokemonId = path.split("/detail/")[1];
      renderHeader();
      renderPokemonDetail(pokemonId);
    }
  };

  this.setState = (newState) => {
    this.state = newState;
    render();
  };

  window.addEventListener("popstate", async () => {
    const urlPath = window.location.pathname;
    const prevType = urlPath.replace("/", "");
    const prevSearchWord = getSearchWord();
    const prevPokemons = await getPokemonList(this.state.type, prevSearchWord);
    this.setState({
      ...this.state,
      type: prevType,
      searchWord: prevSearchWord,
      pokemons: prevPokemons,
    });
  });

  const init = async () => {
    const path = this.state.currentPage;

    // 메인
    if (!path.startsWith("/detail")) {
      try {
        const pokemons = await getPokemonList(
          this.state.type,
          this.state.searchWord
        );
        this.setState({
          ...this.state,
          pokemons: pokemons,
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      render();
    }
  };

  init();
}
