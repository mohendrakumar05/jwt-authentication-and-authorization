var express = require('express');
var router = express.Router();
var {common} = require('../services/commonservice')
var  { checkValidUserOrNot } = require('../middleware/check-auth');

router.post('/save',checkValidUserOrNot ,function (req, res) {
  common[req.body.function_name](req.body, function (err, result) {
    if (err) {
      res.json({ success: false, err })
    } else {
      res.json({ success: true, result })
    }
  });
});

router.put('/update',checkValidUserOrNot, function (req, res) {
  common[req.body.function_name](req.body, function (err, result) {
    if (err) {
      res.json({ success: false, err })
    } else {
      res.json({ success: true, result })
    }
  });
});

router.get('/getFunction/:function_name/:p1?/:p2?/:p3?/:p4?/:p5?', checkValidUserOrNot,function (req, res) {
  common[req.params.function_name](req.params, function (err, result) {
    console.log(err,result)
    if (err) {
      res.json({ success: false, err })
    } else {
      res.json({ success: true, result })
    }
  });
});

router.delete('/deleteFunction/:function_name/:p1', checkValidUserOrNot,function (req, res) {
  common[req.params.function_name](req.params, function (err, result) {
    if (err) {
      res.json({ success: false, err })
    } else {
      res.json({ success: true, result })
    }
  });
});

module.exports = router
