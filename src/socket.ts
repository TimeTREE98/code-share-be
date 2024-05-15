import { Server } from 'socket.io';

export default (io: Server) => {
  io.on('connection', (socket) => {
    // TODO: user verification

    if (socket.request.session?.user) {
      socket.on('code', (data: any) => {
        // sender will not receive the message
        socket.broadcast.emit('code', data);
      });
    }
  });
};
