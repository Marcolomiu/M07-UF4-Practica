const Joi = require('joi');

module.exports.login = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

module.exports.register = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});