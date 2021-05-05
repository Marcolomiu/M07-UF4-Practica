const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)

module.exports = {

    id: Joi.object({
        id: Joi.objectId(),
    }),

    create: Joi.object({
        category: Joi.string().required(),
        type: Joi.string().required(),
        difficulty: Joi.string().required(),
        question: Joi.string().required(),
        correct_answer: Joi.string().required(),
        incorrect_answers: Joi.array().items(
            Joi.string().required()
        ),
        busqueda_id: Joi.string().optional()
    }),

    update: Joi.object({
        category: Joi.string().required(),
        type: Joi.string().required(),
        difficulty: Joi.string().required(),
        question: Joi.string().required(),
        correct_answer: Joi.string().required(),
        incorrect_answers: Joi.array().items(
            Joi.string().required()
        ),
        busqueda_id: Joi.string().optional()
    }),
}