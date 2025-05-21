var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Node js + Express js' });
});
router.post('/',(req, res, next)=>{
  res.json({message: "post request!"})
});

module.exports = router;
