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

app.get('/posttwice', function(req, res) {
  res.sendfile("post_twice.html");
});

app.post('/news',function(req,res){
  connection.query(`INSERT into  news (title,content) VALUES
  ('${req.body.title}','${req.body.content}')`,
    function(error,result,fields){
      if (error) {
        res.send("not ok");
      }
      else if (result.affectedRows==1) {
        res.send("ok");
      }
    });
});

app.post('/student',function(req,res){
  connection.query(`INSERT into  student (name,age,region) VALUES
  ('${req.body.name}','${req.body.age}','${req.body.region}')`,
    function(error,result,fields){
    if (error) {
      res.send("not ok");
    }
    else if (result.affectedRows==1) {
      res.send("ok");
    }
    });
});
