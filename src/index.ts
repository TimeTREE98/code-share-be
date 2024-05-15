import { Server, createServer } from 'http';
import express, { Express, NextFunction, Request, Response, json } from 'express';

import authRouter from './routes/auth.route';
import cors, { CorsOptions } from 'cors';
import socket from './socket';
import { Server as socketServer } from 'socket.io';
import session from 'express-session';
import dotenv from 'dotenv';
import path from 'path';

// dotenv
dotenv.config({
  path: path.resolve(process.cwd(), `.env.${process.env.NODE_ENV}`),
});

// variables
const port = process.env.PORT || 3000;
const corsOptions: CorsOptions = {
  origin: ['http://localhost:3000', 'https://localhost:3000'],
  credentials: true,
};
const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET as string,
  resave: false,
  saveUninitialized: false,
  proxy: true,
  cookie: {
    sameSite: 'none',
    secure: true,
  },
});

// express
const app: Express = express();
const httpServer: Server = createServer(app);

app.set('trust proxy', 1);

app.use(cors({ ...corsOptions }));
app.use(sessionMiddleware);
app.use(json());

app.use('/auth', authRouter);

// socket
const io = new socketServer(httpServer, { cors: corsOptions });

io.engine.use(sessionMiddleware);
app.use((req: Request, res: Response, next: NextFunction) => {
  req.io = io;
  next();
});
socket(io);

httpServer.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
