const main = document.getElementsByClassName('main');

const notes = [];

// AÑADIR NOTAS
const noteSubmit = document.getElementById('note-submit');

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

noteSubmit.addEventListener('click', addNote);
