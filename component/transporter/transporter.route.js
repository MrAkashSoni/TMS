const router = require('express').Router();
const { verifyAdmin } = require('../../common_functions/verifyToken');

const {
    addTransporter,
} = require('./transporter.controller');

router.get('/addTransporter', verifyAdmin, addTransporter);

module.exports = router;
