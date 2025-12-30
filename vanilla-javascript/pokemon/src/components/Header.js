export default function Header({ $app, initialState, handleSearch }) {
  this.state = initialState;
  this.$target = document.createElement("div");
  this.$target.className = "header";

  this.handleSearch = handleSearch;
  $app.appendChild(this.$target);

  this.template = () => {
    const searchWord = this.state.searchWord;
    let temp = `
        <div class="title"><a href="/"> 포켓몬 도감</a></div>
        <div class="filter-search-container">
            <div class="search">
                <input type="text" placeholder="포켓몬을 검색하세요!" id="search" autocomplete="off">
            </div>
        </div>
        `;
    return temp;
  };

  this.render = () => {
    this.$target.innerHTML = this.template();
    const $searchInput = document.getElementById("search");
    $searchInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        this.handleSearch($searchInput.value);
      }
    });
  };

  this.setState = (newState) => {
    this.state = newState;
    this.render();
  };

  this.render();
}
