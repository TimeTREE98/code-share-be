import express, { Express } from 'express';

import authRouter from './route/auth.route';

const app: Express = express();
const port = process.env.PORT || 3000;

app.use('/auth', authRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
