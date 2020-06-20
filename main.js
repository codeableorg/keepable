const btnNotes = document.querySelector('#btnNotes');
const btnTrashNotes = document.querySelector('#btnTrashNotes');
const containerNotes = document.querySelector('.container-notes');
const containerTrash = document.querySelector('.container-trash-notes');
const paleta = document.querySelector(".paleta");

function createColor(num){
  const color = document.createElement("a");
  color.style.border = `1px solid var(--color-${num})`;
  color.style.background = `var(--color-${num})`;
  return color;
}

for(let i =1; i<11; i++){
  const newColor = createColor(i);
  paleta.append(newColor);
}

var app = new App({
  notesContainer: document.querySelector('#notes-container'),
});

const createNoteForm = document.querySelector('#create-note-form');

createNoteForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let textarea = e.target[0];
  if (!textarea.value) return;

  app.createNote({ body: textarea.value });
  textarea.value = '';
  app.renderNotes();
});

btnTrashNotes.addEventListener('click',()=>{
  btnNotes.classList.remove("selected");
  btnTrashNotes.classList.add("selected");
  containerNotes.classList.add("hidden");
  containerTrash.classList.remove("hidden");
  app.trashRenderNotes();
} )


btnNotes.addEventListener('click',()=>{
  btnNotes.classList.add("selected");
  btnTrashNotes.classList.remove("selected");
  containerTrash.classList.add("hidden");
  containerNotes.classList.remove("hidden");
} )
