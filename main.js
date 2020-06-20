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