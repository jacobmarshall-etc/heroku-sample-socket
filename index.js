var url = require('url');
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

var redis = url.parse(process.env.REDISTOGO_URL);
io.adapter(require('socket.io-redis')({
    host: redis.hostname,
    port: redis.port
}));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function (socket) {
    io.emit('message', 'Hello World');
});

http.listen(process.env.PORT || 3000, function () {
    console.log('Listening server...');
});
