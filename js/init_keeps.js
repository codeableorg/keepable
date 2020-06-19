if (!localStorage.getItem("notes")) {
  localStorage.setItem("notes", "[]")
}

class Note {
  constructor({id, title="", body, classColor="card-white", active=true, pinned=true}){
    this.id = id;
    this.title = title;
    this.body = body;
    this.classColor = classColor;
    this.active = active;
    this.pinned = pinned;
  }
}
