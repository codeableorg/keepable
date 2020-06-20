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
					<p onclick="app.showPalette(event,${this.id})"><i sclass="fas fa-palette"></i></p>
	        		<button onclick="app.deleteNote(${this.id})" class="delete">Delete</button>
				</div>
		    </div>
		    `
    }
}

class App {

    constructor() {
        this.vault = window.localStorage
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
		for (let i = 0; i < this.cards.length; i++) {
			if (this.cards[i].id === id) {
				this.cards.splice(i, 1)
			}
		}
		this.render()
    }
    injectColor(color, obj) {
	console.log(obj instanceof Card)
	if (obj instanceof Card) {
		obj.color = color
	} else {
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
			for (let i = 0; i < this.cards.length; i++) {
				if (this.cards[i].id === id) {
					obj = this.cards[i]
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
			}
		}
		palette.style.visibility = 'visible';
		palette.style.left = `${event.clientX}px`;
		palette.style.top = `${event.clientY}px`

	}

	get_location() {
		navigator.geolocation.getCurrentPosition((position)=>{
			console.log(position)
			fetch("http://maps.googleapis.com/maps/api/geocode/json?latlng=" + position.coords.latitude + ',' + position.coords.longitude + '&sensor=false')
				.then(response => {
					console.log(response)
				})
		})
	}

	edit_card(id) {

		let obj = null
		for (let i = 0; i < this.cards.length; i++) {
			if (this.cards[i].id === id) {
				obj = this.cards[i]
			}
		}

		let modal = document.getElementById('myModal');
		let modal_body = modal.children[0];
		modal.style.display = 'block';
		modal.children[0].style.backgroundColor = `${obj.color}`

		window.onclick = (event) => {
			if (event.target === modal){
				modal.style.display = 'none';
				modal_body.innerHTML = '';
			}
		}
		let calc = (this.cards.length - id) - 1
		let current_card = this.cards[id];
		modal_body.innerHTML += `
				<h1>${current_card.title}</h1>
				<p>${current_card.content}</p>
		`
	}

	render() {
		document.getElementById('notes').innerHTML = ``
		for (const card of this.cards) {
			document.getElementById('notes').innerHTML += card.html()
		}
	}
}


const app = new App()
