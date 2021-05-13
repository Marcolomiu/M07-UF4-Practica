const express = require('express');
const router = express.Router();
const joiSchemaValidation = require('../middlewares/joiSchemaValidation');
const busquedasSchemas = require('../models/joi/busquedasSchemas');
const busquedasController = require('../controllers/busquedasController');
const tokenValidation = require('../middlewares/tokenValidation');
const checkToken = require('../middlewares/checkToken');

router.post('/create',
    tokenValidation.validate,
    joiSchemaValidation.validate(busquedasSchemas.create, 'body'),
    busquedasController.create
);
 
router.put('/update/:id',
    tokenValidation.validate,
    joiSchemaValidation.validate(busquedasSchemas.id, 'params'),
    joiSchemaValidation.validate(busquedasSchemas.update, 'body'),
    busquedasController.update
);

router.delete('/delete/:id',
    tokenValidation.validate,
    joiSchemaValidation.validate(busquedasSchemas.id, 'params'),
    busquedasController.delete
);

router.get('/get/:id',
    tokenValidation.validate,
    joiSchemaValidation.validate(busquedasSchemas.id, 'params'),
    busquedasController.getById
);

router.get('/getAll',
    tokenValidation.validate,
    busquedasController.getAll
);

router.get('/between',
    tokenValidation.validate,
    joiSchemaValidation.validate(busquedasSchemas.date, 'query'),
    busquedasController.between
);

router.get('/question',
    checkToken.validate,
    joiSchemaValidation.validate(busquedasSchemas.question, 'query'),
    busquedasController.question
);

module.exports = router;