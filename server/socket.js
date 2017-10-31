module.exports = function(io) {
  io.on('connection', (socket) => {
    socket.on('JOIN_SOCKET_ROOM', (accessCode) => {
      socket.join(accessCode);
    });

    socket.on('JOIN_GAME', (accessCode) => {
      socket.broadcast.to(accessCode).emit('JOIN_GAME');
    })

    socket.on('UPDATE_PLAYER', (accessCode) => {
      io.to(accessCode).emit('UPDATE_PLAYER');
    })

    socket.on('TOGGLE_READY', (accessCode) => {
      io.to(accessCode).emit('TOGGLE_READY');
    })

    socket.on('START_GAME', (accessCode) => {
      io.to(accessCode).emit('START_GAME');
    })
  });
}
