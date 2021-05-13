const axios = require('axios');
const Auth = require(`../models/database/authModel`);
const crudRepository = require(`../database/crudRepository`);
const { response } = require('express');
const mongoose = require('mongoose');

module.exports = {

	findOne: async (dataFromController) => {
        const response = { status: false };
        try {
            const data = {
                findQuery: dataFromController,
                model: Auth,
                projection: { __v: false }
            };

            const responseFromDB = await crudRepository.findOne(data);
            if (responseFromDB.status === 200) {
                response.result = responseFromDB.result;
            }
            response.status = responseFromDB.status;
        } catch (error) {
            response.error = error;
            console.log(`ERROR-authService-findOne: ${error}`);
        }
        return response;
    },

    register: async (dataFromController) => {
        const response = { status: false };
        try {

			

            const auth = new Auth(dataFromController);
            const responseFromDB = await crudRepository.save(auth);
            if (responseFromDB.status) {
                response.status = true;
                response.result = responseFromDB.result;
            } else {
                response.error = responseFromDB.error;
            }
        } catch (error) {
            response.error = error;
            console.log(`ERROR-authService-register: ${error}`);
        }
        return response;
    }
}