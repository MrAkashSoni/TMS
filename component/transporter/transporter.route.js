const router = require('express').Router();
const { verify } = require('../../common_functions/verifyToken');

const {
    addUpdateTransporter,
    activeTransporterToggle,
} = require('./transporter.controller');

router.post('/addUpdateTransporter', verify, addUpdateTransporter);
router.patch('/:id/activeTransporterToggle', verify, activeTransporterToggle);

module.exports = router;
