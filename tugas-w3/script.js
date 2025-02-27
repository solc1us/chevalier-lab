let toDoLists = [
	{
		nama: "Belajar HTML dan CSS",
		deskripsi: "Mempelajari dasar-dasar HTML dan CSS untuk membuat website yang menarik.",
		deadline: "2024-12-15",
	},
];

let toDoListsElement = document.getElementById("daftar-tugas");

function renderToDoLists() {
	toDoListsElement.innerHTML = "";
	toDoLists.forEach((toDoList, index) => {
		let toDoListElement = `
			<div class="list-tugas">
					<div class="atribut-list-tugas">
						<h2>${toDoList.nama}</h2>
					</div>
					<div class="atribut-list-tugas">
						<p>${toDoList.deskripsi}</p>
					</div>
					<div class="atribut-list-tugas">
						<p>Deadline:&nbsp;</p>
						<p>${toDoList.deadline}</p>
					</div>
					<div class="atribut-list-tugas">
						<button class="delete" onclick="deleteToDoList(${index})">Hapus</button>
					</div>
				</div>
        `;
		toDoListsElement.innerHTML += toDoListElement;
	});
}

function addToDoList() {

	const newNama = document.getElementById("nama").value;
	const newDeskripsi = document.getElementById("deskripsi").value;
	const newDeadline = document.getElementById("deadline").value;

	if (
		newNama &&
		newDeskripsi &&
		newNama.length > 1 &&
		newDeskripsi.length > 1
	) {
		const newData = {
			nama: newNama,
			deskripsi: newDeskripsi,
			deadline: newDeadline,
		};
		toDoLists.push(newData);
		renderToDoLists();
	}
}

function deleteToDoList(index) {
	toDoLists.splice(index, 1);
	renderToDoLists();
}

renderToDoLists();
