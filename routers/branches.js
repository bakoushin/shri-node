const express = require('express');
const router = express.Router({mergeParams: true});

const commitsRouter = require('./commits');
const filesRouter = require('./files');

router.use('/commits', commitsRouter);
router.use('/files', filesRouter);
router.use('/', filesRouter);

module.exports = router;