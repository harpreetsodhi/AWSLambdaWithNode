const express = require('express');
const serverless = require('serverless-http');

const app = express();
app.use(express.json());

var fruits = [
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
  res.json({fruits});
});

app.get('/api/fruits/:fruit', (req, res) => {
  res.json({"fruit": fruits.filter(item => item.id === req.params.fruit)});
});

app.post('/api/fruit', (req, res) => {
  let fruit = JSON.parse(req.body)
  fruits.push(fruit);
  res.json({fruits});
});

app.listen(3000, () => console.log(`Listening on: 3000`));
module.exports.handler = serverless(app);