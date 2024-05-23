import { Server } from 'socket.io';

export default (io: Server) => {
  io.on('connection', (socket) => {
    // TODO: user verification

    socket.on('code', (data: any) => {
      if (socket.request.session?.user) {
        // sender will not receive the message
        socket.broadcast.emit('code', data);
      }
    });
  });
};
