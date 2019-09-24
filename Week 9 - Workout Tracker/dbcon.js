var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit 	: 10,
  host            	: 'remotemysql.com',
  user 			      	: '(insert own user here)',
  password		    	: '(insert own password here)',
  database			    : '(insert own database here)' 
});

module.exports.pool = pool;
