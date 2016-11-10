module.exports = function(io) {
  io.on('connection', (socket) => {
    socket.on('new room', (accessCode) => {
      socket.join(accessCode);
      console.log('server socket joined: ', accessCode);
    });

  });
}
