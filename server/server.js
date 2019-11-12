// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
var expressWs = require('express-ws')(app);

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

let todos = [];

var aWss = expressWs.getWss('/todo');

const sendMessage = (channel, msg) => {
  aWss.clients.forEach(function(client) {
    const fullMessage = {
      channel: channel,
      body: msg,
    };
    client.send(JSON.stringify(fullMessage));
  });
};

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
  sendMessage('TodoAdded', request.body);
});

app.post('/api/todos/:id/complete', function(request, response) {
  addCors(response);
  todos.forEach(item => {
    if (item.id == request.params.id) {
      item.isCompleted = true;
    }
  });
  response.sendStatus(200);
  sendMessage('TodoCompleted', request.params.id);
});

app.post('/api/todos/:id/redo', function(request, response) {
  addCors(response);
  todos.forEach(item => {
    if (item.id == request.params.id) {
      item.isCompleted = false;
    }
  });
  response.sendStatus(200);
  sendMessage('TodoRedo', request.params.id);
});

app.delete('/api/todos/:id', function(request, response) {
  const newTodos = todos.filter(item => item.id != request.params.id);
  todos = newTodos;
  response.json(todos);
  sendMessage('TodoRemoved', request.params.id);
});
// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});

app.ws('/ws', function(ws, req) {
  ws.on('message', function(msg) {
    ws.send(msg);
  });
});
