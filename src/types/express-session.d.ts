import 'express-session';

declare module 'express-session' {
  interface SessionData {
    user?: {
      idx: string;
      id: string;
    };
  }
}
