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

app.get('/ex_postajax', function(req, res) {
  res.sendfile("ex_postajax.html");
});

app.post('/student1',function(req,res){
  connection.query(`INSERT into  news (title,content) VALUES
  ('${req.body.title}','${req.body.content}')`,
    function(error,result,fields){
      res.send(result);
    });
});
