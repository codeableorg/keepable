'use strict';

function reset_active_menu() {
  const links = document.getElementsByClassName("menu-item");
  for (let link of links) {
    link.classList.remove("menu-state");
  }
}

function click_notes() {
  if (state.current_page !== "notes") {
    reset_active_menu();
    let el = document.querySelector('#note-option');
    el.classList.add("menu-state");
    state.render_note_page();
  }   
}

function click_trash() {
  if (state.current_page !== "trash") {
    reset_active_menu();
    let el = document.querySelector('#trash-option');
    el.classList.add("menu-state");
    state.render_trash_page();
  }
}