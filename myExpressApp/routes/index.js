var express = require('express');
var router = express.Router();
var Connection = require('tedious').Connection;  
      var Request = require('tedious').Request;  
    var TYPES = require('tedious').TYPES;  
    var config = {  
      server: 'azuresqlsampledb.database.windows.net',
  userName: 'ADMIvan',
  password: 'qwerty123#',  
        // When you connect to Azure SQL Database, you need these next options.  
        options: {encrypt: true, database: 'AdventureWorksLT'}  
    };  
    var _customers='';
     var connection = new Connection(config); 
      connection.on('connect', function(err) {  
        // If no error, then good to proceed.
         console.log(err); 
        console.log("Connected");  
     
      
    });
/* GET home page. */
router.get('/', function(req, res, next) {


       res.render('index', executeStatement());

 
});
 function executeStatement() {  
        request = new Request("SELECT c.CustomerID, c.CompanyName,COUNT(soh.SalesOrderID) AS OrderCount FROM SalesLT.Customer AS c LEFT OUTER JOIN SalesLT.SalesOrderHeader AS soh ON c.CustomerID = soh.CustomerID GROUP BY c.CustomerID, c.CompanyName ORDER BY OrderCount DESC;", function(err) {  
        if (err) {  
            console.log(err);}  
        });  
        var result = "";  
        request.on('row', function(columns) {  
            columns.forEach(function(column) {  
              if (column.value === null) {  
                console.log('NULL');  
              } else {  
                _customers+= column.value + " ";  
              }  
            });  
            console.log(_customers); 
            _customers ="";  
        });  
  
        request.on('done', function(rowCount, more) {  
        console.log(rowCount + ' rows returned');  
        });  
        connection.execSql(request);  
    }  

module.exports = router;
