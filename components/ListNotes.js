const template_notes = document.createElement("template");
/*const notes = [
  {
    title: "Note 1",
    body:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla finibus lacus sapien, ut rhoncus odio tristique vel.",
    classColor: "card-white",
    active: true,
    pinned: false,
  },
  // {
  //   title: "Note 2",
  //   body:
  //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla finibus lacus sapien, ut rhoncus odio tristique vel.",
  //   classColor: "card-white",
  //   active: true,
  //   pinned: false,
  // },
  // {
  //   title: "Note 3",
  //   body:
  //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla finibus lacus sapien, ut rhoncus odio tristique vel.",
  //   classColor: "card-white",
  //   active: true,
  //   pinned: false,
  // },
  // {
  //   title: "Note 4",
  //   body:
  //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla finibus lacus sapien, ut rhoncus odio tristique vel.",
  //   classColor: "card-white",
  //   active: true,
  //   pinned: false,
  // },
];
*/
const templateEmpty = `
  <div id="list-notes">
    Empty
  </div>
`;

const templateNotes = `
  <style>
    #list-notes {
      display: grid;
      grid-gap: 10px;
      grid-template-columns: repeat(auto-fill, 24%);
      width: 100%;
      margin-top: 60px;
    }
  </style>

  <div id="list-notes">
  </div>
`;

class ListNotes extends HTMLElement {
  constructor() {
    super();
    let notes = this.filterNotes();

    template_notes.innerHTML = notes.length > 0 ? templateNotes : templateEmpty;
    console.log("constructor");
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template_notes.content.cloneNode(true));
  }

  connectedCallback() {
    this.render();
  }

  disconnectedCallback() {
    console.log("disconnectedCallback");
  }

  attributeChangedCallback() {
    console.log("attributeChangedCallback");
  }

  filterNotes() {
    let notes = JSON.parse(localStorage.getItem("notes"));
    if (this.getAttribute("filter") === "active") {
      return notes.filter((note) => note.active === true );
    }
    return notes.filter((note) => note.active === false );
  }

  render() {
    let notes = this.filterNotes();
    
    notes.forEach((note) => {
      let note_card = document.createElement("note-card");
      note_card.setAttribute("id", note.id);
      note_card.setAttribute("body", note.body);
      note_card.setAttribute("class-color", note.classColor);
      this.shadowRoot.getElementById("list-notes").appendChild(note_card);
    });
  }
}

window.customElements.define("list-notes", ListNotes);
