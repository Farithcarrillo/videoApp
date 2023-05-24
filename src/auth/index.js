const jwt = require('jsonwebtoken');
const config = require('../config');
const error = require('../middleware/error');
const secret = config.jwt.secret;

function assignToken(data) {
    return jwt.sign(data, secret);
}

function verifyToken(token) {
    return jwt.verify(token, secret);
}

const checkToken = {
    confirmToken: function (req, id, action) {
        const decoded = decodeHeader(req);
        process.env.USERID = decoded.id;
        if (action=="delete") {
            if (decoded.id !== id) {
                throw error("No tienes privilegios para ejecutar esta accion", 401)
            }
        }   
    }
};

function getToken(authorization) {
    if (!authorization) {
        throw error('No viene Token', 401);
    }

    if (authorization.indexOf('Bearer') === -1) {
        throw error('Formato invalido', 401);
    }

    const token = authorization.replace('Bearer ', '');
    return token;
}

function decodeHeader(req) {
    const authorization = req.headers.authorization || '';
    const token = getToken(authorization);
    const decoded = verifyToken(token);

    req.user = decoded;

    return decoded;
}

module.exports = {
    assignToken,
    checkToken
}