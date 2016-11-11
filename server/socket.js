module.exports = function(io) {
  io.on('connection', (socket) => {
    socket.on('join socket room', (accessCode) => {
      socket.join(accessCode);
    });

    socket.on('join game', (accessCode) => {
      socket.broadcast.to(accessCode).emit('join game');
    })

  });
}
