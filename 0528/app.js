let express = require('express');
let http = require('http');
let app = express();
let mysql = require('mysql');
var connection = mysql.createconnection
let sever = http.createServer(app).listen(80);
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'test'
});

connection.connect();

app.get('/form', function(req, res) {
  res.sendfile("form.html");
});
app.get('/insertform', function(req, res) {
  res.sendfile("insertForm.html");
});
app.get('/listform', function(req, res) {
  res.sendfile("listForm.html");
});
app.get('/delete', function(req, res) {
  res.sendfile("deleteForm.html");
});

app.get('/getItem', function(req, res) {
  // 가격기준을 오름차순으로 정렬된 리스트를 item테이블로부터 불러오게 쿼리문 송신
  connection.query(`select * from item ORDER BY itemPrice`,
    function(error, results, fields) {
      // 쿼리문으로 받은 키와 밸류형태로 구성되어있는 리스트를
      // priceTable에 대입한다.
      let priceTable = results;
      // alert창에 표시될 itemName을 초기값은 구매불가로 해놓는다.
      let itemName = "구매불가";
      // 사용자가 입력한 가격을 price에 대입한다.
      let price = req.query.price;
      // itemPrice별로 오름차순 정렬된 목록들의 길이만큼 반복문을 회전하면서
      for (let i = 0; i < priceTable.length; i++) {
        // 현재 상품의 가격이 form.html에서 입력한 가격이하라면
        if (priceTable[i].itemPrice <= price) {
          // itemName에 상품의 이름을 담아준다.
          itemName = priceTable[i].itemName;
        }
      }
      res.send(itemName);
    });
});

app.get('/getlist', function(req, res) {
  // 가격기준을 오름차순으로 정렬된 리스트를 item테이블로부터 불러오게 쿼리문 송신
  connection.query(`SELECT * FROM item ORDER BY itemPrice`,
    function(error, results, fields) {
      res.send(results);
    });
});

app.delete('/deletelist', function(req, res) {
  // 가격기준을 오름차순으로 정렬된 리스트를 item테이블로부터 불러오게 쿼리문 송신
  connection.query(`DELETE FROM item WHERE no = '${req.body.no}'`,
    function(error, results, fields) {
      if(error) console.log(error);
      console.log(results);
      if(results.affectedRows==1){
        res.send("ok");
      }
      else{
        res.send("error");
      }
    });
});

app.post('/insertItem', function(req, res) {
  // 사용자가 입력한 제품명과 동일하거나 입력한 가격과동일한 품목을 가지고 온다.
  connection.query(`SELECT * FROM item WHERE itemName = '${req.body.name}'
   OR itemPrice ='${req.body.price}'`,
    function(error, result, fields) {
      // 쿼리로 가져온 데이터가 2가지이면(품목동일 1건, 가격동일 1건)
      if (result.length == 2) {
        res.send("품명, 가격 모두 동일한 상품이 있습니다. 2개");
        // 쿼리로 가져온 데이터가 1가지이면(아래의 경우의 수에따라 출력을 다르게 한다.)
      } else if (result.length == 1) {
        // 제품명,제품가격이 같은경우
        if (result[0].itemName == req.body.name && result[0].itemPrice == req.body.price) {
          res.send("품명, 가격 모두 동일한 상품이 있습니다.");
          // 제품명만 같은 경우
        } else if (result[0].itemName == req.body.name) {
          res.send("이름이 동일한 상품이 있습니다.");
          // 제품가격이 동일한 경우
        } else if (result[0].itemPrice == req.body.price) {
          res.send("가격이 동일한 상품이 있습니다.");
        }
        // 동일한 제품이 없다면 사용자가 입력한 정보를 가지고 데이터를 삽입한다.
      } else if (result.length == 0) {
        connection.query(`INSERT into item (itemName,itemPrice) VALUES
        ('${req.body.name}','${req.body.price}')`,
          function(error, result, fields) {
            if (error) {
              res.send("not ok");
            } else if (result.affectedRows == 1) {
              res.send("ok");
            }
          });
      }
    });
});
