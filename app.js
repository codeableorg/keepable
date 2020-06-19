const mainContainer = document.querySelector(".main");
const allNotes = document.querySelector(".all-notes");
let notes = [];

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
  console.log(notes);
}

// clears all the contents inside a div
function clearElement(element) {
  element.innerHTML = "";
}

function removeChild(parent, child) {
  parent.removeChild(child);
}

noteSubmit.addEventListener("click", () => {
  if (document.querySelector(".no-notes")) {
    removeChild(mainContainer, document.querySelector(".no-notes"));
  }
  clearElement(allNotes);
  addNote();
  createAllNotes(notes);
  newNoteWrapper.style.backgroundColor = "#ffffff";
});

//show list of notes
function createNote(note) {
  const noteContainer = document.createElement("article");
  noteContainer.classList.add("note");
  noteContainer.classList.add("border-shadow");
  noteContainer.style.backgroundColor = note.color;
  allNotes.insertBefore(noteContainer, allNotes.firstChild);

  const noteTitleContainer = document.createElement("h1");
  noteTitleContainer.className = "note__title";
  noteTitleContainer.id = "note__title";
  noteTitleContainer.textContent = note.title;
  noteContainer.appendChild(noteTitleContainer);

  const noteBodyContainer = document.createElement("p");
  noteBodyContainer.className = "note__body";
  noteBodyContainer.id = "note__body";
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
  trashImage.classList.add("button-trash");
  iconsContainer.appendChild(trashImage);

  return noteContainer;
}

function selectOneNote(notes, title) {
  let selectedNote = notes.filter((note) => note.title === title);
  console.log(selectedNote);
}

buttonTrash.addEventListener("click", () => {
  const buttonTrash = event.target;
  const currentNoteContainer = buttonTrash.event.target.closest(".note");
  console.log(notes);
  console.log(currentNoteContainer.value);
  //selectOneNote(notes,)
});

// function to show all notes
function createAllNotes(notes) {
  notes.forEach((note) => {
    createNote(note);
  });
}

// UNUSED FUNCTION
// function showNotes() {
//   const currentNote = notes.pop();
//   console.log(currentNote.color);
//   createNote(currentNote);
// }

//User can include custom color while creating a note y ya se agrega color a la nota que se crea.
function openPaletteColor() {
  colorButton.addEventListener("click", () =>
    paletteColors.classList.toggle("hidden")
  );
}

openPaletteColor();

document.querySelectorAll(".color").forEach((color) =>
  color.addEventListener("click", (event) => {
    const buttonSelected = event.target;
    const color = buttonSelected.dataset.color;
    newNoteWrapper.style.backgroundColor = color;
    paletteColors.classList.toggle("hidden");
  })
);
