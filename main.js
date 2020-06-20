const btnNotes = document.querySelector('#btnNotes');
const btnTrashNotes = document.querySelector('#btnTrashNotes');
const containerNotes = document.querySelector('.container-notes');
const containerTrash = document.querySelector('.container-trash-notes');
NodeList.prototype.find = Array.prototype.find;

var app = new App({
  notesContainer: document.querySelector('#notes-container'),
});

const createNoteButtons = document.querySelector('#create-note-buttons');
const buttonPalette = Note.createButtonPalette()
createNoteButtons.append(buttonPalette);

const createNoteForm = document.querySelector('#create-note-form');

createNoteForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let textarea = e.target.querySelector('textarea');
  const body = textarea.value;
  if (!textarea.value) return;
  const radiobuttons = e.target.querySelectorAll('input[type="radio"]');
  const checkedRadio = radiobuttons.find((radio) => radio.checked);
  const color = (checkedRadio) ? checkedRadio.value : Note.colors[0];

  app.createNote({ body, color });
  textarea.value = '';
  radiobuttons[0].checked = true;
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
