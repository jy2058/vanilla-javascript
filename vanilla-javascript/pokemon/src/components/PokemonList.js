import { setPokemonType } from "../modules/typeTag.js";

export default function PokemonList({ $app, initialState }) {
  this.state = initialState;
  this.$target = document.createElement("div");
  this.$target.className = "pokemon-list";

  $app.appendChild(this.$target);

  this.template = () => {
    let temp = "";
    if (this.state) {
      this.state.data.forEach((elem) => {
        temp += `
            <div class="pokemon-wrapper">
                <div class="img-wrapper" id=${elem.id}>
                    <img src="${elem.img}"></img>
                </div>
                <div class="pokemon-info">
                    <div class="index">No.${elem.id}</div>
                    <div class="name">${elem.name}</div>
                    <div class="type">${setPokemonType(elem.type)}</div>
                </div>
            </div>
                `;
      });
    }
    temp += `</div>`;
    return temp;
  };

  this.render = () => {
    this.$target.innerHTML = this.template();
  };

  this.setState = (newState) => {
    this.state = newState;
    this.render();
  };

  this.render();
}
