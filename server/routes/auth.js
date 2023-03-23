var express = require('express');
var router = express.Router();

var { checkDuplicateEmailOrNot } = require('../middleware/verifyUserAuth')
var { auth } = require('../models/auth')

router.post('/signup',checkDuplicateEmailOrNot, function (req, res) {
    auth[req.body.function_name](req.body, function(err, result) {
        if(err){
            res.json({success: false, err})
        }else {
            res.json({ success: true, result})
        }
    });
});


router.post('/signin', function (req, res) {
    console.log("signin");
    auth[req.body.function_name](req.body, function(err, result) {
        console.log("signin", req.body);
        if(err){
            res.json({success: false, err})
        }else {
            if(result.success){
                res.json({ success: true, token: result.token})
            }else{
                res.json({ success: false, message : result.message})
            }
        }
    });
});




module.exports = router
