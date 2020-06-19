'use strict';

class Note {
  constructor(content, color) {
    this.content = content;
    this.color = color;
  }
}

let state = {
  main: document.querySelector('main'),
  normal_notes: [],
  trashed_notes: [],
  add_note (description, color = 'red') {
    this.normal_notes.push(new Note(description, color));
  },
  remove_normal_note(id){
    if(id >= this.normal_notes.length){
      console.log("Id no valido");
      return;
    }
    const normal_note = this.normal_notes.splice(id, 1);
    this.trashed_notes.push(normal_note[0]);
    this.render_note_page();
  },
  change_color_of_normal_note(id, color){
    if(id >= this.normal_notes.length){
      console.log("Id no valido");
      return;
    }
    this.normal_notes[id].color = color;
    this.render_note_page();
  },
  remove_trashed_note(id){
    if(id >= this.trashed_notes.length){
      console.log("Id no valido");
      return;
    }
    this.trashed_notes.splice(id, 1);
    this.render_note_page();
  },
  restore_trashed_note(id){
    if(id >= this.trashed_notes.length){
      console.log("Id no valido");
      return;
    }
    const trashed_note = this.trashed_notes.splice(id, 1);
    this.normal_notes.push(trashed_note[0]);
    this.render_note_page();
  },

  render_note_page(){
    new Promise(function(resolve, reject) {
      resolve(new DocumentFragment());
    }).then((fragment) => {
      return this.create_form(fragment);
    }).then((fragment) => {
      return this.generate_normal_notes(fragment);
    }).then((fragment) => {
      this.main.innerHTML = "";
      this.main.append(fragment);
    });
  },

  render_trash_page(){
    new Promise(function(resolve, reject) {
      resolve(new DocumentFragment());
    }).then((fragment) => {
      return this.generate_trashed_notes(fragment);
    }).then((fragment) => {
      this.main.innerHTML = "";
      this.main.append(fragment);
    });
  },

  create_note_from_form: function (event, caller) {
    console.log(caller);
    caller.add_note(event.target.textarea.value);
    caller.render_note_page();
    event.preventDefault();
  },

  create_form: function (fragment) {
    let div = document.createElement('div');
    div.className = 'new_note_container';
    div.innerHTML = 
      `<form action="" class="new_note">
        <textarea name="note" id="textarea" cols="30" rows="10" placeholder="Some great think!"></textarea> 
        <button>Keep it!</button>
      </form>`;
    fragment.append(div);
    fragment.firstChild.addEventListener('submit', (event) => this.create_note_from_form(event, this));
    return fragment;
  },

  generate_normal_notes : function (fragment){
    let notes_container = document.createElement('div');
    notes_container.className = 'notes_container';

    this.normal_notes.forEach(function (note) {
      let note_element = document.createElement('div');
      note_element.className = `note ${note.color}`;
      note_element.innerText = `content ${note.content}, color ${note.color}`;
      notes_container.append(note_element)
    });
    fragment.append(notes_container);
    return fragment;
  },

  generate_trashed_notes : function (fragment){
    let notes_container = document.createElement('div');
    notes_container.className = 'notes_container';

    this.trashed_notes.forEach(function (note) {
      let note_element = document.createElement('div');
      note_element.className = `note ${note.color}`;
      note_element.innerText = `content ${note.content}, color ${note.color}`;
      notes_container.append(note_element)
    });
    fragment.append(notes_container);
    return fragment;
  }
  
};

state.add_note('holi');
state.add_note('woli', 'blue');

state.render_note_page()