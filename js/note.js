class Note {
  static id = 0;
  static colors = [
    '#FFFFFF', // default color
    '#F28B82',
    '#FBBC04',
    '#FFF475',
    '#CCFF90',
    '#A7FFEB',
    '#CBF0F8',
    '#AECBFA',
    '#D7AEFB',
    '#FDCFE8',
  ];

  constructor({ title = '', body, color }) {
    this.id = ++Note.id;
    this.title = title;
    this.body = body;
    this.color = color;
    this.deleted = false;
    this.pinned = false;
    this.date = new Date();
  }

  deleteCard(){
    app.notes.forEach((note)=>{
      if(note.id === this.id){
        note.deleted = true;
      };
    })
    app.renderNotes();
  }

  recoverNote(){
    app.notes.forEach((note)=>{
      if(note.id === this.id){
        note.deleted = false;
      };
    })
    app.trashRenderNotes();
  }

  deleteTrashCard(){
    app.notes.find((note,index,array)=>{
      if(note.id === this.id){
        array.splice(index,1);
      };
    })
   app.trashRenderNotes();
  }

  createCard() {
    const div = document.createElement('DIV');
    div.classList.add('note');
    div.style.background = this.color;
    div.innerHTML = `
      <p>${this.body}</p>
      <div class="buttons">
        <div class="button-trash"><img src="images/trash2.svg" alt="trash"></div>
      </div>
    `;
    const btnTrash = div.querySelector(".button-trash")
    btnTrash.addEventListener('click',()=>{
      this.deleteCard();
    });

    const buttons = div.querySelector('.buttons');
    buttons.prepend(Note.createButtonPalette());

    const colorDivs = buttons.querySelectorAll('.button-palette__color');
    colorDivs.forEach((colorDiv) => {
      colorDiv.addEventListener('click', (e) => {
        const color = colorDiv.style.background;
        this.color = color;
        div.style.background = color;
      });
    });

    return div;
  }

  createTrashCard() {
    const div = document.createElement('DIV');
    div.classList.add('note');
    div.style.background = this.color;
    div.innerHTML = `
      <p>${this.body}</p>
      <div class="buttons">
      <div class="button-trash"><img src="images/trash2.svg" alt="trash"></div>
      <div class="button-palette"><img src="images/return.svg" alt="palette"></div>
      </div>
    `;

    const btnTrashPermanently = div.querySelector(".button-trash")
    btnTrashPermanently.addEventListener('click',()=>{
     this.deleteTrashCard();
    });
    const btnRecover = div.querySelector(".button-palette");
    btnRecover.addEventListener('click',()=>{
      this.recoverNote();
    });
    return div;
  }

  static createButtonPalette() {
    const a = document.createElement('A');
    a.classList.add('button-palette');
    a.href = '#';
    a.innerHTML = `
      <img class="button-palette__image" src="images/palette.svg" alt="palette">
      <div class="button-palette__colors">
        ${Note.colors.map((color) => `
          <label>
            <div class="button-palette__color" style="background:${color}"></div>
            <input class="create-note__radio" type="radio" name="color" value="${color}">
          </label>
        `).join('')}
      </div>
    `;
    return a;
  }
}
