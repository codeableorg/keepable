function linkVisit(el) {
  links = document.getElementsByClassName("menu-item");
  for (let link of links) {
    link.classList.remove("menu-state");
  }
  el.classList.add("menu-state");
}
