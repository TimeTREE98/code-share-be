import express, { Request, Response, Router } from 'express';
import { v4 as uuidv4 } from 'uuid';

const roomRouter: Router = express.Router();

roomRouter.get('', (req: Request, res: Response) => {
  req.dbConn?.execute('SELECT * FROM room WHERE deleted_at IS NULL ORDER BY created_at DESC', (err, result: any[]) => {
    if (err !== null) {
      console.log(err);
      return res.status(500).json({ status: 'Server Error' });
    } else {
      const room_result = [];

      for (var i = 0; i < result.length; i++) {
        const room = {
          idx: result[i].idx,
          name: result[i].name,
        };
        room_result.push(room);
      }

      return res.status(200).json({ status: 'Success', data: room_result });
    }
  });
});

roomRouter.post('', (req: Request, res: Response) => {
  if (!req.session.user) {
    // request 에 session 없음, 즉, Create Room 을 할 권한이 없다.
    return res.status(401).json({ status: 'Unauthenticated' });
  }

  const uuid = uuidv4();
  req.dbConn?.execute(
    'INSERT INTO room (idx, name, owner_idx) VALUES (?, ?, ?)',
    [uuid, req.body.name, req.session.user.idx],
    (err) => {
      if (err !== null) {
        console.log(err);
        return res.status(500).json({ status: 'Server Error' });
      } else {
        return res.status(200).json({ status: 'Success', message: '정상적으로 생성되었습니다.', data: { idx: uuid, name: req.body.name }});
      }
    },
  );
});

roomRouter.get('/:room_idx/file', (req: Request, res: Response) => {
  req.dbConn?.execute('SELECT * FROM file WHERE room_idx = ? AND deleted_at IS NULL ORDER BY created_at DESC', [req.params.room_idx], (err, results: any[]) => {
    if (err !== null) {
      console.log(err);
      return res.status(500).json({ status: 'Server Error' });
    } else {
      const file_result = [];

      for (var i = 0; i < results.length; i++) {
        const file = {
          idx: results[i].idx,
          name: results[i].name,
        };
        file_result.push(file);
      }

      return res.status(200).json({ status: 'Success', data: file_result });
    }
  });
});

// roomRouter.post('/:room_idx/file', (req: Request, res: Response) => {
//   if (!req.session.user) {
//     // request 에 session 없음, 즉, Create file 을 할 권한이 없다.
//     return res.status(401).json({ status: 'Unauthenticated' });
//   }

  

//   req.dbConn?.execute(
//     'INSERT INTO file (idx, name, room_idx) VALUES (?, ?, ?)',
//     [uuidv4(), req.body.name, req.session.room.idx],
//     (err) => {
//       if (err !== null) {
//         console.log(err);
//         return res.status(500).json({ status: 'Server Error' });
//       } else {
//         return res.status(200).json({ status: 'Success', message: '정상적으로 생성되었습니다.', file_name: req.body.name });
//       }
//     },
//   );
// });

export default roomRouter;
