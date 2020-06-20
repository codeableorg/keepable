NodeList.prototype.find = Array.prototype.find;

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

let app = new App({
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
