const axios = require('axios');
const busquedaService = require('../services/busquedasService')

module.exports.create = async (req, res) => {
    const responseObj = { status: 500, message: 'Internal server error' };
    try {
        const data = req.body;
        const responseFromService = await busquedaService.create(data);
        if (responseFromService.status) {
            responseObj.body = responseFromService.result;
            responseObj.message = `Busqueda created successfully`;
            responseObj.status = 201;
        }
    } catch (error) {
        responseObj.error = error;
        console.log(`ERROR-busquedaController-create: ${error}`);
    }
    return res.status(responseObj.status).send(responseObj);
};

module.exports.update = async function(req, res) {
    const response = { status: 500, msg: 'Server Error' };
    try {
        const data = req.body;
        data.id = req.params.id;
        const responseFromService = await busquedaService.update(data);
        if (responseFromService.status === 200) {
            response.msg = 'Busqueda updated successfully';
            response.body = responseFromService.result;
        } else if (responseFromService.status === 404) {
            response.msg = 'Busqueda not found';
        } else {
            response.msg = responseFromService.error;
        }
        response.status = responseFromService.status;
    } catch (err) {
        response.msg = err;
        console.log(`ERROR-busquedasController-update: ${err}`);
    }
    res.status(response.status).send(response);
}

module.exports.delete = async function(req, res) {
    const response = { status: 500, msg: 'Server Error' };
    try {
        const busquedaId = req.params.id;
        const responseFromService = await busquedaService.delete(busquedaId);
        if (responseFromService.status === 200) {
            response.msg = 'Busqueda deleted successfully';
            response.body = responseFromService.result;
        } else if (responseFromService.status === 404) {
            response.msg = 'Busqueda not found';
        } else {
            response.msg = responseFromService.error;
        }
        response.status = responseFromService.status;
    } catch (err) {
        response.msg = err;
        console.log(`ERROR-busquedasController-delete: ${err}`);
    }
    res.status(response.status).send(response);
}

module.exports.getById = async function(req, res) {
    const response = { status: 500, msg: 'Server Error' };
    try {
        const busquedaId = req.params.id;
        const responseFromService = await busquedaService.getById(busquedaId);
        if (responseFromService.status === 200) {
            response.msg = 'Busqueda selected successfully';
            response.body = responseFromService.result;
        } else if (responseFromService.status === 404) {
            response.msg = 'Busqueda not found';
        } else {
            response.msg = responseFromService.error;
        }
        response.status = responseFromService.status;
    } catch (err) {
        response.msg = err;
        console.log(`ERROR-busquedasController-getById: ${err}`);
    }
    res.status(response.status).send(response);
}

module.exports.getAll = async function(req, res) {
    const response = { status: 500, msg: 'Server Error' };
    try {
        const responseFromService = await busquedaService.getAll();
        if (responseFromService.status === 200) {
            response.msg = 'All Busquedas selected successfully';
            response.body = responseFromService.result;
        } else if (responseFromService.status === 404) {
            response.msg = 'Busqueda not found';
        } else {
            response.msg = responseFromService.error;
        }
        response.status = responseFromService.status;
    } catch (err) {
        response.msg = err;
        console.log(`ERROR-busquedasController-getAll: ${err}`);
    }
    res.status(response.status).send(response);
}

module.exports.between = async function(req, res) {
    const response = { status: 500, msg: 'Server Error' };
    try {
        const dates = {
            start: req.query.start,
            end: req.query.end
        };
        const responseFromService = await busquedaService.between(dates);
        if (responseFromService.status === 200) {
            response.msg = 'Busqueda between selected successfully';
            response.body = responseFromService.result;
        } else if (responseFromService.status === 404) {
            response.msg = 'Busqueda not found';
        } else {
            response.msg = responseFromService.error;
        }
        response.status = responseFromService.status;
    } catch (err) {
        response.msg = err;
        console.log(`ERROR-busquedasController-between: ${err}`);
    }
    res.status(response.status).send(response);
}

module.exports.question = async (req, res) => {
    const responseObj = { status: 500, message: 'Internal server error' };
    try {
        const data = {
            amount: req.query.amount,
            category: req.query.category,
            difficulty: req.query.difficulty,
            type: req.query.type
        }
        if (req.query.category == undefined) data.category = "";
        if (req.query.difficulty == undefined) data.difficulty = "";
        if (req.query.type == undefined) data.type = "";
        const responseFromService = await busquedaService.question(data);
        if (responseFromService.status) {
            responseObj.body = responseFromService.result;
            responseObj.message = `Busqueda created successfully`;
            responseObj.status = 201;
        }
    } catch (error) {
        responseObj.error = error;
        console.log(`ERROR-busquedaController-question: ${error}`);
    }
    return res.status(responseObj.status).send(responseObj);
};