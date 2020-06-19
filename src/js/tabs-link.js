let activeLinkClassName = '.nav-active-link'
let linkTags = document.getElementsByTagName('a');
let classHiddenName = 'hide-panel'
let panelsNames = ['#notes-panel', '#deleted-panel']
let defaultPanel = panelsNames[0]

function findPanel(hashWindow) {
    return document.querySelector(hashWindow)
}

function hidePanels(elements) {
    elements.forEach(e => document.querySelector(e).classList.add(classHiddenName))
}

function restructurePanels() {
    let panel = findPanel(window.location.hash)
    if (panel) {
        hidePanels(panelsNames)
        panel.classList.remove(classHiddenName)
    }
}

function removeActiveLink() {
    for (let i = 0, len = linkTags.length; i < len; i++) {
        linkTags[i].closest('li').classList.remove('nav-active-link')
    }
}

function tabLinks() {
    window.location.hash = defaultPanel
    restructurePanels()
    for (let i = 0, len = linkTags.length; i < len; i++) {
        let elementLink = linkTags[i]
        if (elementLink.dataset['type'] === 'link') {
            elementLink.onclick = function () {
                setTimeout(function () {
                    restructurePanels()
                    removeActiveLink()
                    elementLink.parentNode.classList.add('nav-active-link')
                    window.scrollTo(0, 0); // Fix auto-focus to div and set to top
                }, 0)
            }
        }
    }
}

window.onload = tabLinks