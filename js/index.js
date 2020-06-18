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
    let form = document.createElement('form');
    let input = document.createElement('input');
    input.type = 'text';
    form.append(input);
    fragment.append(form);
    return fragment;
  },

  generate_notes : function (fragment){ 
    this.normal.forEach(function (note) {
      let note_element = document.createElement('div');
      note_element.className = note.color;
      let p_element = document.createElement('p');
      p_element.innerText = note.content;
      note_element.append(p_element);
      fragment.append(note_element);
    });
  
    return fragment;
  }
  
};


state.add_note('holi');
state.add_note('woli', 'blue');

state.render_note_page()