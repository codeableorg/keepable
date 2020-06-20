class Card {
    constructor(id, title, content, color){
        this.id = id;
        this.title = title;
        this.content = content;
        this.pinned = false;
		this.color = color;
    }
    html() {
	    return `
		    <div class="card" style="background: ${this.color}">
		    	<div class="card-body" onclick="app.edit_card(${this.id})">
		    		<div class="title">${this.title}</div>
		    		<div class="content">${this.content}</div>
		    	</div>
				<div class="card-options">
					<p onclick="app.showPalette(event,${this.id})"><i class="fas fa-palette"></i></p>
	        		<button onclick="app.deleteNote(${this.id})" class="delete">Delete</button>
				</div>
		    </div>
		    `
    }
}

class App {

    constructor() {
        this.vault = window.localStorage
		this.active_cards = []
		this.deleted_cards = []
		this.card_count = 0
		this.new_note_color = '#FFFFFF'
		this.render()
    }
    push_note() {
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;
		if (title !== '' && content !== '') {
			const card = new Card(this.card_count, title, content, this.new_note_color);
			this.card_count++;
			this.active_cards.push(card);
			this.render();
		}
		document.getElementById('title').value = '';
		document.getElementById('content').value = '';
    }

    deleteNote(id) {
		for (let i = 0; i < this.active_cards.length; i++) {
			if (this.active_cards[i].id === id) {
				this.deleted_cards.push(this.active_cards[i])
				this.active_cards.splice(i, 1)
			}
		}	
		document.getElementById('myModal').style.display = 'none';
		document.getElementById('myModal').children[0].innerHTML = '';
		this.render()
	}
	
	search_note(id) {

		for (let i = 0; i < this.active_cards.length; i++) {
			if (this.active_cards[i].id === id) {
				return this.active_cards[i]
			}
		}
	}

    injectColor(color, obj) {
		console.log(obj instanceof Card)
		if (obj instanceof Card) {
			obj.color = color
		} 
		else {
			this.new_note_color = color
		}
		document.getElementById('color-palette').style.visibility = 'hidden'
		this.render()
    }

    showPalette(event, id) {
		let obj = null
		if (id === 'form') {
			obj = document.getElementById('form')
		} else {
			for (let i = 0; i < this.active_cards.length; i++) {
				if (this.active_cards[i].id === id) {
					obj = this.active_cards[i]
				}
			}
		}
		console.log(obj)
		const palette = document.getElementById('color-palette')
		const buttons = document.getElementsByClassName('color-palette-button')
		for (const button of buttons) {
			const color = (button.style.backgroundColor)
			button.onclick = (event) => {
				this.injectColor(color, obj)
				document.getElementById('myModal').style.display = 'none';
				document.getElementById('myModal').children[0].innerHTML = '';
			}
		}
		palette.style.visibility = 'visible';
		palette.style.left = `${event.clientX}px`;
		palette.style.top = `${event.clientY}px`

	}

	edit_card(id) {

		let selected_card = this.search_note(id);
		let modal = document.getElementById('myModal');
		let modal_body = modal.children[0];
		modal.style.display = 'block';
		modal.children[0].style.backgroundColor = `${selected_card.color}`
		window.onclick = (event) => {
			if (event.target === modal){
				modal.style.display = 'none';
				modal_body.innerHTML = '';
			}
		}

		modal_body.innerHTML += `	
				<h1>${selected_card.title}</h1>
				<p>${selected_card.content}</p>
				<div class="card-options">
					<p onclick="app.showPalette(event,${id})"><i class="fas fa-palette"></i></p>
	        		<button onclick="app.deleteNote(${id})" class="delete">Delete</button>
				</div>
		`
	}

	render() {

		let notes = document.getElementById('notes');
			notes.innerHTML = '';
		if (this.active_cards.length === 0) {
			notes.innerHTML += `<img style = "justify-self:center"src = "./assets/placeholder.svg" alt = "placeholder">`;
		}
		else {
			let i = this.active_cards.length;
			while(i !== 0) {
				notes.innerHTML += this.active_cards[i-1].html();
				i--;
			}
		}
	}

	renderDeleted() {
		document.getElementById('notes').innerHTML = ``
		for (const card of this.deleted_cards) {
			document.getElementById('notes').innerHTML += card.html()
		}
	}
}


const app = new App()
