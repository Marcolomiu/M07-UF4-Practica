const express = require('express');
const router = express.Router();
const joiSchemaValidation = require('../middlewares/joiSchemaValidation');
const busquedasSchemas = require('../models/joi/busquedasSchemas');
const busquedasController = require('../controllers/busquedasController');

router.post('/create', 
    joiSchemaValidation.validate(busquedasSchemas.create, 'body'), busquedasController.create
);
router.put('/update/:id', 
    joiSchemaValidation.validate(busquedasSchemas.id, 'params'),
    joiSchemaValidation.validate(busquedasSchemas.update, 'body'), busquedasController.update
);
router.delete('/delete/:id', joiSchemaValidation.validate(busquedasSchemas.id, 'params'), busquedasController.delete);
router.get('/get/:id', joiSchemaValidation.validate(busquedasSchemas.id, 'params'), busquedasController.getById);
router.get('/getAll', busquedasController.getAll);
router.get('/between', joiSchemaValidation.validate(busquedasSchemas.date, 'query'), busquedasController.between);
router.get('/question', joiSchemaValidation.validate(busquedasSchemas.question, 'query'), busquedasController.question);

module.exports = router;