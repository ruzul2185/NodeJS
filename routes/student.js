var express = require('express');
var router = express.Router();
var studentsRoute = require('../controller/student');

router.get('/', studentsRoute);

module.exports = router;