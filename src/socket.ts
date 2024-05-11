import { Server } from 'socket.io';

export default (io: Server) => {
  io.on('connection', (socket) => {
    // TODO: user verification
    socket.on('disconnect', () => {});

    socket.on('ping', (data: any) => {
      socket.emit('pong', data);
    });

    socket.on('code', (data: any) => {
      socket.emit('code', data);
    });
  });
};
