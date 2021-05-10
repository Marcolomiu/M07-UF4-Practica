const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1/auth', require('./routes/authRoutes'));
app.use('/api/v1/pregunta', require('./routes/preguntasRoutes'));
//app.use('/api/v1/busqueda', require('./routes/busquedasRoutes'));

app.listen(3000, function() {
    console.log('Port listening 3000!');
});