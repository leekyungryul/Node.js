let express = require('express');
let http = require('http');
let app = express();
let mysql = require('mysql');
var connection = mysql.createconnection
let sever = http.createServer(app).listen(80);
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'test1'
});

connection.connect();

app.get('/ajaxPracticeForm', function(req, res) {
  res.sendfile("get_twice.html");
});

app.get('/studentInfoPractice', function(req, res) {

  connection.query(`SELECT * FROM student where no=${req.query.no}`,
    function(error, results, fields) {
      if (error) throw error;
      res.send(results);
    });
});

app.get('/studentInfoPractice1', function(req, res) {

  connection.query(`SELECT * FROM student1 where no=${req.query.no}`,
    function(error, results, fields) {
      if (error) throw error;
      res.send(results);
    });
});
