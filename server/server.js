// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

let todos = [];

const addCors = response => {
  const jsonPropertyObject = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers':
      'Origin, X-Requested-With, Content-Type, Accept',
    'Content-Type': 'application/json',
  };
  response.set(jsonPropertyObject);
};

// http://expressjs.com/en/starter/basic-routing.html
app.get('/api/todos', function(request, response) {
  addCors(response);
  response.json(todos);
});

app.put('/api/todos', function(request, response) {
  todos.push(request.body);
  addCors(response);
  response.sendStatus(200);
});

app.post('/api/todos/:id/complete', function(request, response) {
  addCors(response);
  todos.forEach(item => {
    if (item.id == request.params.id) {
      item.isCompleted = true;
    }
  });
  response.sendStatus(200);
});

app.post('/api/todos/:id/redo', function(request, response) {
  addCors(response);
  todos.forEach(item => {
    if (item.id == request.params.id) {
      item.isCompleted = false;
    }
  });
  response.sendStatus(200);
});

app.delete('/api/todos/:id', function(request, response) {
  const newTodos = todos.filter(item => item.id != request.params.id);
  todos = newTodos;
  response.json(todos);
});
// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
