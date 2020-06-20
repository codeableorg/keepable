const COLORS = "white red orange yellow green lightgreen skyblue blue purple pink"
const buildNote = (text,color) => ({text,color})
const data = [];

const trash_data = [buildNote("jhbvddsfjd",'white')];
data.push(buildNote('nota 1', "white"))
data.push(buildNote('nota 2', "red"))

function softDelete(e) {
  const noteEl = e.target.closest(".add-keep");
  const idx = parseInt(noteEl.dataset.id);
  const note = data[idx];
  noteEl.remove();

  data.splice(idx, 1);
  trash_data.push(note);
}

function permanentlyDelete(e) {
  const noteEl = e.target.closest(".add-keep");
  const idx = parseInt(noteEl.dataset.id);
  noteEl.remove();
  trash_data.splice(idx, 1);
}

function recover(e) {
  const noteEl = e.target.closest(".add-keep");
  const idx = parseInt(noteEl.dataset.id);
  noteEl.remove();
  data.push(trash_data[idx]);
  trash_data.splice(idx, 1);
}

function createNote(content, idx, name, color) {
  //return `<div id="${idx}" class="notas"><p>${content}</p></div>`;
  const note = document.createElement("div");
  let controls = `<div class="btn-paleta btn-paleta2">
    <img src="/assets/icon-paleta2.png" alt="button-paleta2" />
    <div class="color-picker">
    ${COLORS.split(' ').map(c => `<div class="color-picker__color ${c}"></div>`).join('')}</div>
  </div>
  <button class="btn-trash2 delete">
    <img src="/assets/icon-trash2.png" alt="button-trash2" />
  </button>`;

  if (name === "trash") {
    controls = `
    <button class="btn-trash2 permDelete">
        <img src="/assets/icon-trash2.png" alt="button-trash2" />
      </button>
    <button class="btn-recover recover">
        <img src="/assets/icon-recover.svg" alt="button-trash2" />
    </button>
      `;
  }

  note.id = "keep-1";
  note.dataset.id = idx;
  note.className = `add-keep ${color}`;
  note.innerHTML = `
    <textarea
      class="keep keep-1 note-text"
      placeholder="This is the body for the note."
    >${content}</textarea>
    <div class="content-buttons-keep">
      ${controls}
    </div>`;
  /* console.log(note); */

  return note;
}

function render(name) {
  const list = document.getElementById("list");
  [...list.childNodes].forEach((e) => e.remove());
  list.innerHTML = "";
  if (!list) return;
  let notes = data;
  if (!data.length && name != "trash") {
    list.outerHTML = `<div id="list" class="content-textnote">
      <span class="span-curly">{</span>
      <p>Notes you add appear here!</p>
      <span class="span-curly">}</span>
    </div>`;
    return;
  }
  list.className = "content-addkeep";
  if (name == "trash") notes = trash_data;
  notes.forEach(({text,color}, idx) => {
    const new_note = createNote(text, idx, name, color);
    list.appendChild(new_note);
  });
}

const views = ["default", "trash"];

let currentView = 1;

var deleteButtons;
var permDeleteButtons;
var recoverButtons;
