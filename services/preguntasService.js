const axios = require('axios');
const Pregunta = require(`../models/database/preguntaModel`);
const crudRepository = require(`../database/crudRepository`);
const { response } = require('express');
const mongoose = require('mongoose');

module.exports = {

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
            if (dataFromController.title) data.updateQuery.title = dataFromController.title;
            if (dataFromController.sinopsis) data.updateQuery.sinopsis = dataFromController.sinopsis;
            if (dataFromController.director) data.updateQuery.director = dataFromController.director;
            if (dataFromController.releasedDate) data.updateQuery.releasedDate = dataFromController.releasedDate;
            if (dataFromController.actors) data.updateQuery.actors = dataFromController.actors;

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

            const responseFromDB = await crudRepository.findOne(data);
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

    findAll: async (dataFromController) => {
        const response = { status: false };
        try {
            const data = {
                findQuery: {},
                model: Pregunta,
                projection: { __v: false },
            };

            if(dataFromController.skip && dataFromController.limit) {
                data.skip = dataFromController.skip;
                data.limit = dataFromController.limit;
            }

            const responseFromDB = await crudRepository.findAll(data);
            if (responseFromDB.status === 200) {
                response.result = responseFromDB.result;
            }
            response.status = responseFromDB.status;
        } catch (error) {
            response.error = error;
            console.log(`ERROR-preguntasService-findAll: ${error}`);
        }
        return response;
    }
}