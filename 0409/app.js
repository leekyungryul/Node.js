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

app.get('/form', function(req, res) {
  res.sendfile("form.html");
});

app.get('/form10', function(req, res) {
  res.sendfile("form10.html");
});

app.get('/form2', function(req, res) {
  res.sendfile("짝수홀수.html");
});

app.get('/form1', function(req, res) {
  res.sendfile("form1.html");
});

app.get('/getNews', function(req, res) {
  connection.query(`SELECT * FROM news`,
    function(error, results, fields) {
      if (error) console.console.log(error);
      res.send(results);
    });
});

app.post('/postNews',function(req,res){
  console.log(req.body.title,req.body.content);
  let title = req.body.title;
  let content = req.body.content;

  connection.query(`INSERT into  news (title,content) VALUES
  ('${title}','${content}')`,
    function(error,result,fields){
      if(error) console.log(error);
      res.send(result);
    });
});
