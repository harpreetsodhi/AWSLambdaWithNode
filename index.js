const express = require('express');
const serverless = require('serverless-http');

const app = express();
app.use(express.json());

app.use(function(req, res, next) {
  res.setHeader("Content-Type", "application/json");
  next();
});

let fruits = [
  {
    "id":"1",
    "fruit":"Apple"
  },
  {
    "id":"2",
    "fruit":"Orange"
  },
  {
    "id":"3",
    "fruit":"Mango"
  }
]

app.get('/', (req, res) => {
  res.send("Hello Fruits!");
});

app.get('/api/fruits', (req, res) => {
  res.send(JSON.stringify(fruits, null, 4));
});

app.get('/api/fruit/:id', (req, res) => {
  const index = fruits.findIndex(item => item.id === req.params["id"]);
  res.send(JSON.stringify(fruits[index], null, 4));
});

app.post('/api/fruits', (req, res) => {
  let fruit = req.body;
  fruits.push(fruit);
  res.send(JSON.stringify(fruits, null, 4));
});

app.listen(3000, () => console.log(`Listening on: 3000`));
module.exports.handler = serverless(app);