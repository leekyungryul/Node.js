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

// app.get('/studentInfoPractice', function(req, res) {
//   var priceTable = [{name:"item1", price: 1000},
//                      {name:"item2", price: 5000},
//                      {name:"item3", price: 10000},
//                      {name:"item4", price: 30000},
//                      {name:"item5", price: 50000},
//                      {name:"item6", price: 100000},
//                      {name:"item7", price: 500000}];
//   var itemName = "구매불가"
//   const price = req.query.price;
//
//   for(let i = 0; i < priceTable.length; i++){
//     if (priceTable[i].price <= price) {
//       itemName = priceTable[i].name;
//   }
// }
// res.send(itemName);
// });

app.get('/getItem', function (req, res) {
  connection.query(`select * from item`,
    function(error, results, fields) {

    let priceTable = results;

    let itemName = "구매불가";
    let price = req.query.price;

    for(let i=0;i<priceTable.length;i++){
      if(priceTable[i].itemPrice <= price){
    	   itemName = priceTable[i].itemName;
      }
    }
  	res.send(itemName);
    });
});
// app.post('/item',function(req,res){
//   connection.query(`INSERT into item (itemName,itemPrice) VALUES
//   ('${req.body.name}','${req.body.price}')`,
//     function(error,result,fields){
//       if (error) {
//         res.send("not ok");
//       }
//       else if (result.affectedRows==1) {
//         res.send("ok");
//       }
//     });
// });
