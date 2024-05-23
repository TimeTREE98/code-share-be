import express, { Request, Response, Router } from 'express';

const roomRouter: Router = express.Router();

const room = [
  {
    room_num: 1,
  },
  {
    room_num: 2,
  },
  {
    room_num: 3,
  },
];

const filelist = [
  {
    file: 1,
    room_idx: 1,
  },
  {
    file: 2,
    room_idx: 1,
  },
  {
    file: 3,
    room_idx: 3,
  },
];

roomRouter.get('', (req: Request, res: Response) => {
  return res.status(200).json({ status: 'Success', data: { room: room } });
});

roomRouter.get('/:room_idx/file', (req: Request, res: Response) => {
  const room_idx = req.params.room_idx;
  const file = [];

  for (var i = 0; i < filelist.length; i++) {
    if (Number(room_idx) == filelist[i].room_idx) {
      file.push(filelist[i]);
    }
  }

  return res.status(200).json({ status: 'Success', data: { file: file } });
});

export default roomRouter;
