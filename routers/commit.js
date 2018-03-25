const express = require('express');
const router = express.Router({mergeParams: true});

router.use("/files", require('./files'));
router.use("/", require('./files'));

module.exports = router;