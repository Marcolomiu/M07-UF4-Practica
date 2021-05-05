const mongoose = require(`mongoose`);

const preguntaSchema = mongoose.Schema({
    question: String,
    category: String,
    difficulty: String,
    type: String,
    correct_anwwer: String,
    incorrect_answers: [{ type: String}],
    busqueda_id: String,
});

module.exports = mongoose.model(`Pregunta`, preguntaSchema);