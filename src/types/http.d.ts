declare module 'http' {
  export interface IncomingMessage {
    session?: SessionData;
  }
}
