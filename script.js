class Card {
    constructor(id, title, content){
        this.id = id;
        this.title = title;
        this.content = content;
        this.pinned = false;
    }
    html() {
	    return (
		    `
		    <div class="card">
		            <div class="title">
				${this.title}
		            </div>
		            <div class="content">
				${this.content}
		            </div>
			    <input type="color"></input>
		            <button onclick="app.delete_note(${this.id})" class="delete">Delete</button>
		    </div>
		    `
	    )
    }
}

class App {
    constructor() {
        this.vault = window.localStorage
	this.cards = []
	this.card_count = 0
    }
    create_note() {
        const title = document.getElementById('title').value
        const content = document.getElementById('content').value
        const card = new Card(this.card_count, title, content)
	this.card_count++
	this.cards.push(card)
	this.render()
    }
    delete_note(id) {
	for (let i = 0; i < this.cards.length; i++) {
		if (this.cards[i].id == id) {
			this.cards.splice(i, 1)
		}
	}
	this.render()
    }
    render() {
	document.getElementById('notes').innerHTML = ``
	for (const card of this.cards) {
		document.getElementById('notes').innerHTML += card.html()
	}
    }
}

const app = new App()
