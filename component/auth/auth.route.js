const router = require('express').Router();

const {
    login,
    registerUser,
} = require('./auth.controller');

router.post('/login', login);
router.post('/registerUser', registerUser);

module.exports = router;
