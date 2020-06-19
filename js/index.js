'use strict';

class Note {
  constructor(content, color) {
    this.content = content;
    this.color = color;
  }
}

let state = {
  main: document.querySelector('main'),
  normal: [],
  trashed: [],
  add_note (description, color = 'red') {
    this.normal.push(new Note(description, color));
  },
  render_note_page(){
    new Promise(function(resolve, reject) {
      resolve(new DocumentFragment());
    }).then((fragment) => {
      return this.create_form(fragment);
    }).then((fragment) => {
      return this.generate_notes(fragment);
    }).then((fragment) => {
      this.main.innerHTML = "";
      this.main.append(fragment);
    });
  },

  create_form: function (fragment) {
    let div = document.createElement('div');
    div.className = 'new_note_container';
    div.innerHTML = 
      `<form action="" class="new_note">
        <textarea name="" id="textarea" cols="30" rows="10" placeholder="Some great think!"></textarea> 
        <button>Keep it!</button>
      </form>`;
    fragment.append(div);
    return fragment;
  },

  generate_notes : function (fragment){ 
    let notes_container = document.createElement('div');
    notes_container.className = 'notes_container';

    this.normal.forEach(function (note) {
      let note_element = document.createElement('div');
      note_element.className = 'note';
      note_element.innerText = note.content;
      notes_container.append(note_element)
    });
    fragment.append(notes_container);
    return fragment;
  }
  
};

state.add_note('holi');
state.add_note('woli', 'blue');

state.render_note_page()