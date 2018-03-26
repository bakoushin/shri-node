const express = require('express');
const router = new express.Router({mergeParams: true});
const path = require('path');
const expressStatic = express.static(path.join(__dirname, '..', 'static'));

router.get('/*', expressStatic, (req, res) => {
  res.status(404).end();
});

module.exports = router;
