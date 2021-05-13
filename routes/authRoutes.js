const express = require('express');
const router = express.Router();

const joiSchemaValidation = require('../middlewares/joiSchemaValidation');
const authController = require('../controllers/authController');
const authSchemas = require('../models/joi/authSchemas');

router.post('/login',
    joiSchemaValidation.validate(authSchemas.login, 'body'),
    authController.login
);

router.post('/register',
    joiSchemaValidation.validate(authSchemas.register, 'body'),
    authController.register
);

module.exports = router;