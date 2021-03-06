const socketio = require('socket.io');
const socketAuthorization = require('../middleware/socketAuthorization');
const io = socketio();

const socketApi = { io };

io.use(socketAuthorization)

// Redis adapter

const redisAdapter = require('socket.io-redis');
io.adapter(redisAdapter({ host: process.env.REDIS_URI, port: process.env.REDIS_PORT }))

io.on('connection', socket => {
    console.log('a user connected with name ', socket.request.user.name);
    socket.broadcast.emit('SLM');
});

module.exports = socketApi;