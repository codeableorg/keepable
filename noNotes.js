// create an element
function createNode(elem) {
  return document.createElement(elem);
}

// append an element to parent
function appendNode(parent, elem) {
  parent.appendChild(elem);
}

function showNoNotes() {
  let h1 = createNode('h1');
  h1.setAttribute('class', 'no-notes');
  h1.innerText = 'Notes you add appear here';
  appendNode(mainContainer, h1);
}

if (notes.length === 0) showNoNotes();
