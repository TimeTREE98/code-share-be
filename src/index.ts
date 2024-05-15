import { Server, createServer } from 'http';
import express, { Express, NextFunction, Request, Response, json } from 'express';

import authRouter from './routes/auth.route';
import cors from 'cors';
import socket from './socket';
import { Server as socketServer } from 'socket.io';
import session from 'express-session';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.resolve(process.cwd(), `.env.${process.env.NODE_ENV}`),
});

const port = process.env.PORT || 3000;

const app: Express = express();

const httpServer: Server = createServer(app);
const io = new socketServer(httpServer, { cors: { origin: '*' } });

socket(io);

app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: true,
    saveUninitialized: true,
  }),
);
app.use((req: Request, res: Response, next: NextFunction) => {
  req.io = io;
  next();
});
app.use(cors());
app.use(json());

app.use('/auth', authRouter);

httpServer.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
