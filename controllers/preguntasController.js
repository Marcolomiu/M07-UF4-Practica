const preguntasService = require("../services/preguntasService");

module.exports.getAll = async function(req, res) {
    const response = { status: 500, msg: 'Server Error' };
    try {
        const data = {
            skip: parseInt(req.query.skip, 0),
            limit: parseInt(req.query.limit, 10)
        }
        const responseFromService = await preguntasService.getAll(data);
        if (responseFromService.status === 200) {
            response.msg = 'Asks fetched successfully';
            response.body = responseFromService.result;
        } else if (responseFromService.status === 404) {
            response.msg = 'No asks found';
        } else {
            response.msg = responseFromService.error;
        }
        response.status = responseFromService.status;
    } catch (err) {
        response.msg = err;
        console.log(`ERROR-preguntasController-getAll: ${err}`);
    }
    res.status(response.status).send(response);
}


module.exports.create = async function(req, res) {
    const response = { status: 500, msg: 'Server Error' };

    try {
        const data = req.body;
        const responseFromService = await preguntasService.create(data);
        if (responseFromService.status) {
            response.status = 201;
            response.msg = 'Ask created succerssfully!';
            response.body = responseFromService.result; //doc guardat
        } else {
            response.msg = responseFromService.error;
        }
    } catch (err) {
        response.msg = err;
        console.log(`ERROR-preguntasController-create: ${err}`);
    }
    res.status(response.status).send(response);
}

module.exports.update = async function(req, res) {
    const response = { status: 500, msg: 'Server Error' };
    try {
        const data = req.body;
        data.id = req.params.id;
        const responseFromService = await preguntasService.update(data);
        if (responseFromService.status === 200) {
            response.msg = 'Ask updated successfully';
            response.body = responseFromService.result; //doc guardat
        } else if (responseFromService.status === 404) {
            response.msg = 'Ask not found';
        } else {
            response.msg = responseFromService.error;
        }
        response.status = responseFromService.status;
    } catch (err) {
        response.msg = err;
        console.log(`ERROR-preguntasController-update: ${err}`);
    }
    res.status(response.status).send(response);
}

module.exports.delete = async function(req, res) {
    const response = { status: 500, msg: 'Server Error' };
    try {
        const data = req.body;
        data.id = req.params.id;
        const responseFromService = await preguntasService.delete(data);
        if (responseFromService.status === 200) {
            response.msg = 'Ask deleted successfully';
            response.body = responseFromService.result; //doc guardat
        } else if (responseFromService.status === 404) {
            response.msg = 'Ask not found';
        } else {
            response.msg = responseFromService.error;
        }
        response.status = responseFromService.status;
    } catch (err) {
        response.msg = err;
        console.log(`ERROR-preguntasController-delete: ${err}`);
    }
    res.status(response.status).send(response);
}

module.exports.getById = async function(req, res) {
    const response = { status: 500, msg: 'Server Error' };
    try {
        const data = req.body;
        data.id = req.params.id;
        const responseFromService = await preguntasService.getById(data);
        if (responseFromService.status === 200) {
            response.msg = 'Ask fetched successfully';
            response.body = responseFromService.result; //doc guardat
        } else if (responseFromService.status === 404) {
            response.msg = 'Ask not found';
        } else {
            response.msg = responseFromService.error;
        }
        response.status = responseFromService.status;
    } catch (err) {
        response.msg = err;
        console.log(`ERROR-preguntasController-getById: ${err}`);
    }
    res.status(response.status).send(response);
}

module.exports.findSpecific = async function(req, res) {
    const response = { status: 500, msg: 'Server Error' };
    try {
        const data = {};
        for (let [key, value] of Object.entries(req.query)) {
            data[key] = value;
        }
        const responseFromService = await preguntasService.findSpecific(data);
        if (responseFromService.status === 200) {
            response.msg = 'Ask fetched successfully';
            response.body = responseFromService.result;
        } else if (responseFromService.status === 404) {
            response.msg = 'Ask not found';
        } else {
            response.msg = responseFromService.error;
        }
        response.status = responseFromService.status;
    } catch (err) {
        response.msg = err;
        console.log(`ERROR-preguntasController-getById: ${err}`);
    }
    res.status(response.status).send(response);
}