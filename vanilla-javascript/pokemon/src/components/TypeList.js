export default function TypeList() {
  this.$target = document.createElement("div");
  this.$target.className = "type-list";

  this.template = () => {};

  this.render = () => {};

  this.setState = (newState) => {
    this.state = newState;
    this.render();
  };

  this.render();
}
