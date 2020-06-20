function maybeShowEmptyMessage() {
  let message = document.querySelector(".empty_msg"); 
  let note = document.querySelector(".note"); 

  if (note === null) {
    message.style.display = ""; 
  } else {
    message.style.display = "none";
  }
}

maybeShowEmptyMessage(); 


function changeColorNote() {
  let white = document.querySelectorAll(".white");
  let rose = document.querySelectorAll(".rose");
  let orange = document.querySelectorAll(".orange");
  let yellow = document.querySelectorAll(".yellow");
  let green = document.querySelectorAll(".green");
  let turquoise = document.querySelectorAll(".turquoise");
  let light_blue = document.querySelectorAll(".light_blue");
  let purple = document.querySelectorAll(".purple");
  let fuchsia = document.querySelectorAll(".fuchsia");
  let pale_rose = document.querySelectorAll(".pale_rose");

  white.forEach(note => {note.onclick = function(){this.closest(".note").style.backgroundColor = "#FFFFFF"}});
  rose.forEach(note => {note.onclick = function(){this.closest(".note").style.backgroundColor = "#F28B82"}});
  orange.forEach(note => {note.onclick = function(){this.closest(".note").style.backgroundColor = "#FBBC04"}});
  yellow.forEach(note => {note.onclick = function(){this.closest(".note").style.backgroundColor = "#FFF475"}});
  green.forEach(note => {note.onclick = function(){this.closest(".note").style.backgroundColor = "#CCFF90"}});
  turquoise.forEach(note => {note.onclick = function(){this.closest(".note").style.backgroundColor = "#A7FFEB"}});
  light_blue.forEach(note => {note.onclick = function(){this.closest(".note").style.backgroundColor = "#CBF0F8"}});
  purple.forEach(note => {note.onclick = function(){this.closest(".note").style.backgroundColor = "#AECBFA"}});
  fuchsia.forEach(note => {note.onclick = function(){this.closest(".note").style.backgroundColor = "#D7AEFB"}});
  pale_rose.forEach(note => {note.onclick = function(){this.closest(".note").style.backgroundColor = "#FDCFE8"}});
};

changeColorNote(); 

function changeColorNewNote() {
  let white = document.querySelectorAll(".n_white");
  let rose = document.querySelectorAll(".n_rose");
  let orange = document.querySelectorAll(".n_orange");
  let yellow = document.querySelectorAll(".n_yellow");
  let green = document.querySelectorAll(".n_green");
  let turquoise = document.querySelectorAll(".n_turquoise");
  let light_blue = document.querySelectorAll(".n_light_blue");
  let purple = document.querySelectorAll(".n_purple");
  let fuchsia = document.querySelectorAll(".n_fuchsia");
  let pale_rose = document.querySelectorAll(".n_pale_rose");

  white.forEach(note => {note.onclick = function(){this.closest(".new_note").style.backgroundColor = "#FFFFFF"}});
  rose.forEach(note => {note.onclick = function(){this.closest(".new_note").style.backgroundColor = "#F28B82"}});
  orange.forEach(note => {note.onclick = function(){this.closest(".new_note").style.backgroundColor = "#FBBC04"}});
  yellow.forEach(note => {note.onclick = function(){this.closest(".new_note").style.backgroundColor = "#FFF475"}});
  green.forEach(note => {note.onclick = function(){this.closest(".new_note").style.backgroundColor = "#CCFF90"}});
  turquoise.forEach(note => {note.onclick = function(){this.closest(".new_note").style.backgroundColor = "#A7FFEB"}});
  light_blue.forEach(note => {note.onclick = function(){this.closest(".new_note").style.backgroundColor = "#CBF0F8"}});
  purple.forEach(note => {note.onclick = function(){this.closest(".new_note").style.backgroundColor = "#AECBFA"}});
  fuchsia.forEach(note => {note.onclick = function(){this.closest(".new_note").style.backgroundColor = "#D7AEFB"}});
  pale_rose.forEach(note => {note.onclick = function(){this.closest(".new_note").style.backgroundColor = "#FDCFE8"}});
};

changeColorNewNote();