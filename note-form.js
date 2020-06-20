const form = document.getElementById("note-form");
const picker = form.querySelectorAll('.color-picker div')

picker.forEach(color => color.onclick = function(){
  const [_, color] = this.className.split(' ')
  form.nextColor = color;
  form.parentElement.className = `content-note ${color}`
})

form.onsubmit = function (event) {
  event.preventDefault();
  const note_text = this.elements["note-body"].value;
  data.push({text: note_text, color: this.nextColor})
  router(location.href)
  //new Note(note_text)
};
