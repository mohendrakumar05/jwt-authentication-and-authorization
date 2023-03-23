var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var db = require("../dbconnection");

const auth = {
  userSignin: function (data, callback) {
    var { email, password } = data;

    try {
      db.getConnection(function (err, connection) {
        if (err) throw err;
        connection.query(
          `select u_id, first_name, last_name, email, password from user where email = ?`,
          [email],
          function (err, result) {
            try {
              connection.release();
              if (err) throw err;
              console.log(result);
              if (result.length < 1) {
                return callback(null, {
                  success: false,
                  message: "User not found!",
                });
              } else {
                const passwordIsValid = bcrypt.compareSync(
                  password,
                  result[0].password
                );
                console.log(passwordIsValid);
                if (!passwordIsValid) {
                  callback(null, {
                    success: false,
                    message: "Invalid Password!",
                  });
                } else {
                  let payload_obj = {
                    first_name: result[0].first_name,
                    last_name: result[0].last_name,
                    email: result[0].email,
                    u_id: result[0].u_id,
                  };
                  var token = jwt.sign(
                    payload_obj,
                    "process.env.JwtPrivateKey",
                    { expiresIn: 86400 }
                  );
                  console.log(token);
                  callback(null, { token, success: true });
                }
              }
            } catch (query_err) {
              return callback(query_err);
            }
          }
        );
      });
    } catch (connection_err) {
      return callback(connection_err);
    }
  },

  userSignup: function (data, callback) {
    let { first_name, last_name, email, password } = data;

    var salt = bcrypt.genSaltSync(10);
    var new_pass = bcrypt.hashSync(data.password, salt);
    try {
      db.getConnection(function (err, connection) {
        if (err) throw err;
        connection.query(
          `insert into user(first_name, last_name, email, password) values(?, ?, ?, ?)`,
          [first_name, last_name, email, new_pass],
          function (err, result) {
            try {
              connection.release();
              if (err) throw err;
              return callback(null, result);
            } catch (query_err) {
              return callback(query_err);
            }
          }
        );
      });
    } catch (connection_err) {
      return callback(connection_err);
    }
  },
};

module.exports.auth = auth;
