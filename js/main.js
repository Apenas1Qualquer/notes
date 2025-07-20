// c-create ok
// r-read ok 
// u-update pendente 
// d-delete pendente

let contador = 0
const notes = JSON.parse(localStorage.getItem("notes")) || []

generateNotes(notes)

function newNote(e) {
    e.preventDefault()
    
    const form = new FormData(e.target)
    const note = {
        finished: false,
        description: form.get("note")
    }
    
    const data = JSON.parse(localStorage.getItem("notes")) || []

    if (data.map(item => item.description.toUpperCase().replaceAll(" ", "")).includes(note.description.toUpperCase().replaceAll(" ", ""))) {
        e.target.children[0].value = "" 
        return
    }

    generateNotes([note])
    
    localStorage.setItem("notes", JSON.stringify([...data, note]))
    
    e.target.children[0].value = ""
}

function generateNotes(notes) {
    if (notes.length == 0) return
    
    const notesContainer = document.getElementById("notes")
    
    for (let note of notes) {
        const input = document.createElement("input")
        input.type = "checkbox"
        input.id = contador
        input.checked = note.finished
        input.onclick = () => changeStatus(note)

        const label = document.createElement("label")
        label.htmlFor = contador
        label.textContent = note.description
        
        const divId = `note-${contador}`

        const span = document.createElement("span")
        span.textContent = "⭙"
        span.onclick = () => deleteNote(divId, note)
        span.className = "delete"

        const div = document.createElement("div")
        div.id = divId
        div.append(input, label, span)
        
        notesContainer.appendChild(div)
        
        contador++
    }
    
    notesContainer.style.display = "block"
}

function deleteNote(id, note) {
    const notesContainer = document.getElementById("notes")
    notesContainer.removeChild(document.getElementById(id))
    if (notesContainer.children.length == 0) {
        notesContainer.style.display = "none"
    }
    const data = JSON.parse(localStorage.getItem("notes")) || []
    const newData = data.filter(item => item.description != note.description)
    localStorage.setItem("notes", JSON.stringify(newData))
}

function changeStatus(note) {
    const data = JSON.parse(localStorage.getItem("notes")) || []
    const newData = []
    for (let dataNote of data) {
        if (dataNote.description == note.description) {
            newData.push({
                finished: !dataNote.finished,
                description: dataNote.description 
            })
        } else {
            newData.push(dataNote)
        }
    }
    localStorage.setItem("notes", JSON.stringify(newData))
} 