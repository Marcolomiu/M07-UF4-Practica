const authService = require("../services/authService");
const jwt = require('jsonwebtoken');

module.exports.login = async function(req, res) {
    const response = { status: 500, msg: 'Internal server error' };
    try {
        const data = req.body;
        const responseFromService = await authService.findOne(data);
        if (responseFromService.status === 200) {
            response.status = responseFromService.status;
            const token = jwt.sign(
                {userId: responseFromService.result._id},
                process.env.SECRET_KEY,
                {expiresIn: '1h'}
            );
            response.body = {token};
            response.msg = 'User authenticated';
        } else if (responseFromService.status === 404) {
            response.msg = 'Invalid credentials';
            response.status = 400;
        }
    } catch (err) {
        response.msg = err;
        console.log(`ERROR-authController-login: ${err}`);
    }
    res.status(response.status).send(response);
}

module.exports.register = async function(req, res) {
    const response = { status: 500, msg: 'Server Error' };

    try {

        /*
        let password = bcrypt.hash(req.body.password);

        const data = {
            email: req.body.email,
            password: password
        }
        */


        const data = req.body;
        const responseFromService = await authService.register(data);
        if (responseFromService.status) {
            response.status = 201;
            response.msg = 'Ask created succerssfully!';
            response.body = responseFromService.result; //doc guardat
        } else {
            response.msg = responseFromService.error;
        }
    } catch (err) {
        response.msg = err;
        console.log(`ERROR-authController-create: ${err}`);
    }
    res.status(response.status).send(response);
}