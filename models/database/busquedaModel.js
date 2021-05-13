const mongoose = require('mongoose');

const busquedaSchema = mongoose.Schema({
    userId: String,
    date: Date
});

module.exports = mongoose.model('Busqueda', busquedaSchema);