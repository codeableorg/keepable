class Card {
    constructor(id, title, content){
        this.id = id;
        this.title = title;
        this.content = content;
        this.pinned = false;
    }
    html() {
	    return `
		    <div class="card">
		    	<div class="title">
					${this.title}
		        </div>
		        <div class="content">
					${this.content}
		         </div>
		         <p onclick="app.click_color(event,${this.id})">hi<!--i class="fa fa-search"--></i></p>
		        <button onclick="app.delete_note(${this.id})" class="delete">Delete</button>
		    </div>
		    `
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
		if (title !== '' && content !== '') {
			const card = new Card(this.card_count, title, content)
			this.card_count++
			this.cards.push(card)
			this.render()
		}
		else {

		}
    }

    delete_note(id) {
		for (let i = 0; i < this.cards.length; i++) {
			if (this.cards[i].id === id) {
			this.cards.splice(i, 1)
			}
		}
		this.render()
    }

    click_color(event) {
    	let x = event.clientX;
    	let y = event.clientY;
		let palette = document.getElementById('color-palette');
		palette.style.visibility = 'visible';
		palette.style.top = `${y}px`;
		palette.style.left = `${x}px`;
	}
    render() {
		document.getElementById('notes').innerHTML = ``
		for (const card of this.cards) {
			document.getElementById('notes').innerHTML += card.html()
		}
    }
}

const app = new App()
