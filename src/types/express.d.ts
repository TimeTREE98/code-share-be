import { Connection } from 'mysql2';
import { Server } from 'socket.io';

declare global {
  namespace Express {
    interface Request {
      io?: Server;
      dbConn?: Connection;
    }
  }
}
