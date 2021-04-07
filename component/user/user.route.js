const router = require('express').Router();
const { verify } = require('../../common_functions/verifyToken');

const {
    activeUserToggle,
} = require('./user.controller');

router.patch('/:id/activeUserToggle', verify, activeUserToggle);

module.exports = router;
