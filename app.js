const mainContainer = document.querySelector(".main");
const allNotes = document.querySelector(".all-notes");
const notes = [];

// AÑADIR NOTAS
const noteSubmit = document.getElementById("note-submit");

const colorButton = document.querySelector(".new-note__color");
const paletteColors = document.querySelector(".palette-colors");
const newNoteWrapper = document.getElementById("new-note");

function addNote(color, trash = false, pinned = false) {
  const noteTitle = document.getElementById("note-title").value;
  const noteBody = document.getElementById("note-body").value;

  const note = {
    title: noteTitle,
    body: noteBody,
    color: newNoteWrapper.style.backgroundColor,
    trash: this.trash,
    pinned: this.pinned,
    updatedAt: Date.now(),
  };

  notes.push(note);
  console.log(`${noteTitle} ${noteBody}`);
  console.log(notes);
}

noteSubmit.addEventListener("click", () => {
  addNote();
  showNotes();
  newNoteWrapper.style.backgroundColor = "#ffffff";
});

//show list of notes
function createNote(note) {
  const noteContainer = document.createElement("div");
  noteContainer.classList.add("note-container");
  noteContainer.style.backgroundColor = note.color;
  allNotes.insertBefore(noteContainer, allNotes.firstChild);

  const noteTitleContainer = document.createElement("p");
  noteTitleContainer.className = "note-title-content";
  noteTitleContainer.textContent = note.title;
  noteContainer.appendChild(noteTitleContainer);

  const noteBodyContainer = document.createElement("p");
  noteBodyContainer.className = "note-body-content";
  noteBodyContainer.textContent = note.body;
  noteContainer.appendChild(noteBodyContainer);

  const iconsContainer = document.createElement("div");
  iconsContainer.className = "icons-container";
  noteContainer.appendChild(iconsContainer);

  const paletteImage = document.createElement("img");
  paletteImage.src = "images/Frame 7.svg";
  iconsContainer.appendChild(paletteImage);

  const trashImage = document.createElement("img");
  trashImage.src = "images/Frame 8.svg";
  iconsContainer.appendChild(trashImage);

  return noteContainer;
}

function showNotes() {
  const currentNote = notes.pop();
  console.log(currentNote.color);
  createNote(currentNote);
}

//User can include custom color while creating a note y ya se agrega color a la nota que se crea. 

function openPaletteColor() {
  colorButton.addEventListener("click", () =>
    paletteColors.classList.toggle("hidde")
  );
}

openPaletteColor();

document.querySelectorAll(".color").forEach((color) =>
  color.addEventListener("click", (event) => {
    const buttonSelected = event.target;
    const color = buttonSelected.dataset.color;
    newNoteWrapper.style.backgroundColor = color;
    paletteColors.classList.toggle("hidde");
  })
);
