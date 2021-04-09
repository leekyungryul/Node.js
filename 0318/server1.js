let express = require('express');
let http = require('http');
let app = express();
let mysql = require('mysql');
var connection = mysql.createconnection
let sever = http.createServer(app).listen(80);
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'student1'
});

connection.connect();

app.get('/', function(req, res) {
  res.send("abc");
});

app.get('/test', function(req, res) {
  res.send("hello world222");
});

app.get('/test2', function(req, res) {
  res.sendfile("회원가입.html");
});

app.get('/test3', function(req, res) {
  res.sendfile("글쓰기.html");
});

app.get('/test4', function(req, res) {
  res.sendfile("이력서.html");
});

app.get('/test5', function(req, res) {
  res.sendfile("표만들기.html");
});

app.get('/test6', function(req, res) {
  res.sendfile("자바스크립트 맛보기.html");
});


app.get('/testdb', function(req, res) {
  connection.query(`SELECT 나이,비고 FROM 학생정보 WHERE 나이 <=30 AND 비고 = '광명'`,
    function(error, results, fields) {
      if (error) throw error;
      console.log(results);
      res.send(results);
    });
});
