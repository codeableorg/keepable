const mainContainer = document.querySelector(".main");
const allNotes = document.querySelector(".all-notes");
const notes = [];

// AÑADIR NOTAS
const noteSubmit = document.getElementById('note-submit');

const colorButton = document.querySelector(".new-note__color");
const paletteColors = document.querySelector(".palette-colors");
const newNoteWrapper = document.getElementById("new-note");

function addNote(title = '', body, color, trash = false, pinned = false) {
  const noteTitle = document.getElementById('note-title').value;
  const noteBody = document.getElementById('note-body').value;

  const note = {
    title: noteTitle,
    body: noteBody,
    color: 'white',
    trash: this.trash,
    pinned: this.pinned,
    updatedAt: Date.now(),
  };

  notes.push(note);
  console.log(`${noteTitle} ${noteBody}`);
  console.log(notes);
}

noteSubmit.addEventListener('click', () => {addNote(); showNotes(); 
  newNoteWrapper.style.backgroundColor = '#ffffff'; 
});

//show list of notes
function createNote(note) {
  const noteContainer = document.createElement("div");
  noteContainer.classList.add('note-container');
  allNotes.insertBefore(noteContainer, allNotes.firstChild);

  const noteTitleContainer = document.createElement("p");
  noteTitleContainer.className = 'note-title-content';
  noteTitleContainer.textContent = note.title; 
  noteContainer.appendChild(noteTitleContainer);

  const noteBodyContainer = document.createElement("p");
  noteBodyContainer.className = 'note-body-content';
  noteBodyContainer.textContent = note.body; 
  noteContainer.appendChild(noteBodyContainer);

  const iconsContainer = document.createElement('div');
  iconsContainer.className = 'icons-container';
  noteContainer.appendChild(iconsContainer);

  const paletteImage = document.createElement('img');
  paletteImage.src ='images/Frame 7.svg'; 
  iconsContainer.appendChild(paletteImage);

  const trashImage = document.createElement('img');
  trashImage.src = 'images/Frame 8.svg'; 
  iconsContainer.appendChild(trashImage);
  
  return noteContainer; 
}

function showNotes(){
  const currentNote = notes.pop();
  createNote(currentNote); 
}

//User can include custom color while creating a note 

function changeNoteColor(){
  colorButton.addEventListener("click", () =>  paletteColors.classList.toggle("hidde")); 
}

changeNoteColor(); 

document.querySelectorAll(".color").forEach((color) => color.addEventListener("click", (event) => {
  const buttonSelected = event.target;
  const color = buttonSelected.dataset.color;
  newNoteWrapper.style.backgroundColor = color; 
  paletteColors.classList.toggle("hidde");
})); 


