const notes = [];
const mainContainer = document.querySelector(".main");
const allNotes = document.querySelector(".all-notes");
const notesSidebar = document.querySelector("#sidebar_notes");
const trashSidebar = document.querySelector("#sidebar_trash");

// AÑADIR NOTAS
const noteSubmit = document.getElementById("note-submit");

const colorButton = document.querySelector(".new-note__color");
const paletteColors = document.querySelector(".palette-colors");
const newNoteWrapper = document.getElementById("new-note");

function addNote(trash = false, pinned = false) {
  const noteTitle = document.getElementById("note-title").value;
  const noteBody = document.getElementById("note-body").value;

  const note = {
    title: noteTitle,
    body: noteBody,
    color: getComputedStyle(newNoteWrapper)["background-color"],
    trash: trash,
    pinned: pinned,
    updatedAt: Date.now(),
  };

  notes.push(note);
  console.log(notes);
}

// clears all the contents inside a div
function clearElement(element) {
  element.innerHTML = "";
}

noteSubmit.addEventListener("click", () => {
  if (document.querySelector(".no-notes")) {
    mainContainer.removeChild(document.querySelector(".no-notes"));
  }
  clearElement(allNotes); // remove all notes to inmediately re-create them
  addNote();
  createAllNotes(notes);
  deleteNote();
  newNoteWrapper.style.backgroundColor = "#ffffff";
});

//show list of notes
function createNote(note) {
  const noteContainer = document.createElement("article");
  noteContainer.classList.add("note");
  noteContainer.setAttribute("data-index", `${notes.indexOf(note)}`);
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
  paletteImage.id = "colorSelector";
  iconsContainer.appendChild(paletteImage);

  const trashImage = document.createElement("img");
  trashImage.src = "images/Frame 8.svg";
  trashImage.classList.add("button-delete");
  iconsContainer.appendChild(trashImage);

  const arrowUpImage = document.createElement("img");
  arrowUpImage.src = "images/Frame 9.svg";
  arrowUpImage.classList.add("button-recover", "hidden");
  iconsContainer.appendChild(arrowUpImage);

  return noteContainer;
}

function changeNoteTrashStatus(state, classname) {
  const buttonTrash = document.querySelectorAll(classname);
  buttonTrash.forEach((button) => {
    button.addEventListener("click", (event) => {
      const currentNoteIndex = event.target
        .closest(".note")
        .getAttribute("data-index");
      notes[currentNoteIndex].trash = state;

      clearElement(allNotes);
      createAllNotes(notes);
      notesSidebar.classList.remove("sidebar__list--active");
      trashSidebar.classList.add("sidebar__list--active");
    });
  });
}

function showArrowUpButton() {
  const buttonTrash = document.querySelectorAll(".button-recover");
  buttonTrash.forEach((button) => {
    button.classList.remove("hidden");
  });
}

function deleteNote() {
  //changeNoteTrashStatus(true, ".button-delete");
  const buttonTrash = document.querySelectorAll(".button-delete");
  buttonTrash.forEach((button) => {
    button.addEventListener("click", (event) => {
      const currentNoteIndex = event.target
        .closest(".note")
        .getAttribute("data-index");
      notes[currentNoteIndex].trash = true;
      clearElement(allNotes);
      createAllNotes(notes, false);
      notesSidebar.classList.remove("sidebar__list--active");
      trashSidebar.classList.add("sidebar__list--active");
      deleteNoteForever();
      showArrowUpButton();
      recoverNote();
    });
  });
}

function recoverNote() {
  //changeNoteTrashStatus(false, ".button-recover");
  const buttonTrash = document.querySelectorAll(".button-recover");
  buttonTrash.forEach((button) => {
    button.addEventListener("click", (event) => {
      const currentNoteIndex = event.target
        .closest(".note")
        .getAttribute("data-index");
      notes[currentNoteIndex].trash = false;
      clearElement(allNotes);
      createAllNotes(notes);
      trashSidebar.classList.remove("sidebar__list--active");
      notesSidebar.classList.add("sidebar__list--active");
      deleteNote();
    });
  });
}

function deleteNoteForever() {
  const buttonTrash = document.querySelectorAll(".button-delete");
  buttonTrash.forEach((button) => {
    button.addEventListener("click", (event) => {
      const currentNoteIndex = event.target
        .closest(".note")
        .getAttribute("data-index");
      notes.splice(currentNoteIndex, 1);
      clearElement(allNotes);
      createAllNotes(notes);
    });
  });
}

// function to show all notes
// shows non-deleted notes by default
function createAllNotes(notes, trash = true) {
  notes.forEach((note) => {
    if (note.trash !== trash) createNote(note);
  });
}

// sidebar selector functions
notesSidebar.addEventListener("click", (event) => {
  clearElement(allNotes);
  createAllNotes(notes);
  trashSidebar.classList.remove("sidebar__list--active");
  notesSidebar.classList.add("sidebar__list--active");
  deleteNote();
});

trashSidebar.addEventListener("click", (event) => {
  clearElement(allNotes);
  createAllNotes(notes, false);
  notesSidebar.classList.remove("sidebar__list--active");
  trashSidebar.classList.add("sidebar__list--active");
  deleteNoteForever();
  showArrowUpButton();
  recoverNote();
});

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
