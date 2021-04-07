const router = require('express').Router();

const {
    login,
    addUpdateUser,
} = require('./auth.controller');

router.post('/login', login);
router.post('/addUpdateUser', addUpdateUser);

module.exports = router;
