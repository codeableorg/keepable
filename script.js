const data = [
    "nota 1",
    "nota 2",
    "nota 3"
];

const trash_data = [
    "jhbvddsfjd",
    "sdijnf"
];

function softDelete(e) {
    const text = e.target.parentNode.childNodes[0].parentNode.parentNode.childNodes[0].innerHTML;
    const idx = parseInt(e.target.parentNode.childNodes[0].parentNode.parentNode.id);
    e.target.parentNode.parentNode.remove();
    data.splice(idx, 1);
    trash_data.push(text);
}

function permanentlyDelete(e) {
    const idx = parseInt(e.target.parentNode.childNodes[0].parentNode.parentNode.id);
    e.target.parentNode.parentNode.remove();
    trash_data.splice(idx, 1);
}

function recover(e) {
    const idx = parseInt(e.target.parentNode.childNodes[0].parentNode.parentNode.id);
    e.target.parentNode.parentNode.remove();
    data.push(trash_data[parseInt(idx)]);
    trash_data.splice(idx, 1);
}

function createNote(content, idx) {
    return `<div id="${idx}" class="notas"><p>${content}</p></div>`;
}

function render(name) {
    const list = document.getElementById('list');
    [...list.childNodes].forEach(e => e.remove());
    list.innerHTML = '';
    if (!list) return;
    let notes = data;
    if(name == 'trash')
        notes = trash_data;
    const buttons = ['<span class="delete">delete</span>', '<span class="permDelete">perm delete</span>'];
    notes.forEach((text, idx) => {
        const note = createNote(text, idx);
        const container = document.createElement('div');
        container.innerHTML = note;
        const button = document.createElement('span');
        button.innerHTML = buttons[0];
        container.childNodes[0].appendChild(button);
        if(name == 'trash') {
            const recover = document.createElement('span');
            recover.innerHTML = '<span class="recover">recover</span>';
            button.innerHTML = buttons[1];
            container.childNodes[0].appendChild(recover);
        }
        list.appendChild(container);
    });
};

const views = ['data', 'trash']

let currentView = 1;

var deleteButtons;
var permDeleteButtons;
var recoverButtons;
var changeViewButtons = document.getElementsByClassName("change_view");

function changeView() {
    currentView = currentView === 0 ? 1 : 0;
    render(views[currentView]);
    deleteButtons = document.getElementsByClassName("delete");
    permDeleteButtons = document.getElementsByClassName("permDelete");
    recoverButtons = document.getElementsByClassName("recover");
    [...deleteButtons].forEach(button => button.addEventListener("click", softDelete));
    [...permDeleteButtons].forEach(button => button.addEventListener("click", permanentlyDelete));
    [...changeViewButtons].forEach(button => button.addEventListener("click", changeView));
    [...recoverButtons].forEach(button => button.addEventListener("click", recover));
}

changeView();