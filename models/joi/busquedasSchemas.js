const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)

module.exports.create = Joi.object({
    userId: Joi.objectId().required(),
    date: Joi.date().required()
});

module.exports.update = Joi.object({
    userId: Joi.objectId().optional(),
    date: Joi.date().optional()
});

module.exports.id = Joi.object({
    id: Joi.objectId()
});

module.exports.date = Joi.object({
    start: Joi.date().required(),
    end: Joi.date().required()
});

module.exports.question = Joi.object({
    amount: Joi.number().required(),
    category: Joi.string().optional(),
    difficulty: Joi.string().optional(),
    type: Joi.string().optional
})