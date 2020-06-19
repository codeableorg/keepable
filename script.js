class Card {
    constructor(id, title, content, color){
        this.id = id;
        this.title = title;
        this.content = content;
        this.pinned = false;
	this.color = color;
    }
    html() {
	    return (
	           `
		    <div class="card" style="background: ${this.color}">
		    	<div class="title">${this.title}</div>
		        <div class="content">${this.content}</div>
		        <div onclick="app.showPalette(event, ${this.id})"><i class="fas fa-palette"></i></div>
		        <button onclick="app.deleteNote(${this.id})" class="delete">Delete</button>
		    </div>
		    `
	    )      
    }
}

class App {
    constructor() {
	this.cards = []
	this.card_count = 0
	this.new_note_color = '#FFFFFF'
    }
    createNote() {
        const title = document.getElementById('title').value
        const content = document.getElementById('content').value
		if (title !== '' && content !== '') {
			const card = new Card(this.card_count, title, content, this.new_note_color)
			this.card_count++
			this.cards.push(card)
			this.render()
		}
    }

    deleteNote(id) {
		for (let i = 0; i < this.card_count; i++) {
			if (this.cards[i].id === id) {
			this.cards.splice(i, 1)
			}
		}
		this.render()
    }
    injectColor(color, obj) {
	if (obj instanceof Card) {
		obj.color = color
	} else {
		this.new_note_color = color
	}
	document.getElementById('color-palette').style.display = 'none'
	this.render()
    }

    showPalette(event, id) {
	let obj
	if (id == 'form') {
		obj = document.getElementById('form')
	} else {
		for (let i = 0; i < this.card_count; i++) {
			if (this.cards[i].id == id) {
				obj = this.cards[i]
			}
		}
	}
	const palette = document.getElementById('color-palette')
	const buttons = document.getElementsByClassName('color-palette-button')
	for (const button of buttons) {
		const color = (button.style.backgroundColor)
		button.addEventListener(
			'click', (event) => {
				this.injectColor(color, obj)
			}
		)
	}
	palette.style.display = 'block';
	palette.style.top = `${event.clientX}px`;
        palette.style.left = `${event.clientYx}px`
    }

    render() {
	document.getElementById('notes').innerHTML = ''
	for (const card of this.cards) {
		document.getElementById('notes').innerHTML += card.html()
	}
    }
}

const app = new App()
