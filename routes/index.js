var express = require('express');
var router = express.Router();

var loginContoller = require('../controller/index');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Node js + Express js' });
});
router.post('/',loginContoller.login);
router.post('/email', loginContoller.email);

module.exports = router;
