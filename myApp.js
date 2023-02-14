let express = require('express');
let app = express();
require('dotenv').config();
let bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }));
app.use('/public', express.static(__dirname + '/public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
})

app.use(function middleware(req, res, next) {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
})

app.get('/json', (req, res) => {
  let response = {
    "message": "Hello json"
  }

  if (process.env.MESSAGE_STYLE === 'uppercase') {
    response.message = response.message.toUpperCase()
  }

  return res.json(response)

})

app.get('/now', (req, res, next) => {
  req.time = new Date().toString();
  next();
}, (req, res) => {
  res.json({ time: req.time })
})

app.get('/:word/echo', (req, res) => {
  res.send({ echo: req.params.word })
})

app.get('/name', (req, res) => {
  res.send({ name: `${req.query.first} ${req.query.last}` })
})

app.post('/name', (req, res) => {
  res.send({name: `${req.body.first} ${req.body.last}`})
})


































module.exports = app;
