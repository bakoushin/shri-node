const express = require('express');
const router = express.Router({mergeParams: true});
const path = require('path');
const static = express.static(path.join(__dirname, '..', 'static'));

router.get('/*', static, (req, res) => {
  res.status(404).end();
});

module.exports = router;