function emptyNotes() {
  notes = [];
}

function populateNotes() {
  notes.push({
    title: 'Title',
    body: 'This is the body for the note.',
    color: 'white',
    trash: true,
    pinned: false,
    updatedAt: Date.now(),
  });
  notes.push({
    title: 'Title',
    body: 'This is the body for the note.',
    color: '#f28b82',
    trash: false,
    pinned: false,
    updatedAt: Date.now(),
  });
  notes.push({
    title: 'Title',
    body: 'This is the body for the note.',
    color: '#fbbc04',
    trash: false,
    pinned: false,
    updatedAt: Date.now(),
  });
  notes.push({
    title: 'Title',
    body: 'This is the body for the note.',
    color: '#fff475',
    trash: false,
    pinned: false,
    updatedAt: Date.now(),
  });
  notes.push({
    title: 'Title',
    body: 'This is the body for the note.',
    color: '#ccff90',
    trash: false,
    pinned: true,
    updatedAt: Date.now(),
  });
  notes.push({
    title: 'Title',
    body: 'This is the body for the note.',
    color: '#a7ffeb',
    trash: true,
    pinned: false,
    updatedAt: Date.now(),
  });
  notes.push({
    title: 'Title',
    body: 'This is the body for the note.',
    color: '#cbf0f8',
    trash: false,
    pinned: false,
    updatedAt: Date.now(),
  });
  notes.push({
    title: 'Title',
    body: 'This is the body for the note.',
    color: '#aecbfa',
    trash: false,
    pinned: false,
    updatedAt: Date.now(),
  });
  notes.push({
    title: 'Title',
    body: 'This is the body for the note.',
    color: '#d7aefb',
    trash: false,
    pinned: true,
    updatedAt: Date.now(),
  });
  notes.push({
    title: 'Title',
    body: 'This is the body for the note.',
    color: '#fdcfe8',
    trash: false,
    pinned: false,
    updatedAt: Date.now(),
  });
  clearElement(allNotes);
  createAllNotes(notes);
  openPaletteColor();
  changeNoteColor();
}
