import express, { Request, Response, Router } from 'express';

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
