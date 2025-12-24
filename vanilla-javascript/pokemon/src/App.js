import Header from "./components/Header.js";
import TypeList from "./components/TypeList.js";
import PokemonList from "./components/PokemonList.js";
import PokemonDetail from "./components/PokemonDetail.js";
// API
import { request } from "./components/api.js";

export default function App($app) {
  this.state = {
    initialState: "",
    searchWord: "",
    type: "",
    pokemons: "",
  };

  const header = new Header();
  const pokemonList = new PokemonList({
    $app,
    initialState: this.state.pokemons,
  });
  const pokemonDetail = new PokemonDetail();
  const typeList = new TypeList();

  this.setState = (newState) => {
    this.state = newState;
    pokemonList.setState(this.state.pokemons);
  };

  const init = async () => {
    const pokemons = await request(this.state.type, this.state.searchWord);
    this.setState({
      ...this.state,
      pokemons: pokemons,
    });
  };

  init();
}
