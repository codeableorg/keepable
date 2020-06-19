const createButton = document.querySelector(".keep-button");
createButton.addEventListener("click", createCardHtml);
let others = document.querySelector(".others");
let deleted_others = document.querySelector(".deleted-others");
const pallette_buttons = document.querySelectorAll(".pallette-button");
pallette_buttons.forEach((element) =>
  element.addEventListener("click", pallete)
);
const trash_buttons = document.querySelectorAll(".pallette-button");
trash_buttons.forEach((element) =>
  element.addEventListener("click", deleteCard)
);
let notes_nav = document.querySelector(".sidebar-notes");
let trash_nav = document.querySelector(".sidebar-trash");
notes_nav.addEventListener("click", navigation);
trash_nav.addEventListener("click", navigation);

let wrapper = document.querySelector(".wrapper");
messageWaiting();

const cards_todo = [];
const cards_trashed = [];

function createCardHtml() {
  let color = "color-1";
  let content = document.querySelector("#body-note");
  if (content.value.trim().length < 2) {
    return alert("The note will be at least 2 words of length");
  }
  const card = document.createElement("div");

  card.className = `card ${color}`;
  card.id = `card-${cards_todo.length + 1}`;
  card.innerHTML = `
    <p class="card__content">${content.value.trim()}</p>
    <div class="card__bottom">

        <button class="pallette-button">
            <img src="assets/images/pallette.svg" alt="">
        </button>
        <button class="trash-button">
        <img src="assets/images/trash-grey.svg" alt="">
    </button>
    </div>
    `;
  card.querySelector(".pallette-button").addEventListener("click", pallete);
  card.querySelector(".trash-button").addEventListener("click", deleteCard);

  /*let card_created = {
    card_id: card.id,
    content: content.value.trim(),
    color: color,
  };*/
  cards_todo.push(card);

  return appendNoteToOthers(card, content);
}

function appendNoteToOthers(element, content) {
  others.prepend(element);
  content.value = "";
  messageWaiting();
}
function pallete() {
  let currentcard = this.parentNode.parentNode;
  let pallete = currentcard.querySelector(".pallete-colors");
  if (pallete) {
    pallete.remove();
  } else {
    addPalleteHtml(currentcard);
  }
}
function addPalleteHtml(currentcard) {
  const pallet = document.createElement("div");
  pallet.classList.add("pallete-colors");
  for (let i = 1; i <= 10; i++) {
    const color = document.createElement("div");
    color.classList.add("color", "color-" + i);
    pallet.append(color);
  }
  currentcard.append(pallet);
}

function messageWaiting() {
  if (others.childElementCount == 0) {
    let messageContainer = document.createElement("div");
    messageContainer.className = "message-waiting";
    messageContainer.innerHTML = `
            <img src = "assets/images/{.svg" alt = "" >
                <p> Notes you add appear here</p >
                <img src = "assets/images/}.svg" alt = "" >
        `;
    wrapper.append(messageContainer);
    others.style.display = "none";
  } else {
    others.style.display = "grid";
    let message = wrapper.querySelector(".message-waiting");
    if (message) {
      message.remove();
    }
  }
}
function deleteCard() {
  let currentcard = this.parentNode.parentNode;
  console.log(currentcard);
  let content = currentcard.querySelector(".card__content").textContent;
  console.log(content);
  /*let deleted_card = {
    card_id: currentcard.id,
    content: content,
    color: currentcard.classList["1"],
  };*/
  let index = cards_todo.indexOf(currentcard);
  cards_todo.splice(index, 1);
  cards_trashed.push(currentcard);
  currentcard.remove();
  return messageWaiting();
}

function showtrash() {
  document.querySelector(".form-notes").style.display = "none";
  document.querySelector(".others").innerHTML = "";
  cards_trashed.forEach((e) => {
    others.prepend(e);
  });
}

function shownotes() {
  document.querySelector(".form-notes").style.display = "flex";
  document.querySelector(".others").innerHTML = "";
  cards_todo.forEach((e) => {
    others.prepend(e);
  });
}

function navigation() {
  let classes = Array.from(this.classList);
  let lastClass = classes.pop();
  if (lastClass == "sidebar-notes") {
    document.querySelector(".sidebar-notes").classList.add("marked");
    document.querySelector(".sidebar-trash").classList.remove("marked");
    return shownotes(); //TODO
  } else {
    document.querySelector(".sidebar-trash").classList.add("marked");
    document.querySelector(".sidebar-notes").classList.remove("marked");
    return showtrash(); //TODO
  }
}
