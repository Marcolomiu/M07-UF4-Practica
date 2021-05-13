const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)

module.exports = {

    getAll: Joi.object({
        page: Joi.number().integer().min(1).max(2)
    }),

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

    findSpecific: Joi.object({
        category: Joi.string().optional(),
        type: Joi.string().optional(),
        difficulty: Joi.string().optional()
    })
}