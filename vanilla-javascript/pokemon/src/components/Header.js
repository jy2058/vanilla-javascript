export default function Header({
  $app,
  initialState,
  //   handleClick,
  handleSearch,
}) {
  this.state = initialState;
  this.$target = document.createElement("div");
  this.$target.className = "header";

  //   this.handleClick = handleClick;
  this.handleSearch = handleSearch;
  $app.appendChild(this.$target);

  this.template = () => {
    const { currentPage, searchWord } = this.state;
    let temp = `
        <div class="header-content" id="title">
            <img src='/src/img/ball.webp' width=40px height=40px></img>
            <a href="/"> 포켓몬 도감</a>
        </div>`;

    if (!currentPage.includes("/detail")) {
      temp += `
        <div class="search">
            <input type="text" placeholder="포켓몬을 검색하세요!" id="search" autocomplete="off" value=${searchWord}>
            <button id="search-button"><img src="src/img/search.png"></img></button>
        </div>
        `;
    }
    return temp;
  };

  this.render = () => {
    this.$target.innerHTML = this.template();

    if (!this.state.currentPage.includes("/detail")) {
      const $searchInput = document.getElementById("search");
      const $searchButton = document.getElementById("search-button");
      $searchButton.addEventListener("click", () => {
        this.handleSearch($searchInput.value);
      });
      $searchInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          this.handleSearch($searchInput.value);
        }
      });
    }
  };

  this.setState = (newState) => {
    this.state = newState;
    this.render();
  };

  this.render();
}
