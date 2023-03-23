const jwt = require('jsonwebtoken');

var checkValidUserOrNot = (req, res, next) => {
    try {
        console.log("req check auth: ", req);
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, 'process.env.JwtPrivateKey');
        req.userData = decoded;
        if ( req.userData != "") {
            next();
        }
        else {
            return res.status(401).json({
                message: 'Auth failed',
                success: false
            });
        }
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed',
            success: false
        });
    }
};


module.exports.checkValidUserOrNot = checkValidUserOrNot