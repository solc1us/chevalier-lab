let notes = [
	{
		title: "My next trip",
		description: "I would like to go to Spain",
	},
];

let notesElement = document.getElementById("notes-list");

function renderNotes() {
	notesElement.innerHTML = "";
	notes.forEach((note, index) => {
		let noteElement = `
        <div class = "note">
            <h3>${note.title}</h3>
            <p>${note.description}</p>
            <button onclick="deleteNote(${index})">Delete
            </button>
            </div>
        `;
		notesElement.innerHTML += noteElement;
	});
}

function addNote() {
	const newTitle = document.getElementById("title").value;
	const newDescription = document.getElementById("description").value;

	if (
		newTitle &&
		newDescription &&
		newTitle.length > 1 &&
		newDescription.length > 1
	) {
		const newData = {
			title: newTitle,
			description: newDescription,
		};
        notes.push(newData);
        renderNotes();
    }
}

function deleteNote(index) {
    notes.splice(index, 1);
    renderNotes();
}

renderNotes();