const form = document.getElementById("note-form");

form.onsubmit = function (event) {
  event.preventDefault();
  const note_text = this.elements["note-body"].value;
  //new Note(note_text)
  console.log(note_text);
};
