var url = require('url');
var redis = require('redis').createClient;
var adapter = require('socket.io-redis');
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

var connection = url.parse(process.env.REDISTOGO_URL);
var password = connection.auth.split(':')[1];

io.adapter(adapter({
    pubClient: redis(connection.port, connection.hostname, {
        auth_pass: password
    }),
    subClient: redis(connection.port, connection.hostname, {
        auth_pass: password,
        detect_buffers: true
    })
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
