var express = require('express');

var app = express();
var server = require('http').Server(app);

var io = require('socket.io')(server);

app.use(express.static('client'));

app.get('/', function(req, res){
    res.status(200).send('Chat con Socket IO & Node.js');
});

io.on('connection', function(socket){
    console.log('Nueva conexión desde: '+socket.handshake.address);
});

server.listen(6677, function(){
    console.log('Servidor iniciado en puerto 6677');
});
