class App {
  constructor({ notesContainer }) {
    if (App._instance) return App._instance;
    else App._instance = this;
    this.notesContainer = notesContainer;
    this.notes = [];
    this.trashNotesCoteiner = document.querySelector("#trash-notes");
    this.message = document.querySelector('.no_notes');
  }

  createNote({ title = '', body, color }) {
    const note = new Note({ title, body, color });
    this.notes.push(note);
    return note;
  }

  clean() {
    this.notesContainer.innerHTML = '';
    this.trashNotesCoteiner.innerHTML = '';
  }

  renderNotes() {
    this.clean();
    this.notes.sort((a, b) => b.date - a.date).forEach((note) => {
      if(!note.deleted){
        this.notesContainer.append(note.createCard());
      }
    });
    console.log(app.notes);
    if (this.notes.filter((note) => !note.deleted).length === 0) {
      this.message.classList.remove('hidden');
    } else {
      this.message.classList.add('hidden');
    }
  }

  trashRenderNotes() {
    this.clean();
    this.notes.sort((a, b) => b.date - a.date).forEach((note) => {
      if(note.deleted){
       this.trashNotesCoteiner.append(note.createTrashCard());
      }
    });
  }

}
