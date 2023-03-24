
const async = require('async');
var mysqldbservice = require('./mysqldbservice');
var { ConfigParams } = require('../global/db_config');


var common = {

  saveUserData: function (data, callback) {
    console.log(data);
    let { first_name, last_name, email, password } = data
    let userDetails = {first_name, last_name, email, password}
    if (userDetails) {
      let insertQueryParamobj = mysqldbservice.getInsertClauseWithParams(userDetails, 'user');
      console.log(insertQueryParamobj);
      mysqldbservice.executeQueryWithParameters(ConfigParams.DB_KEY, insertQueryParamobj.query, insertQueryParamobj.params,
        (err, row) => {
          console.log(row)
          if (err) {
            callback(err)
            return;
          } else {
            callback(null, row)
          }
        })
    }
  },

  updateUserData: function (data, callback) {
    let { u_id, first_name, last_name, gender, date_of_birth, email, contact } = data
    let userDetails = { u_id, first_name, last_name, gender, date_of_birth, email, contact }
    if (userDetails) {
      let updateQueryParamobj = mysqldbservice.getUpdateQueryAndparams(userDetails, { u_id }, 'user');
      mysqldbservice.executeQueryWithParameters(ConfigParams.DB_KEY, updateQueryParamobj.query, updateQueryParamobj.params,
        (err, row) => {
          console.log(row)
          if (err) {
            callback(err)
            return;
          } else {
            callback(null, row)
          }
        })
    }
  },

  userList: function (param, callback) {
    let query = `SELECT * FROM user ORDER BY first_name , last_name`
    mysqldbservice.executeQueryWithParameters(ConfigParams.DB_KEY, query, null, callback)
  },

  deleteSingleUserData : function(param, callback) {
    console.log(param);
    let u_id = param.p1;
    if(u_id){
      let deleteQueryParam = mysqldbservice.getDeleteQueryAndparams({u_id}, 'user');
      mysqldbservice.executeQueryWithParameters(ConfigParams.DB_KEY, deleteQueryParam.query, deleteQueryParam.params,  (err, row) => {
        console.log(row)
        if (err) {
          callback(err)
          return;
        } else {
          callback(null, row)
        }
      })
    }
    
  }

  
//   specificationList: function (param, callback) {
//     let query = `SELECT s.s_id,m.machine_name as 'Machine Name',m.m_id,s.spec_name as 'Specification'
//                   FROM mas_specification s
//                   left JOIN mas_machine m ON s.m_id = m.m_id
//                   ORDER BY m.m_id`
//     mysqldbservice.executeQueryWithParameters(ConfigParams.DB_KEY, query, null, callback)
//   },

//   saveSpecification: function (data, callback) {
//     console.log(data);
//     let { spec_name, m_id } = data
//     let specDetails = { spec_name, m_id }
//     if (specDetails) {
//       let insertQueryParamobj = mysqldbservice.getInsertClauseWithParams(specDetails, 'mas_specification');
//       console.log(insertQueryParamobj);
//       mysqldbservice.executeQueryWithParameters(ConfigParams.DB_KEY, insertQueryParamobj.query, insertQueryParamobj.params,
//         (err, row) => {
//           console.log(row)
//           if (err) {
//             callback(err)
//             return;
//           } else {
//             callback(null, row)
//           }
//         })
//     }
//   },

//   updateSpecification: function (data, callback) {
//     let { spec_name, m_id, s_id } = data
//     let specDetails = { spec_name, m_id }
//     if (specDetails) {
//       let updateQueryParamobj = mysqldbservice.getUpdateQueryAndparams(specDetails, { s_id }, 'mas_specification');
//       mysqldbservice.executeQueryWithParameters(ConfigParams.DB_KEY, updateQueryParamobj.query, updateQueryParamobj.params,
//         (err, row) => {
//           console.log(row)
//           if (err) {
//             callback(err)
//             return;
//           } else {
//             callback(null, row)
//           }
//         })
//     }
//   },

//   getQuotationBasicDetails: function (param, callback) {
//     let query = `SELECT q_id,order_date,delivery_date,total_amount,discount,gross_amount,net_amount,gst_amount
//                   FROM quotation_detail
//                   WHERE q_id = ?;`
//     mysqldbservice.executeQueryWithParameters(ConfigParams.DB_KEY, query, [param.p1], callback)
//   },

//   updateStatus: function (data, callback) {
//     console.log(data);
//     let { status, q_id, delivery_date } = data;
//     let updateDetails = {}
//     if (delivery_date) {
//       updateDetails = { status, delivery_date }
//     } else {
//       updateDetails = { status }
//     }

//     if (updateDetails) {
//       let updateQueryParamobj = mysqldbservice.getUpdateQueryAndparams(updateDetails, { q_id }, 'quotation_detail');
//       console.log(updateQueryParamobj);
//       mysqldbservice.executeQueryWithParameters(ConfigParams.DB_KEY, updateQueryParamobj.query, updateQueryParamobj.params,
//         (err, row) => {
//           console.log(row)
//           if (err) {
//             callback(err)
//             return;
//           } else {
//             callback(null, row)
//           }
//         })
//     }
//   },

//   getDashBoardCount: function (param, callback) {
//     let query = `SELECT order_tbl.*,near_delivery.* from
//                   (SELECT COUNT(qd.q_id) AS total_order,
//                   SUM(case when qd.status = 2 then 1 ELSE 0 END) AS total_completed,
//                   SUM(case when qd.status = 0 then 1 ELSE 0 END) AS total_pending,
//                   SUM(case when qd.status = 3 then 1 ELSE 0 END) AS total_rejected,
//                   SUM(case when qd.status = 1 then 1 ELSE 0 END) AS total_onWork,
//                   SUM(case when date(qd.delivery_date) = DATE(NOW()) then 1 ELSE 0 END ) AS today_delivery,
//                   SUM(case when date(qd.order_date) = DATE(NOW()) then 1 ELSE 0 END ) AS today_order
//                   FROM quotation_detail qd) order_tbl,
//                   (SELECT COUNT(*) AS delivery_count FROM quotation_detail qd
//                   WHERE qd.delivery_date < date_add(DATE(NOW()) ,INTERVAL 5 DAY)) near_delivery;`
//     mysqldbservice.executeQueryWithParameters(ConfigParams.DB_KEY, query, null, callback)
//   },

}



module.exports.common = common

