var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

console.log(process.env.REDISTOGO_URL);

var redis = require('socket.io-redis');
io.adapter(redis(process.env.REDISTOGO_URL));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function (socket) {
    io.emit('message', 'Hello World');
});

http.listen(process.env.PORT || 3000, function () {
    console.log('Listening server...');
});
