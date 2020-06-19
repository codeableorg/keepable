class Note {
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
    this.title = title;
    this.body = body;
    this.color = color;
    this.deleted = false;
    this.pinned = false;
    this.date = new Date();
  }

  // This method returns a <div class="note">
  createCard() {
    const div = document.createElement('DIV');
    div.classList.add('note');
    div.style.background = this.color;
    div.innerHTML = `
      <p>${this.body}</p>
      <div class="buttons">
        <div class="palette"><img src="images/palette.svg" alt="palette"></div>
        <div class="trash"><img src="images/trash2.svg" alt="trash"></div>
      </div>
    `;
    return div;
  }
}
