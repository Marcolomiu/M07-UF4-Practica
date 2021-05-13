const axios = require('axios');
const crudRepository = require('../database/crudRepository');
const Busqueda = require('../models/database/busquedaModel');
const Pregunta = require('../models/database/preguntaModel');
const mongoose = require('mongoose');
const jwt = require(`jsonwebtoken`);

module.exports.create = async (dataFromController) => {
    const responseObj = { status: false };
    try {
        const busqueda = new Busqueda(dataFromController);
        console.log(dataFromController);
        const responseFromRepository = await crudRepository.save(busqueda);
        if (responseFromRepository.status) {
            responseObj.result = responseFromRepository.result;
            responseObj.status = true;
        }
    } catch (error) {
        responseObj.error = error;
        console.log(`ERROR-busquedaService-create: ${error}`);
    }
    return responseObj;
};

module.exports.update = async (dataFromController) => {
    const response = { status: false };
    try {
        const data = {
            findQuery: {
                _id: mongoose.Types.ObjectId(dataFromController.id)
            },
            model: Busqueda,
            projection: { __v: false },
            updateQuery: {}
        };
        if (dataFromController.userId) data.updateQuery.userId = dataFromController.userId;
        if (dataFromController.date) data.updateQuery.date = dataFromController.date;

        const responseFromDB = await crudRepository.findOneAndUpdate(data);
        if (responseFromDB.status === 200) {
            response.result = responseFromDB.result;
        }
        response.status = responseFromDB.status;
    } catch (error) {
        response.error = error;
        console.log(`ERROR-service-updateBusqueda: ${error}`);
    }
    return response;
}

module.exports.delete = async (busquedaId) => {
    const response = { status: false };
    try {
        const data = {
            findQuery: {
                _id: mongoose.Types.ObjectId(busquedaId)
            },
            model: Busqueda,
            projection: { __v: false },
            DeleteQuery: {}
        };
        const responseFromDB = await crudRepository.findOneAndDelete(data);
        if (responseFromDB.status === 200) {
            response.result = responseFromDB.result;
        }
        response.status = responseFromDB.status;
    } catch (error) {
        response.error = error;
        console.log(`ERROR-service-deleteBusqueda: ${error}`);
    }
    return response;
}

module.exports.getById = async (busquedaId) => {
    const response = { status: false };
    try {
        const data = {
            findQuery: {
                _id: mongoose.Types.ObjectId(busquedaId)
            },
            model: Busqueda,
            projection: { __v: false },
            UpdateQuery: {}
        };
        const responseFromDB = await crudRepository.findOne(data);
        if (responseFromDB.status === 200) {
            response.result = responseFromDB.result;
        }
        response.status = responseFromDB.status;
    } catch (error) {
        response.error = error;
        console.log(`ERROR-service-getBusqueda: ${error}`);
    }
    return response;
}

module.exports.getAll = async () => {
    const response = { status: false };
    try {
        const data = {
            model: Busqueda,
            projection: { __v: false },
            UpdateQuery: {}
        };
        const responseFromDB = await crudRepository.find(data);
        if (responseFromDB.status === 200) {
            response.result = responseFromDB.result;
        }
        response.status = responseFromDB.status;
    } catch (error) {
        response.error = error;
        console.log(`ERROR-service-getBusqueda: ${error}`);
    }
    return response;
}

module.exports.between = async (dates) => {
    const response = { status: false };
    try {
        const data = {
            dates,
            model: Busqueda,
            projection: { __v: false },
        };
        const responseFromDB = await crudRepository.findBetween(data);
        if (responseFromDB.status === 200) {
            response.result = responseFromDB.result;
        }
        response.status = responseFromDB.status;
    } catch (error) {
        response.error = error;
        console.log(`ERROR-service-getBusqueda: ${error}`);
    }
    return response;
}

module.exports.question = async (dataFromController, token) => {
    const responseObj = { status: false };
    try {
        const responseFromApi = await axios({
            url: `https://opentdb.com/api.php?amount=${dataFromController.amount}&category=${dataFromController.category}&difficulty=${dataFromController.difficulty}&type=${dataFromController.type}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const now = new Date();
        if (!token) {
            const busqueda = new Busqueda({
                date: now
            });
            const responseFromRepository = await crudRepository.save(busqueda);
            const data = await responseFromApi.data.results;
            const result = [];
            result.push(responseFromRepository.result);
            data.forEach(element => {
                const pregunta = new Pregunta({
                    question: element.question,
                    category: element.category,
                    difficulty: element.difficulty,
                    type: element.type,
                    correct_answer: element.correct_answer,
                    incorrect_answer: element.incorrect_answer,
                    busqueda_id: busqueda._id,
                });
                result.push(pregunta);
            });
            responseObj.result = result;
            responseObj.status = true;
        } else {
            const busqueda = new Busqueda({
                date: now,
                userId: token.userId
            });
            const responseFromRepository = await crudRepository.save(busqueda);
            const data = await responseFromApi.data.results;
            data.forEach(element => {
                const pregunta = new Pregunta({
                    question: element.question,
                    category: element.category,
                    difficulty: element.difficulty,
                    type: element.type,
                    correct_answer: element.correct_answer,
                    incorrect_answer: element.incorrect_answer,
                    busqueda_id: busqueda._id,
                });
                crudRepository.save(pregunta);
            });
            if (responseFromRepository.status) {
                responseObj.result = responseFromRepository.result;
                responseObj.status = true;
            }
        }
    } catch (error) {
        responseObj.error = error;
        console.log(`ERROR-busquedaService-question: ${error}`);
    }
    return responseObj;
};