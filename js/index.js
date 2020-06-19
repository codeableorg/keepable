'use strict';

class Note {
  constructor(title, content, color, index) {
    this.title = title;
    this.content = content;
    this.color = color;
    this.trashed = false;
    this.pinned = false;
    this.index = index;
  }
}

let state = {
  main: document.querySelector('main'),
  notes: [],
  current_page: null,
  count_notes: 0,
  add_note (title, content, color = 'red') {
    this.notes.push(new Note(title, content, color, this.count_notes));
    this.count_notes += 1;
  },
  trash_a_note(id){
    const note_index = this.notes.findIndex((el) => el.index === id & el.trashed === false);
    if(note_index === -1){
      console.log("Id no valido");
      return;
    }
    this.notes[note_index].trashed = true;
    this.refresh_current_page();
  },
  change_color_of_note(id, color){
    const note_index = this.notes.findIndex((el) => el.index === id);
    if(note_index === -1){
      console.log("Id no valido");
      return;
    }
    this.notes[note_index].color = color;
    this.refresh_current_page();
  },
  remove_trashed_note(id){
    const note_index = this.notes.findIndex((el) => el.index === id & el.trashed === true);
    if(note_index === -1){
      console.log("Id no valido");
      return;
    }
    delete this.notes.splice(note_index, 1);
    this.refresh_current_page();
  },
  restore_trashed_note(id){
    const note_index = this.notes.findIndex((el) => el.index === id & el.trashed === true);
    if(note_index === -1){
      console.log("Id no valido");
      return;
    }
    this.notes[note_index].trashed = false;
    this.refresh_current_page();
  },

  render_note_page(){
    new Promise(function(resolve, reject) {
      resolve(new DocumentFragment());
    }).then((fragment) => {
      return this.create_form(fragment);
    }).then((fragment) => {
      return this.generate_not_trashed_notes(fragment);
    }).then((fragment) => {
      this.current_page = "notes";
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
      this.current_page = "trash";
      this.main.innerHTML = "";
      this.main.append(fragment);
    });
  },

  refresh_current_page(){
    if (this.current_page === "notes") {
      this.render_note_page();
    } else {
      this.render_trash_page();
    }
  },

  create_form: function (fragment) {
    const create_note_from_form = function (event) {
      state.add_note(event.target.textarea.value);
      state.render_note_page();
      event.preventDefault();
    }

    let div = document.createElement('div');
    div.className = 'new_note_container';
    div.innerHTML = 
      `<form action="" class="new_note">
        <textarea name="note" id="textarea" cols="30" rows="10" placeholder="Some great think!"></textarea> 
        <button>Keep it!</button>
      </form>`;
    fragment.append(div);
    fragment.firstChild.addEventListener('submit', (event) => create_note_from_form(event));
    return fragment;
  },

  generate_not_trashed_notes : function (fragment){
    const not_trashed_notes = this.notes.filter((el) => el.trashed===false);

    if (not_trashed_notes.length !== 0) {
      const [not_pinned, pinned] = not_trashed_notes.reduce(([not_pinned_acc, pinned_acc], note) => {
        return note.pinned ? [not_pinned_acc, [...pinned_acc, note]] : [[...not_pinned_acc, note], pinned_acc];
      }, [[], []]);

      let notes_container = document.createElement('div');
      notes_container.className = 'notes_container';
      not_pinned.forEach(function (note) {
        let note_element = document.createElement('div');
        note_element.className = `note ${note.color}`;
        note_element.setAttribute("note_id", note.index);
        
        let description = document.createElement('p');
        description.innerText = `title: ${note.title}, content ${note.content}, color ${note.color}, id ${note.index}`;
        note_element.append(description);

        let delete_item = document.createElement('div');
        delete_item.innerText = "Click para enviar a trash";
        delete_item.addEventListener('click', (event) => callback_trash_the_note(event));
        note_element.append(delete_item);
        
        notes_container.append(note_element)
      });
      fragment.append(notes_container);
    } else {
      let message = document.createElement('p');
      message.innerText = 'no notes, create more please';
      fragment.append(message);
    }
    
    return fragment;
  },

  generate_trashed_notes : function (fragment){
    let notes_container = document.createElement('div');
    notes_container.className = 'notes_container';

    this.notes.filter((el) => el.trashed===true).forEach(function (note) {
      let note_element = document.createElement('div');
      note_element.className = `note ${note.color}`;
      note_element.setAttribute("note_id", note.index);


      let description = document.createElement('p');
        description.innerText = `title: ${note.title}, content ${note.content}, color ${note.color}, id ${note.index}`;
        note_element.append(description);

      let delete_item = document.createElement('div');
      delete_item.innerText = "Eliminar permanentemente";
      delete_item.addEventListener('click', (event) => callback_remove_trashed_note(event));
      note_element.append(delete_item);

      let restore_item = document.createElement('div');
      restore_item.innerText = "Click para restaurar el note";
      restore_item.addEventListener('click', (event) => callback_restore_trashed_note(event));
      note_element.append(restore_item);
      
      notes_container.append(note_element)
    });
    fragment.append(notes_container);
    return fragment;
  }
  
};

//callbacks

function callback_trash_the_note(event) {
  state.trash_a_note(Number(event.currentTarget.parentNode.getAttribute("note_id")))
}

function callback_remove_trashed_note(event) {
  state.remove_trashed_note(Number(event.currentTarget.parentNode.getAttribute("note_id")))
}

function callback_restore_trashed_note(event) {
  state.restore_trashed_note(Number(event.currentTarget.parentNode.getAttribute("note_id")))
}


state.add_note('holi-title', 'holi-description');
state.add_note('woli-title', 'woli-description', 'blue');
state.add_note('note deleted', 'note-deleted-description', 'blue');
state.trash_a_note(2);

click_notes()
// state.render_note_page()