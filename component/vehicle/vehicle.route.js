const router = require('express').Router();
const { verify } = require('../../common_functions/verifyToken');
const fileUpload = require('../../helper/fileUpload');

const {
    addUpdateVehicle,
} = require('./vehicle.controller');

router.get('/addUpdateVehicle', verify, fileUpload.single('rc_card'), addUpdateVehicle);

module.exports = router;
