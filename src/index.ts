import { Server, createServer } from 'http';
import cors, { CorsOptions } from 'cors';
import express, { Express, NextFunction, Request, Response, json } from 'express';

import authRouter from './routes/auth.route';
import dotenv from 'dotenv';
import mysql from 'mysql2';
import path from 'path';
import session from 'express-session';
import socket from './socket';
import { Server as socketServer } from 'socket.io';

// dotenv
dotenv.config({
  path: path.resolve(process.cwd(), `.env.${process.env.NODE_ENV}`),
});

// variables
const port = process.env.PORT || 3000;
const corsOptions: CorsOptions = {
  origin: ['http://localhost:3000', 'https://localhost:3000', 'https://code-share-service.vercel.app'],
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
app.use(json());

// mysql
const dbConn = mysql.createConnection({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

// socket
const io = new socketServer(httpServer, { cors: corsOptions });
io.engine.use(sessionMiddleware);

// middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  req.io = io;
  req.dbConn = dbConn;
  next();
});
app.use(sessionMiddleware);
socket(io);

// routes
app.use('/auth', authRouter);

httpServer.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
