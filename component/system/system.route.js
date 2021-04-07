const router = require('express').Router();

const {
    getConstantData,
} = require('./system.controller');

router.get('/getConstantData', getConstantData);

module.exports = router;
