class App {
  constructor({ notesContainer }) {
    if (App._instance) return App._instance;
    else App._instance = this;
    this.notesContainer = notesContainer;
    this.notes = [];
  }

  clean() {
    this.notesContainer.innerHTML = '';
  }

  renderNotes() {
    this.clean();
    this.notes.forEach((note) => {
      this.notesContainer.append(note.createCard());
    });
  }
}

// const paleta = document.querySelector(".paleta");

// function createColor(num){
//     const color = document.createElement("a");
//     color.style.border = `1px solid var(--color-${num})`;
//     color.style.background = `var(--color-${num})`;
//     return color;
// }

// for(let i =1; i<11; i++){
//     const newColor = createColor(i);
//     paleta.append(newColor);
// }

let app = new App({ notesContainer: document.querySelector('#notes') });

const createNoteForm = document.querySelector('#create-note-form');
createNoteForm.addEventListener('submit', (e) => {
  e.preventDefault();

  let textarea = e.target[0];
  const note = new Note({
    body: textarea.value,
  });
  textarea.value = '';

  app.notes.push(note);
  app.renderNotes();
});
