
const async = require('async');
var mysqldbservice = require('./mysqldbservice');
var { ConfigParams } = require('../global/db_config');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const auth = {

    userSignin : function (data, callback) {
        var { email, password } = data;
        var query1 = `select u_id, first_name, last_name, email, password from user `;
        var whereObj1 = ` `;
        if(password){   
            whereObj1 += `where email = '${email}'`
        }
        query1 += whereObj1;

        mysqldbservice.executeQueryWithParameters(ConfigParams.DB_KEY, query1, null, (err, row) => {
           try{
            console.log('row servicE: ', row);
            console.log('row servicE: ', row.data.length);
           
            if(err){
                callback(err);
            }else if(row.data.length < 1){
                callback(null, { success: false, message : 'User not found!'});
            }else{
                const passwordIsValid = bcrypt.compareSync(
                    password,
                    row.data[0].password
                  );
                    console.log(passwordIsValid)
                  if (!passwordIsValid) {
                    callback(null, { success: false, message: "Invalid Password!"})
                  }else{
                    
                  let payload_obj = {
                    first_name : row.data[0].first_name,
                    last_name : row.data[0].last_name,
                    email : row.data[0].email,
                    u_id : row.data[0].u_id,

                  }
                  var token = jwt.sign(payload_obj, 'process.env.JwtPrivateKey', { expiresIn: 86400});
                  console.log(token);
                  callback(null, { token, success: true })
                  }
            }   
           }catch(err) {
            callback(err);
           }
            
        })


    },

    userSignup : function (data, callback) {
        let { first_name, last_name, email, password } = data;
        
        var salt = bcrypt.genSaltSync(10)
        

        let signupDetails = { first_name, last_name, email, password: bcrypt.hashSync(data.password, salt)}
        if(signupDetails){
            let insertQueryParamObj = mysqldbservice.getInsertClauseWithParams(signupDetails, 'user');
            console.log('insertQueryParamObj: ', insertQueryParamObj);
            mysqldbservice.executeQueryWithParameters(ConfigParams.DB_KEY, insertQueryParamObj.query, insertQueryParamObj.params, (err, row) => {
                console.log('row servicE: ', row);

                if(err){
                    callback(err);
                }else{
                    callback(null, row);
                }
            })
        }

    },

    userSignout : function (data, callback) {

    }
}


module.exports.auth = auth;