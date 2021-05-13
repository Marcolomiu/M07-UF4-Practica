const axios = require('axios');
const Pregunta = require(`../models/database/preguntaModel`);
const crudRepository = require(`../database/crudRepository`);
const { response } = require('express');
const mongoose = require('mongoose');

module.exports = {

    getAll: async (dataFromController) => {
        const response = { status: false };
        try {
            const data = {
                findQuery: {},
                model: Pregunta,
                projection: { __v: false }
            };

            if (dataFromController.skip && dataFromController.limit) {
                data.skip = dataFromController.skip;
                data.limit = dataFromController.limit;
            }

            const responseFromDB = await crudRepository.find(data);
            if (responseFromDB.status === 200) {
                response.result = responseFromDB.result;
            }
            response.status = responseFromDB.status;
        } catch (error) {
            response.error = error;
            console.log(`ERROR-preguntasService-getAll: ${error}`);
        }
        return response;
    },

    create: async (dataFromController) => {
        const response = { status: false };
        try {
            const pregunta = new Pregunta(dataFromController);
            const responseFromDB = await crudRepository.save(pregunta);
            if (responseFromDB.status) {
                response.status = true;
                response.result = responseFromDB.result;
            } else {
                response.error = responseFromDB.error;
            }
        } catch (error) {
            response.error = error;
            console.log(`ERROR-preguntasService-create: ${error}`);
        }
        return response;
    },

    update: async (dataFromController) => {
        const response = { status: false };
        try {
            const data = {
                findQuery: {
                    _id: mongoose.Types.ObjectId(dataFromController.id)
                },
                model: Pregunta,
                projection: { __v: false },
                updateQuery: {}
            };
            if (dataFromController.question) data.updateQuery.question = dataFromController.question;
            if (dataFromController.category) data.updateQuery.category = dataFromController.category;
            if (dataFromController.difficulty) data.updateQuery.difficulty = dataFromController.difficulty;
            if (dataFromController.type) data.updateQuery.type = dataFromController.type;
            if (dataFromController.correct_answer) data.updateQuery.correct_answer = dataFromController.correct_answer;
            if (dataFromController.incorrect_answers) data.updateQuery.incorrect_answers = dataFromController.incorrect_answers;
            if (dataFromController.busqueda_id) data.updateQuery.busqueda_id = dataFromController.busqueda_id;

            const responseFromDB = await crudRepository.findOneAndUpdate(data);
            if (responseFromDB.status === 200) {
                response.result = responseFromDB.result;
            }
            response.status = responseFromDB.status;
        } catch (error) {
            response.error = error;
            console.log(`ERROR-preguntasService-update: ${error}`);
        }
        return response;
    },

    delete: async (dataFromController) => {
        const response = { status: false };
        try {
            const data = {
                findQuery: {
                    _id: mongoose.Types.ObjectId(dataFromController.id)
                },
                model: Pregunta,
                projection: { __v: false },
            };

            const responseFromDB = await crudRepository.findOneAndDelete(data);
            if (responseFromDB.status === 200) {
                response.result = responseFromDB.result;
            }
            response.status = responseFromDB.status;
        } catch (error) {
            response.error = error;
            console.log(`ERROR-preguntasService-delete: ${error}`);
        }
        return response;
    },

    getById: async (dataFromController) => {
        const response = { status: false };
        try {
            const data = {
                findQuery: {
                    _id: mongoose.Types.ObjectId(dataFromController.id)
                },
                model: Pregunta,
                projection: { __v: false },
            };

            const responseFromDB = await crudRepository.findById(data);
            if (responseFromDB.status === 200) {
                response.result = responseFromDB.result;
            }
            response.status = responseFromDB.status;
        } catch (error) {
            response.error = error;
            console.log(`ERROR-preguntasService-getById: ${error}`);
        }
        return response;
    },

    findSpecific: async (dataFromController) => {
        const response = { status: false };
        try {
            const data = {
                findQuery: dataFromController,
                model: Pregunta,
                projection: { __v: false }
            };

            const responseFromDB = await crudRepository.findSpecific(data);
            if (responseFromDB.status === 200) {
                response.result = responseFromDB.result;
            }
            response.status = responseFromDB.status;
        } catch (error) {
            response.error = error;
            console.log(`ERROR-preguntasService-findSpecific: ${error}`);
        }
        return response;
    }
}