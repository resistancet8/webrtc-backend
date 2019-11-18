var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
let users = {};

server.listen(8080, () => {
  console.log('Connected')
})

io.on('connection', function (socket) {
  socket.on("join", data => {
    users[data.clientID] = socket;
  });

  socket.on("get_clients", data => {
    socket.broadcast.emit('client_connected', { clients: Object.keys(users) })
  });

  socket.on('local_description', data => {
    socket.broadcast.emit('local_description', { data: data.data })
  });

  socket.on('answer_description', data => {
    socket.broadcast.emit('answer_description', { data: data.data })
  });

  socket.on('ice_candidate', ice => {
    socket.broadcast.emit('ice_candidate', { ice });
  })
});
