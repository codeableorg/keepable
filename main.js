class App {
  static render(container, notes) {
    notes.forEach((note) => {
      container.append(note.createCard());
    });
  }
}

let container = document.querySelector('.notes');
let notes = [
  new Note({ body: 'A simple note body', color: Note.colors[0] }),
  new Note({ body: 'A simple note body', color: Note.colors[1] }),
  new Note({ body: 'A simple note body', color: Note.colors[2] }),
  new Note({ body: 'A simple note body', color: Note.colors[3] }),
  new Note({ body: 'A simple note body', color: Note.colors[4] }),
  new Note({ body: 'A simple note body', color: Note.colors[5] }),
  new Note({ body: 'A simple note body', color: Note.colors[6] }),
];

App.render(container, notes);
