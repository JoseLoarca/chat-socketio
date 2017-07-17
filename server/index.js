var express = require('express');

var app = express();
var server = require('http').Server(app);

var io = require('socket.io')(server);

app.use(express.static('client'));

app.get('/', function(req, res){
    res.status(200).send('Chat con Socket IO & Node.js');
});

var messages = [{
    id: 1,
    text: 'Chat con Socket IO & Node.js...',
    nickname: 'Bot - JC'
}];

io.on('connection', function(socket){
    console.log('Nueva conexión desde: '+socket.handshake.address);
    
    socket.emit('messages', messages);
    
    socket.on('add-message', function(data){
        messages.push(data);
        
        io.sockets.emit('messages', messages);
    });
});

server.listen(6677, function(){
    console.log('Servidor iniciado en puerto 6677');
});
