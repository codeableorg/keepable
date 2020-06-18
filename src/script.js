class Card {
    constructor(id, body){
        this.id = id;
        this.body = body;
        this.pin = false;
    }
}

class App {
    constructor() {
        this.vault = window.localStorage;
    }
    
}