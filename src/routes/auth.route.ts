import express, { Request, Response, Router } from 'express';

import bcrypt from 'bcrypt';

const authRouter: Router = express.Router();

authRouter.get('/me', (req: Request, res: Response) => {
  if (!req.session.user) {
    return res.status(401).json({ status: 'Fail' });
  }

  return res.status(200).json({ status: 'Success', data: { id: req.session.user.id } });
});

authRouter.post('/login', (req: Request, res: Response) => {
  req.dbConn?.execute('SELECT * FROM user WHERE id = ?', [req.body.id], (err, results: any[]) => {
    if (err !== null) {
      console.log(err);
      return res.status(500).json({ status: 'Server Error' });
    }

    if (results.length === 0) {
      return res.status(401).json({ status: 'Fail', message: '아이디가 존재하지 않습니다.' });
    }

    bcrypt.compare(req.body.pw, results[0]['password'], (err, same) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ status: 'Server Error' });
      }

      if (same === true) {
        req.session.user = {
          idx: results[0].idx,
          id: req.body.id,
        };
        return res.status(200).json({ status: 'Success' });
      } else {
        return res.status(401).json({ status: 'Fail', message: '비밀번호가 일치하지 않습니다.' });
      }
    });
  });
});

export default authRouter;
