const form = document.getElementById("note-form");

form.onsubmit = function (event) {
  event.preventDefault();
  const note_text = this.elements["note-body"].value;
  data.push(note_text)
  router(location.href)
  //new Note(note_text)
};
