import { Server } from 'socket.io';
import { dbConn } from './';
import { v4 as uuidv4 } from 'uuid';

export default (io: Server) => {
  io.on('connection', (socket) => {
    socket.on('joinRoom', ({ roomIdx }: { roomIdx: string }) => {
      for (const room of socket.rooms) {
        if (room.startsWith('room:')) {
          socket.leave(room);
        }
      }

      socket.join(`room:${roomIdx}`);
    });

    socket.on(
      'editFile',
      async ({ event, roomIdx, data }: { event: 'CREATE' | 'UPDATE' | 'DELETE'; roomIdx: string; data: { idx?: string; name?: string } }) => {
        if (socket.request.session?.user) {
          try {
            if (event === 'CREATE') {
              await dbConn
                .promise()
                .execute("INSERT INTO file (idx, room_idx, name, code) VALUES (?, ?, ?, '// 코드를 입력해주세요.')", [uuidv4(), roomIdx, data.name]);
            } else if (event === 'UPDATE') {
              await dbConn.promise().execute('UPDATE file SET name = ? WHERE idx = ?', [data.name, data.idx]);
            } else if (event === 'DELETE') {
              await dbConn.promise().execute('UPDATE file SET deleted_at = NOW() WHERE idx = ?', [data.idx]);
            }

            const [results] = await dbConn.promise().execute('SELECT * FROM file WHERE room_idx = ? AND deleted_at IS NULL', [roomIdx]);

            io.to(`room:${roomIdx}`).emit(
              'fileList',
              JSON.stringify({ file: (results as any[]).map((result) => ({ idx: result.idx, name: result.name })) }),
            );
          } catch (err) {
            console.error(err);
          }
        }
      },
    );

    socket.on('openFile', async ({ fileIdx }: { fileIdx: string }) => {
      for (const room of socket.rooms) {
        if (room.startsWith('file:')) {
          socket.leave(room);
        }
      }

      socket.join(`file:${fileIdx}`);
      try {
        const [results] = await dbConn.promise().execute('SELECT code FROM file WHERE file_idx = ?', [fileIdx]);
        socket.emit('listenCode', JSON.stringify({ code: (results as any[])[0].code }));
      } catch (err) {
        console.error(err);
      }
    });

    socket.on('pushCode', async ({ fileIdx, code }: { fileIdx: string; code: string }) => {
      if (socket.request.session?.user) {
        try {
          await dbConn.promise().execute('UPDATE file SET code = ? WHERE idx = ?', [code, fileIdx]);
          io.to(`file:${fileIdx}`).emit('listenCode', JSON.stringify({ code }));
        } catch (err) {
          console.error(err);
        }
      }
    });
  });
};
