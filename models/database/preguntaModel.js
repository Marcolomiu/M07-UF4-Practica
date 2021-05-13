const mongoose = require(`mongoose`);

const preguntaSchema = mongoose.Schema({
    question: String,
    category: String,
    difficulty: String,
    type: String,
    correct_answer: String,
    incorrect_answers: [{ type: String}],
    busqueda_id: String,
});

module.exports = mongoose.model(`Preguntas`, preguntaSchema);