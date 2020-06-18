const paleta = document.querySelector(".paleta");

function createColor(num){
    const color = document.createElement("a");
    color.style.border = `1px solid var(--color-${num})`;
    color.style.background = `var(--color-${num})`;
    return color;
}

for(let i =1; i<11; i++){
    const newColor = createColor(i);
    paleta.append(newColor);
}

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
