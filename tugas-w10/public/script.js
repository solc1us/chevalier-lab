let mahasiswa = [];

async function loadData() {
  try {
    const res = await fetch("http://localhost:5000/api/mahasiswa/");
    mahasiswa = await res.json();
    console.log(mahasiswa);
    renderData(mahasiswa);
  } catch (err) {
    console.error("Gagal fetch mahasiswa:", err);
  }
}

function renderData() {
  const tbody = document.getElementById("mahasiswaTableBody");
  tbody.innerHTML = ""; // clear biar gak dobel pas reload

  mahasiswa.forEach((m) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${m.id}</td>
      <td>${m.nim}</td>
      <td>${m.nama}</td>
      <td>${m.jurusan}</td>
      <td>
        <button class="delete" onclick="deleteMahasiswa(${m.id})">Hapus</button>
        <button class="edit" onclick="editData(${m.id})">Edit</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

async function addMahasiswa() {
  const newNim = document.getElementById("nim").value;
  const newNama = document.getElementById("nama").value;
  const newJurusan = document.getElementById("jurusan").value;

  if (newNim && newNama && newNim.length > 1 && newNama.length > 1) {
    const newData = {
      nim: newNim,
      nama: newNama,
      jurusan: newJurusan,
    };
    console.log(newData);

    try {
      const res = await fetch("http://localhost:5000/api/mahasiswa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      });

      if (!res.ok) throw new Error("Gagal simpan data");

      const result = await res.json();
      console.log("Data berhasil disimpan:", result);

      loadData(); // Refresh tabel setelah tambah data
    } catch (err) {
      console.error("Error saat kirim data:", err);
    }

    loadData();
    renderData();
  }
}

// ==========================
// Fungsi untuk mendelete mahasiswa

async function deleteMahasiswa(index) {
  if (confirm("Yakin mau hapus data ini?")) {
    console.log(index);
    try {
      const res = await fetch(`http://localhost:5000/api/mahasiswa/${index}`, {
        method: "DELETE",
      });

      if (res.status === 204) {
        console.log(`Data dengan ID ${index} berhasil dihapus.`);
        loadData(); // refresh tabel
      } else {
        const error = await res.json();
        console.error("Gagal hapus data:", error.msg);
      }
    } catch (err) {
      console.error("Error saat delete:", err);
    }
  }
  loadData();
  renderData();
}

// ==========================
// Fungsi untuk mengedit mahasiswa

let editId = null;

function editData(index) {
  console.log(index);

  const mahasiswaToEdit = mahasiswa.find((m) => m.id === index);
  if (mahasiswaToEdit) {
    document.getElementById("nim").value = mahasiswaToEdit.nim;
    document.getElementById("nama").value = mahasiswaToEdit.nama;
    document.getElementById("jurusan").value = mahasiswaToEdit.jurusan;
    editId = index;
  }
}

async function submitData() {
  const newNim = document.getElementById("nim").value;
  const newNama = document.getElementById("nama").value;
  const newJurusan = document.getElementById("jurusan").value;

  if (newNim && newNama && newNim.length > 1 && newNama.length > 1) {
    const payload = {
      nim: newNim,
      nama: newNama,
      jurusan: newJurusan,
    };

    const url = editId ? `http://localhost:5000/api/mahasiswa/${editId}` : "http://localhost:5000/api/mahasiswa";

    const method = editId ? "PUT" : "POST";

    console.log(payload, url, method);

    try {
      const res = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Gagal simpan data");

      const result = await res.json();
      console.log("Data berhasil disimpan:", result);

      resetForm();
      loadData();
    } catch (err) {
      console.error("Error saat kirim data:", err);
    }
  }
}

function resetForm() {
  document.getElementById("nim").value = "";
  document.getElementById("nama").value = "";
  document.getElementById("jurusan").value = "";
  editId = null;
}

async function editMahasiswa(index) {
  const mahasiswaToEdit = mahasiswa.find((m) => m.id === index);
  if (mahasiswaToEdit) {
    document.getElementById("nim").value = mahasiswaToEdit.nim;
    document.getElementById("nama").value = mahasiswaToEdit.nama;
    document.getElementById("jurusan").value = mahasiswaToEdit.jurusan;

    console.log(mahasiswaToEdit);

    try {
      const res = await fetch(`http://localhost:5000/api/mahasiswa/${index}`, {
        method: PUT,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mahasiswaToEdit),
      });

      if (!res.ok) throw new Error("Gagal simpan data");

      const result = await res.json();
      console.log("Data berhasil disimpan:", result);

      loadData();
      renderData();
    } catch (err) {
      console.error("Error saat kirim data:", err);
    }
  } else {
    console.error("Mahasiswa tidak ditemukan:", index);
  }
}

loadData();

// fetch('http://localhost:5000/api/mahasiswa/')
//       .then(res => res.json())
//       .then(data => {
//         const tbody = document.getElementById('mahasiswaTableBody');
//         data.forEach(m => {
//           const row = document.createElement('tr');
//           row.innerHTML = `
//             <td>${m.id}</td>
//             <td>${m.nim}</td>
//             <td>${m.nama}</td>
//             <td>${m.jurusan}</td>
//           `;
//           tbody.appendChild(row);
//         });
//       })
//       .catch(err => {
//         console.error('Gagal fetch data:', err);
//       });
