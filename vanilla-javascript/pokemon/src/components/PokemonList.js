export default function PokemonList({ $app, initialState }) {
  this.state = initialState;
  this.$target = document.createElement("div");
  this.$target.className = "pokemon-list";

  $app.appendChild(this.$target);

  this.template = () => {
    let temp = `<div class="pokemon-items-container>`;
    if (this.state) {
      this.state.data.forEach((elem) => {
        temp += `
                <div class="pokemon-item" id=${elem.id}>
                    <img src="${elem.img}"></img>
                    <div class="pokemon-item-no">No.${elem.id}</div>
                    <div class="pokemon-item-info">${elem.name}</div>
                    <div class="pokemon-item-type">${elem.type}</div>
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
