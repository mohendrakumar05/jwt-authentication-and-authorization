var db = require("../dbconnection");

const checkDuplicateEmailOrNot = async (req, res, next) => {
  try {
    let email = req.body.email;
    if (email) {
      try {
        db.getConnection(function (err, connection) {
          if (err) throw err;
          connection.query(
            `SELECT count(*) as total_count FROM user where email = ? group by email`,
            [email],
            function (err, result) {
              try {
                connection.release();
                if (err) {
                  return res.json({
                    message: "Auth Failed",
                    success: false,
                  });
                }
                if (result.length > 0) {
                  return res.json({
                    message: "Email already exists!",
                    success: false,
                  });
                }
                next();
              } catch (query_err) {
                return callback(query_err);
              }
            }
          );
        });
      } catch (connection_err) {
        return callback(connection_err);
      }
    } else {
      return res.json({
        message: "Auth failed",
        success: false,
      });
    }
  } catch (err1) {
    return res.json({
      message: "Auth failed",
      success: false,
    });
  }
};

module.exports.checkDuplicateEmailOrNot = checkDuplicateEmailOrNot;
