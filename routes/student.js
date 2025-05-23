var express = require('express');
var router = express.Router();
// var studentsRoute = require('../controller/student');
// var addStudent = require('../controller/student');
// var editStudent = require('..//controller/student')

var student = require('../controller/student');

router.get('/', student.getData);

router.post('/addStudent', student.addStudent);

router.put('/addStudent',student.editStudent);

router.post('/deleteStudent',student.deleteStudent);

module.exports = router;