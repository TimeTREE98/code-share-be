import express, { Request, Response, Router } from 'express';

const authRouter: Router = express.Router();

authRouter.get('/me', (req: Request, res: Response) => {
  if (!req.session.user) {
    return res.status(401).json({ status: 'Fail' });
  }

  return res.status(200).json({ status: 'Success', data: { id: req.session.user.id } });
});

authRouter.post('/login', (req: Request, res: Response) => {
  // TODO: DB connection
  if (req.body.id === 'admin' && req.body.pw === '1234') {
    req.session.user = { id: req.body.id };
    return res.status(200).json({ status: 'Success' });
  }
  return res.status(401).json({ status: 'Fail' });
});

export default authRouter;
