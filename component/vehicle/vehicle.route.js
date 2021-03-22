const router = require('express').Router();
const { verify } = require('../../common_functions/verifyToken');
const { test } = require('./vehicle.controller');

router.get('/test', test);
router.get('/testToken', verify, test);

module.exports = router;
