const express = require('express');
const responses = require('../../network/responses');
const controller = require('./index');

const router = express.Router();

router.get('/login', login);


async function login(req, res, next){
    try {
        const token = await controller.login(req.body.username, req.body.password);
        responses.success(req, res, token, 200);
    } catch (error) {
        next(error);
    }
    
};

module.exports = router;