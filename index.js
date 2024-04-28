require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Middleware para parsear JSON
app.use(express.json());

// Función para generar un ID corto único
function generateShortId() {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let shortId = '';
    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        shortId += characters[randomIndex];
    }
    return shortId;
}

// Ruta para acortar una URL
app.post('/api', (req, res) => {
    const { url } = req.body;
    if (!url) {
        return res.status(400).json({ error: 'URL missing in request body' });
    }

    // Generar un ID corto único
    let shortId = generateShortId();
    // Verificar si el ID corto ya existe, generar uno nuevo si es necesario
    let bdIds = ''; //consultar  a la base de datos.
    if (bdIds) {
        shortId = generateShortId();
    } else {
      // Guardar la URL en la base de datos la original como la acortada
    }

    const shortUrl = `http://localhost:${port}/${shortId}`;
    res.json({ originalUrl: url, shortUrl });
});

// Ruta para redireccionar a la URL original
app.get('/:shortId', (req, res) => {
    const { shortId } = req.params;
    const originalUrl = ''; //consultar a la base de datos
    if (originalUrl) {
        res.redirect(originalUrl);
    } else {
        res.status(404).json({ error: 'Short URL not found' });
    }
});


app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
