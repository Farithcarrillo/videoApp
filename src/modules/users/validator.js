const {check} = require('express-validator');
const{ validateResult } = require('../../network/validateHelper')

const validateCreate = [
    check('name')
        .exists()
        .not()
        .isEmpty()
        .isString(),

    check('username')
        .exists()
        .not()
        .isEmpty()
        .isString(),

    check('password')
        .exists()
        .not()
        .isEmpty()
        .isString(),
    (req, res, next) => {
        validateResult(req, res, next)
    }

]

module.exports = { validateCreate }