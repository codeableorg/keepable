"use strict";

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
  pin_a_note(id){
    const note_index = this.notes.findIndex((el) => el.index === id & el.trashed === false & el.pinned === false);
    if(note_index === -1){
      console.log("Id no valido");
      return;
    }
    this.notes[note_index].pinned = true;
    this.refresh_current_page();
  },
  unpin_a_note(id){
    const note_index = this.notes.findIndex((el) => el.index === id & el.trashed === false & el.pinned === true);
    if(note_index === -1){
      console.log("Id no valido");
      return;
    }
    this.notes[note_index].pinned = false;
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

  render_note_page() {
    new Promise(function (resolve, reject) {
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
      console.log(event.target.querySelector("#title").value);
      const title = event.target.querySelector("#title").value
      const textarea = event.target.querySelector("#textarea").value
      state.add_note(title, textarea);
      state.render_note_page();
      event.preventDefault();
    }

    let div = document.createElement('div');
    div.className = 'new_note_container';
    div.innerHTML = 
      `<form action="" class="new_note">
        <input id="title" class="title" type="text" placeholder="The title for my new note">
        <textarea name="" id="textarea" cols="30" rows="10" placeholder="Some great think!"></textarea> 

        <div class="new_note_footer">
          <div class="note_img palette">
            <img class="palette_img" src="images/palette.png" alt="color palette">
            <div class="color_palette">
              <div class="color_row_options">
                <div class="color_option white"></div>
                <div class="color_option rose"></div>
                <div class="color_option orange"></div>
                <div class="color_option yellow"></div>
                <div class="color_option green"></div>
              </div>
              <div class="color_row_options">
                <div class="color_option turquoise"></div>
                <div class="color_option light_blue"></div>
                <div class="color_option purple"></div>
                <div class="color_option fuchsia"></div>
                <div class="color_option pale_rose"></div>
              </div>
            </div>
          </div>
          <button class="note_save">Keep it!</button>
        </div>
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

      if (pinned.length !== 0) {
        let title = document.createElement('h2');
        title.innerText = "PINNED";
        fragment.append(title);

        let notes_container = document.createElement('div');
        notes_container.className = 'notes_container';
        pinned.forEach(function (note) {
          notes_container.append(generate_note(note))
        });
        fragment.append(notes_container);
      }

      if (not_pinned.length !== 0) {
        let title = document.createElement('h2');
        title.innerText = "OTHERS";
        fragment.append(title);

        let notes_container = document.createElement('div');
        notes_container.className = 'notes_container';
        not_pinned.forEach(function (note) {
          notes_container.append(generate_note(note))
        });
        fragment.append(notes_container);
      }

    } else {
      let empty_message = document.createElement('div');
      empty_message.className = 'empty_msg';
      empty_message.innerHTML = 
      `<img src="images/bracket_open.png" alt=""><p>Notes you add   <br>
        appears here</p><img src="images/bracket_close.png" alt="">
      </div>`;
      fragment.append(empty_message);
    }
    
    return fragment;
  },

  generate_trashed_notes : function (fragment){
    let notes_container = document.createElement('div');
    notes_container.className = 'notes_container';

    this.notes.filter((el) => el.trashed===true).forEach(function (note) {
      notes_container.append(generate_note(note))
    });
    fragment.append(notes_container);
    return fragment;
  },
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

function callback_pin_a_note(params) {
  state.pin_a_note(Number(event.currentTarget.parentNode.getAttribute("note_id")))
}

function callback_unpin_a_note(params) {
  state.unpin_a_note(Number(event.currentTarget.parentNode.getAttribute("note_id")))
}

function generate_note(note) {
  let note_element = document.createElement('div');
  note_element.className = `note ${note.color}`;
  note_element.setAttribute("note_id", note.index);

  let header = document.createElement('div');
  header.className = `note_header`;
  header.innerHTML = 
  `<h1 class="note_title">${note.title}</h1>
  <img class="note_pin" src="images/pin.png" alt="">`;
  note_element.append(header);

  let note_body = document.createElement('p');
  note_body.className = `note_body`;
  note_body.innerText = `${note.content}`;
  note_element.append(note_body);


  let note_footer = document.createElement('div')
  note_footer.className = `note_footer_imgs`;
  note_footer.innerHTML = 
  `<div class="note_img palette">
    <img class="palette_img" src="images/palette.png" alt="color palette">
    <div class="color_palette">
      <div class="color_row_options">
        <div class="color_option white"></div>
        <div class="color_option rose"></div>
        <div class="color_option orange"></div>
        <div class="color_option yellow"></div>
        <div class="color_option green"></div>
      </div>
      <div class="color_row_options">
        <div class="color_option turquoise"></div>
        <div class="color_option light_blue"></div>
        <div class="color_option purple"></div>
        <div class="color_option fuchsia"></div>
        <div class="color_option pale_rose"></div>
      </div>
    </div>
  </div>

  <div class="note_img">
    <img class="trash" src="images/trash_can.png" alt="delete">
  </div>`;
  note_element.append(note_footer);





  // if (note.trashed) {
  //   let delete_item = document.createElement('div');
  //   delete_item.innerText = "Click para Eliminar permanentemente";
  //   delete_item.addEventListener('click', (event) => callback_remove_trashed_note(event));
  //   note_element.append(delete_item);

  //   let restore_item = document.createElement('div');
  //   restore_item.innerText = "Click para restaurar";
  //   restore_item.addEventListener('click', (event) => callback_restore_trashed_note(event));
  //   note_element.append(restore_item);
  // } else {
  //   let trash_item = document.createElement('div');
  //   trash_item.innerText = "Click para Enviar a trash";
  //   trash_item.addEventListener('click', (event) => callback_trash_the_note(event));
  //   note_element.append(trash_item);

  //   let pin_option_item = document.createElement('div');
  //   if (note.pinned) {
  //     pin_option_item.innerText = "Click para hacer unpin a una nota";
  //     pin_option_item.addEventListener('click', (event) => callback_unpin_a_note(event));
  //   } else {
  //     pin_option_item.innerText = "Click para hacer pin a una nota";
  //     pin_option_item.addEventListener('click', (event) => callback_pin_a_note(event));
  //   }
  //   note_element.append(pin_option_item);
  // }

  return note_element;
}

state.add_note('Titulo 1', 'Description de note 1', 'orange');
state.add_note('Titulo 2', 'Description de note 2', 'green');
// state.add_note('note deleted', 'note-deleted-description', 'blue');
// state.trash_a_note(2);

click_notes()
