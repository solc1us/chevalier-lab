require('dotenv').config();
const express = require('express');
const cors = require('cors')
const mahasiswaRoutes = require('./routes/mahasiswaRoutes')
const db = require('./config/db');
require('./models')
const Mahasiswa = require('./models/mahasiswaModel');

const app = express();

const path = require('path');

// Setup view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Biar file CSS/JS bisa diakses
app.use(express.static('public'));

app.get('/mahasiswa', async (req, res) => {
  const data = await Mahasiswa.findAll();
  console.log(data); // Debug: pastiin datanya bener
  res.render('mahasiswa', { data });
});

//

app.use(cors());
app.use(express.json());
app.use('/api/mahasiswa', mahasiswaRoutes);

const PORT = process.env.PORT || 5000;

db.authenticate().then(() => {
  console.log('Connected to MySQL');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
}).catch(err => console.error('Unable to connect to DB: ', err))