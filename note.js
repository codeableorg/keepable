window.addEventListener('load', () => {
    // for (let i = 0; i < 12; i++) {
    //     document.querySelector('#notes')
    //         .append(noteTemplate(Note("Prueba de text", 'color-2', i)));
    // }
    renderNotes();
    colorPaletteColorsListener();
    colorTriggerListener();
    hideColorPaletteListener();  
    addNoteListener();
});

const state = {
    selectedNote: null
}

const addNoteListener = () => addListener([document.querySelector('#keepit')], 'click', addNoteHandler);

const addNoteHandler = e => {

    const note = e.target.parentElement.parentElement.previousElementSibling.textContent
    saveNote(Note(note, 'color-1'))  
    renderNotes();
}

const renderNotes = () => {
    const notes = getNotes();
    const container = document.querySelector('#notes');
    if (!notes) return;

    container.innerHTML = '';
    notes.forEach((note, idx) => {
        container.append(noteTemplate(Object.assign(note, {id:idx})))
    })
}

const getNotes = () => JSON.parse(localStorage.getItem('notes'));

const colorTriggerListener = () => {
    addListener(document.querySelectorAll('.color__trigger'), 'mouseenter', triggerColorPalette);
    addListener(document.querySelectorAll('#color_selector'), 'mouseenter', showColorPalette);

}
const hideColorPaletteListener = () => {
    addListener(document.querySelectorAll('#color_selector'), 'mouseleave', hideColorPalette);
    addListener(document.querySelectorAll('.color__trigger'), 'mouseleave', hideColorPalette);
}

const hideColorPalette = () => document.querySelector("#color_selector").style.visibility = 'hidden'
const showColorPalette = () => document.querySelector("#color_selector").style.visibility = 'visible'

const triggerColorPalette = e => {
    if (e.target.classList.contains('.fas')) return;
    showColorPalette();
    state.selectedNote = e.target.dataset.id
    const el = document.querySelector('#color_selector');
    el.style.left = e.pageX;
    el.style.top = e.pageY - 100;

    console.log(state.selectedNote)
} 

const colorPaletteColorsListener = () => addListener(document.querySelectorAll('.color-palette'), 'click', colorHandler);

const colorHandler = e => {
    const color = e.target.classList.item(0);
    changeNoteColor(state.selectedNote, color);
};

const changeNoteColor = (id, color) => {
    //id = id.match(/\d+$/)[0];
    const notes = getNotes();
    notes[id] = Object.assign(notes[id], {color});
    saveNotes(notes);
    changeRenderedNoteColor(`#note-${id}`, color)
}

const addListener = (elements, event, handler) => elements.forEach(element => element.addEventListener(event, handler));

const saveNotes = notes => localStorage.setItem('notes', JSON.stringify(notes))

const saveNote = note => {
    let localNotes = getNotes();
    if (!localNotes) return saveNotes([note]);
    
    localNotes.push(note);
    return saveNotes(localNotes)
}

const Note = (content, color, id) => { return { content, color} };


const changeRenderedNoteColor = (element, color) => document.querySelector(element).setAttribute('class', `note ${color}`);


const noteTemplate = ({ content, color, id }) => {
    const div = document.createElement('div');
    div.classList.add('note');
    div.classList.add(color);
    div.setAttribute('id', `note-${id}`);
    div.innerHTML = `  
        <div class="note__body">
        <p class="note__body__content">${content}</p>
        </div>
        <div class="note__footer">
            <div class="note__footer__buttons">
            <button class="note__footer__button_color btn color__trigger" data-id="${id}">
                <img class="note__footer__button__icon" src="img/icons/color.png" />
            </button>
            <button class="note__footer__button_delete btn" data-id="${id}">
                <img class="note__footer__button__icon" src="img/icons/delete.png" />
            </button>
            </div>
        </div>`;
    return div;
};