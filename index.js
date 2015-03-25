var url = require('url');
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

var connection = process.env.REDISTOGO_URL.substring('redis://'.length, -1);
connection = connection.substring(0, connection.length - 1);

console.log(connection);

var redis = require('socket.io-redis');
io.adapter(redis(connection));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function (socket) {
    io.emit('message', 'Hello World');
});

http.listen(process.env.PORT || 3000, function () {
    console.log('Listening server...');
});
