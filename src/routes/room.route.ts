import express, { Request, Response, Router } from 'express';
import { v4 as uuidv4 } from 'uuid';

const roomRouter: Router = express.Router();

roomRouter.get('', (req: Request, res: Response) => {
  req.dbConn?.execute('SELECT * FROM room', (err, result: any[]) => {
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

      return res.status(200).json({ status: 'Success', data: { room: room_result } });
    }
  });
});

roomRouter.post('', (req: Request, res: Response) => {
  if (!req.session.user) {
    // request 에 session 없음, 즉, Create Room 을 할 권한이 없다.
    return res.status(401).json({ status: 'Unauthenticated' });
  }

  req.dbConn?.execute(
    'INSERT INTO room (idx, name, owner_idx) VALUES (?, ?, ?)',
    [uuidv4(), req.body.name, req.session.user.idx],
    (err, results: any[]) => {
      if (err !== null) {
        console.log(err);
        return res.status(500).json({ status: 'Server Error' });
      } else {
        return res.status(200).json({ status: 'Success', message: '정상적으로 생성되었습니다.' });
      }
    },
  );
});

roomRouter.get('/:room_idx/file', (req: Request, res: Response) => {
  req.dbConn?.execute('SELECT * FROM file WHERE room_idx = ?', [req.params.room_idx], (err, results: any[]) => {
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

      return res.status(200).json({ status: 'Success', data: { file: file_result } });
    }
  });
});

export default roomRouter;
