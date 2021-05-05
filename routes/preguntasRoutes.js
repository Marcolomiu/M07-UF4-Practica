const express = require('express');
const router = express.Router();

const preguntasController = require('../controllers/preguntasController');
const joiSchemaValidation = require('../middlewares/joiSchemaValidation');
const preguntasSchemas = require('../models/joi/preguntasSchemas');
const tokenValidation = require('../middlewares/tokenValidation');

router.post('/create',
    joiSchemaValidation.validate(preguntasSchemas.create, `body`),
    preguntasController.create //Aquí podria utilitzar un altre controller pero així tinc els exercicis agrupats
);

router.put('/update/:id',
    tokenValidation.validate,
    joiSchemaValidation.validate(preguntasSchemas.id, 'params'),
    joiSchemaValidation.validate(preguntasSchemas.update, 'body'),
    preguntasController.update
);

router.delete('/delete/:id', 
    joiSchemaValidation.validate(preguntasSchemas.id, 'params'),
    preguntasController.delete
);

router.get('/get/:id', 
    joiSchemaValidation.validate(preguntasSchemas.id, 'params'),
    preguntasController.getById
);

module.exports = router;