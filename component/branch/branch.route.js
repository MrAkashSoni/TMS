const router = require('express').Router();
const { verify } = require('../../common_functions/verifyToken');
const fileUpload = require('../../helper/fileUpload');

const {
    addUpdateBranch,
    activeBranchToggle,
} = require('./branch.controller');

router.post('/addUpdateBranch', verify,
    fileUpload.fields([{
        name: 'visitingCard',
        maxCount: 1,
    }, {
        name: 'panCard',
        maxCount: 1,
    }, {
        name: 'aadharCard',
        maxCount: 2,
    }]),
    addUpdateBranch);

router.patch('/:id/activeBranchToggle', verify, activeBranchToggle);

module.exports = router;
