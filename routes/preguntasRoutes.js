const express = require('express');
const router = express.Router();

const preguntasController = require('../controllers/preguntasController');
const joiSchemaValidation = require('../middlewares/joiSchemaValidation');
const preguntasSchemas = require('../models/joi/preguntasSchemas');
const tokenValidation = require('../middlewares/tokenValidation');

router.get('/',
    //tokenValidation.validate,
    joiSchemaValidation.validate(preguntasSchemas.getAll, 'query'),
    preguntasController.getAll
);

router.post('/create',
    //tokenValidation.validate,
    joiSchemaValidation.validate(preguntasSchemas.create, 'body'),
    preguntasController.create
);

router.put('/update/:id',
    //tokenValidation.validate,
    joiSchemaValidation.validate(preguntasSchemas.id, 'params'),
    joiSchemaValidation.validate(preguntasSchemas.update, 'body'),
    preguntasController.update
);

router.delete('/delete/:id',
    //tokenValidation.validate,
    joiSchemaValidation.validate(preguntasSchemas.id, 'params'),
    preguntasController.delete
);

router.get('/get/:id',
    //tokenValidation.validate,
    joiSchemaValidation.validate(preguntasSchemas.id, 'params'),
    preguntasController.getById
);

router.get('/getSpecific',
    joiSchemaValidation.validate(preguntasSchemas.findSpecific, 'query'),
    preguntasController.findSpecific
);

module.exports = router;