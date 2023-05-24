const {check} = require('express-validator');
const{ validateResult } = require('../../network/validateHelper')

const validateCreate = [
    check('title')
        .exists()
        .not()
        .isEmpty()
        .isString(),

    check('description')
        .exists()
        .not()
        .isEmpty()
        .isString(),

    check('credits')
        .exists()
        .not()
        .isEmpty()
        .isString(),
    (req, res, next) => {
        validateResult(req, res, next)
    }

]

module.exports = { validateCreate }