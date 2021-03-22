const router = require('express').Router();
const { verify } = require('../../common_functions/verifyToken');
const {
    test,
    login,
    registerUser,
} = require('./auth.controller');

router.get('/test', test);
router.get('/login', login);
router.get('/registerUserpo', registerUser);
router.get('/testToken', verify, test);

module.exports = router;
