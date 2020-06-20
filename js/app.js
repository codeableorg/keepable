class App {
  
  constructor({ notesContainer }) {
    if (App._instance) return App._instance;
    else App._instance = this;
    this.notesContainer = notesContainer;
    this.notes = [];
    this.trashNotesCoteiner = document.querySelector("#trash-notes");
  }

  createNote({ title = '', body, color }) {
    const note = new Note({ title, body, color });
    this.notes.push(note);
    return note;
  }

  clean() {
    this.notesContainer.innerHTML = '';
  }

  renderNotes() {
    this.clean();
    this.notes.sort((a, b) => b.date - a.date).forEach((note) => {
      if(!note.deleted){
        this.notesContainer.append(note.createCard());
      }
    });
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