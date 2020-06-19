const template_note_card = document.createElement("template");
template_note_card.innerHTML = `
<link rel="stylesheet" href="./css/color_container.css" />
<link rel="stylesheet" href="./css/note.css" />
<div class="card">
  <div class="card-content">
    <p class="card-title"></p>
  </div>
  <div class="card-options" >
    <div class="note-footer">
    <div class="note-footer-icon-color">
      <span class="note-footer-icon footer-icon-color"></span>
      <div class="icon-color-dropdown-content">
        <button
          class="color-dropdown-content-circulo color-FFFFFF"
        ></button>
        <button
          class="color-dropdown-content-circulo color-F28B82"
        ></button>
        <button
          class="color-dropdown-content-circulo color-FBBC04"
        ></button>
        <button
          class="color-dropdown-content-circulo color-FFF475"
        ></button>
        <button
          class="color-dropdown-content-circulo color-CCFF90"
        ></button>
        <button
          class="color-dropdown-content-circulo color-A7FFEB"
        ></button>
        <button
          class="color-dropdown-content-circulo color-CBF0F8"
        ></button>
        <button
          class="color-dropdown-content-circulo color-AECBFA"
        ></button>
        <button
          class="color-dropdown-content-circulo color-D7AEFB"
        ></button>
        <button
          class="color-dropdown-content-circulo color-FDCFE8"
        ></button>
      </div>
    </div>
    <span class="note-footer-icon footer-icon-trash"></span>
  </div>
  </div>
</div>
`;

class NoteCard extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template_note_card.content.cloneNode(true));
    this.shadowRoot.querySelector(".card-title").innerText = this.getAttribute(
      "body"
    );
    this.shadowRoot.querySelector(".card").classList.add("card-white");
  }

  connectedCallback() {
    this.addEventListener("click", (e) => {
      this.toggleCard();
      console.log(e.target);
    });
  }

  toggleCard() {
    console.log("click");
  }

  colorNote() {
    console.log("note card", this);
  }
}

window.customElements.define("note-card", NoteCard);
