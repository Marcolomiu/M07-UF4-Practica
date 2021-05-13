const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const connect = require(`./database/connect`);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connect.createConnection();

app.use('/api/v1/pregunta', require('./routes/preguntasRoutes'));
app.use('/api/v1/auth', require('./routes/authRoutes'));
app.use('/api/v1/busqueda', require('./routes/busquedasRoutes'));

app.listen(process.env.PORT, function() {
    console.log('Port listening: ' + process.env.PORT);
});