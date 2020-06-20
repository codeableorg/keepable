"use strict";
let notes = document.getElementsByClassName("note");
for (let note of notes) {
  note.setAttribute("onClick", "noteModal(this)");
}

function noteModal(element) {
  let el = +element.currentTarget.parentNode.getAttribute("note_id");
  alert(el);
  let cloneNote = element.getAttribute("note_id");
  let showNote = element.cloneNode(true);
  alert(showNote);
  let not = document.querySelector(".modal-content");
  not.append(showNote);
  not.style.display = "block";
}
